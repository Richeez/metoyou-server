const express = require("express")
const { getUserPosts, getPostFeeds, likePost } = require("../controllers/posts.js");

const router = express.Router()

//? READ
router.get("/", getPostFeeds)
router.get("/:userId/posts", getUserPosts)

//? UPDATE 
router.patch("/:id/like", likePost)


module.exports = router; 