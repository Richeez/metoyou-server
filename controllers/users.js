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
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
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



const addAndRemoveFRND = async (req, res) => {
  try {
    const { id, frndId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(frndId);
    if (user.friends.includes(frndId)) {
      user.friends = user.friends.filter((id) => id !== frndId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(frndId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, username, picsPath, location, occupation }) => {
        _id, username, picsPath, location, occupation;
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getUser,
  getUserFriends,
  addAndRemoveFRND,
};
