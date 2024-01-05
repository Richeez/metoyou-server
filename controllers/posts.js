const Post = require("../model/Post.js");
const User = require("../model/User.js");

//? CREATE

const createPost = async (req, res) => {


    try {
        const { userId, description, attachments } = req?.body ?? {};
        console.log("🚀 ~ file: posts.js:11 ~ createPost ~ req?.body:", req?.body)

        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPost = new Post({
            userId,
            username: user.username,
            description,
            userPicsPath: user.picsPath,
            location: user.location,
            likes: {},
            comments: [],
        });

        if (Array.isArray(attachments)) {
            newPost.picsPath = newPost.picsPath.concat(attachments);
        } else if (attachments) {
            newPost.picsPath.push(attachments);
        }


        await newPost.save();

        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}


//? READ
const getPostFeeds = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" }); // Respond with an error status and message
    }
}

const getUserPosts = async (req, res) => {

    try {
        const { userId } = req.params;
        const post = await Post.find({ userId })
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
//? UPDATE
const likePost = async (req, res) => {

    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findOne({ _id: id })
        const isLiked = post.likes.get(userId)
        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                likes: post.likes
            },
            {
                new: true
            }
        )
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
const postComments = async (req, res) => {

    try {
        const { postId, comment, picsPath } = req.body;
        const comments = {
            user: req.user.id,
            username: req.user.username,
            picsPath,
            comment
        }
        console.log("id", req.user.id)
        console.log("username", req.user.username)
        const post = await Post.findById(postId)
        post.comments.push(comments)
        await post.save()
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}



module.exports = {
    getPostFeeds,
    likePost,
    getUserPosts,
    postComments,
    createPost
};