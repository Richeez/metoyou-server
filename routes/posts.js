const express = require("express")
const { getUserPosts, getPostFeeds, likePost, postComments } = require("../controllers/posts.js");

const router = express.Router()

//? READ
router.get("/", getPostFeeds)
router.get("/:userId/posts", getUserPosts)

//? UPDATE 
router.patch("/:id/like", likePost)
router.put("/comment/post", postComments)

module.exports = router; 