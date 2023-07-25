const express = require("express")

const {
    getUser, getUserFriends, addAndRemoveFRND
} = require("../controllers/users.js");
const { getAllUsers } = require("../controllers/userController.js");


const router = express.Router()

//? READ
router.get("/", getAllUsers)
router.get("/:id", getUser)
router.get("/:id/friends", getUserFriends)

//? UPDATE
router.patch("/:id/:frndId", addAndRemoveFRND)



module.exports = router;