const User = require('../model/User');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { user, pwd, email } = req.body;
    if (!user || !pwd || !email) return res.status(400).json({ "message": "username, password and email are required!" });
    //? check for duplicate username from data base
    const name = await User.findOne({ username: user }).exec();
    const eAddress = await User.findOne({ email }).exec();
    if (name || eAddress) return res.sendStatus(409); //? Conflict

    try {

        const hashedPwd = await bcrypt.hash(pwd, 10);
        //? Create and store the new user
        const newUser = await User.create({
            "username": user,
            email,
            "pwd": hashedPwd,
            "nickname": generateUniqueRandomStringWithNumber(user),
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        }); //? Store the new user
        console.log(newUser)
        res.status(201).json({ "success": `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }

}

function shuffleString(str) {
    // Convert the string to an array of characters for shuffling
    const strArray = str.split('');

    // Perform the Fisher-Yates shuffle
    for (let i = strArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [strArray[i], strArray[j]] = [strArray[j], strArray[i]];
    }

    // Convert the shuffled array back to a string
    return strArray.join('');
}

function generateUniqueRandomStringWithNumber(originalString) {
    // Remove white spaces from the original string
    const sanitizedString = originalString.replace(/\s/g, '');

    // Generate a random number
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;

    // Convert the random number to a string
    const randomNumberStr = randomNumber.toString();

    // Shuffle the sanitized string
    const shuffledString = shuffleString(sanitizedString);

    // Combine the shuffled string and the random number
    const resultString = shuffledString + randomNumberStr;
    return resultString;
}





module.exports = { handleNewUser };