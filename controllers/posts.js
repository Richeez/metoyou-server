const Post = require("../model/Post.js");



//? READ
const getPostFeeds = async (req, res) => {

    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message })
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
        const post = await Post.find(id)
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

module.exports = {
    getPostFeeds,
    likePost,
    getUserPosts
};