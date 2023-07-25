const User = require("../model/User");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ "message": "No employee found." });
    res.json(users);
}
const createNewUser = async (req, res) => {
    //? Function to create new employee with an id
    const { user, pwd, email } = req.body;
    if (!user || !pwd || !email) {
        return res.status(404).json({ 'message': 'Username, password and email are required.' });
    }
    //? check for duplicate username from data base
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) {
        return res.sendStatus(409)
    }; //? Conflict

    try {
        const result = await User.create({
            username: user,
            pwd,
            email
        });
        res.status(201).json(result);

    } catch (err) {
        console.error(err)

    }
}
const updateUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": "ID parameter is required." })
    const user = await User.findOne({ _id: req?.body?.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No User ID matches ${req?.body?.id}.` })
    }
    if (req?.body?.user) User.user = req?.body?.user;
    if (req?.body?.pwd) User.pwd = req?.body?.pwd;
    if (req?.body?.email) User.email = req?.body?.email;
    const result = await user.save();
    res.json(result);
}
const deleteUser = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ "message": "User ID is required." })
    const user = await User.findOne({ _id: id }).exec();
    if (!user) return res.status(204).json({ "message": `No user ID matches ${id}.` })
    const result = await user.deleteOne({ _id: id });
    res.json(result);

}
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ "message": "User ID is required." })
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user ID matches ${id}.` })
    }

    res.json(user);
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser, getUser };