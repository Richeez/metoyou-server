const express = require("express")
const { getUserPosts, getPostFeeds, likePost, postComments, createPost } = require("../controllers/posts.js");

const router = express.Router()

//? CREATE

router.post("/new-post", createPost)

//? READ
router.get("/", getPostFeeds)
router.get("/:userId/posts", getUserPosts)

//? UPDATE 
router.patch("/:id/like", likePost)
router.put("/comment/post", postComments)

module.exports = router; 