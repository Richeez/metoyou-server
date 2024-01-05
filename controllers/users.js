const Post = require("../model/Post.js");
const User = require("../model/User.js");

//? READ
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFriends = followers.map(
      ({ _id, username, picsPath, location, occupation }) => {
        _id, username, picsPath, location, occupation;
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//? UPDATE

const addOrRemoveFollower = async (req, res) => {
  try {
    const { id, followerId } = req.params;
    const user = await User.findById(id);
    const otherUser = await User.findById(followerId);
    if (!user.followers.includes(id)) {
      await user.updateOne({ $push: { followers: id } })
      await otherUser.updateOne({ $push: { followings: followerId } })
    } else {
      await user.updateOne({ $pull: { followers: id } })
      await otherUser.updateOne({ $pull: { followings: followerId } })
    }
    await user.save();
    await otherUser.save();
    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id, username, picsPath, location, occupation }) => {
        _id, username, picsPath, location, occupation;
      }
    );
    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getFollowersPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followersPost = await Promise.all(
      user.followings.map((item) => Post.find({ user: item }))
    );
    const userPosts = await Post.find({ user: user._id })
    filteredPosts = userPosts.concat(...followersPost)
    filteredPosts.forEach(post => {
      const postAge = new Date * new Date(post.createdAt)
      const ageWeight = 1 - postAge / (1000 * 60 * 60 * 24) //weight decrease as post gets older
      const likeWeight = post.likes.length / 100
      const commentWeight = post.comments.length / 100
      post.weight = ageWeight +
        likeWeight +
        commentWeight;
    });

    filteredPosts.sort((a, b) => b.weight - a.weight)
    await userPosts.save()
    res.status(200).json(filteredPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const editProfile = async (req, res) => {
  const { userId, username, nickname, location, occupation, imageArray } = req.body;
  console.log("🚀 ~ file: users.js:92 ~ editProfile ~ req.body:", req.body)
  if (!req.body) return res.status(400).json({ "message": "You need to make new changes" });
  const duplicate = await User.findOne({ username }).lean().exec()
  if (duplicate && duplicate._id.toString() !== userId) return res.status(409).json({ "message": "Username Exist!" });

  try {
    const user = await User.findById(userId).exec();
    if (username) {
      user.username = username;
    }
    if (nickname) {
      user.nickname = nickname;
    }
    let updatedPicsPath = user?.picsPath; //? Initialize with the current picsPath

    if (imageArray.length !== 0) {
      const profileImage = imageArray.find(child => child.target === "profile");
      if (profileImage) {
        if (user?.picsPath[0]?.url !== profileImage?.url) {
          //? Update the user's picsPath and all related posts in a single query
          await Promise.all([
            User.findByIdAndUpdate(userId, { $set: { picsPath: profileImage } }),
            Post.updateMany({ userId }, { $set: { userPicsPath: profileImage } }),
          ]);
          updatedPicsPath = profileImage; // Update the value to the new picsPath
        }
      }

      const coverImageChild = imageArray.find(child => child.target === "cover");

      if (coverImageChild) {

        user.backgroundBg = coverImageChild;

      }
    }

    if (location) {
      user.location = location;
    }
    if (occupation) {
      user.occupation = occupation;
    }
    await user.save();

    // Find all posts by the user and update their picsPath
    const posts = await Post.find({ userId });
    for (const post of posts) {
      post.userPicsPath = updatedPicsPath; // Use the updated picsPath
      await post.save();
    }
    const { pwd, refreshToken, ...rest } = user._doc;
    res.status(201).json({ rest, posts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getUser,
  getUserFriends,
  addOrRemoveFollower,
  getFollowersPosts,
  editProfile
};
