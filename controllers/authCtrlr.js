const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ UserInfo: { username: user.username } }, process.env.ACCESS_TOKEN_SECRET, {
        // expiresIn: '3s',
        expiresIn: '15m',
    });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, {
        // expiresIn: '5s',
        expiresIn: '7d',
    });
};

const handleLogIn = async (req, res) => {
    try {
        const { user, pwd } = req.body;
        if (!user || !pwd) {
            return res.status(400).json({ message: 'Username and password are required!' });
        }

        // Attempt to find the user by username
        const foundUserByUsername = await User.findOne({ username: user }).exec();

        // If user is not found by username, try searching by nickname
        if (!foundUserByUsername) {
            const foundUserByNickname = await User.findOne({ nickname: user }).exec();
            if (!foundUserByNickname) {
                return res.status(401).json({ message: 'Unauthorized!' });
            }
            // Use foundUserByNickname or handle the case where it's not found
            // For now, setting foundUser to the one found by nickname
            foundUser = foundUserByNickname;
        } else {
            // Use foundUserByUsername if found by username
            foundUser = foundUserByUsername;
        }

        const match = await bcrypt.compare(pwd, foundUser.pwd);

        if (match) {
            // Generate JWT tokens
            const accessToken = generateAccessToken(foundUser);
            const newRefreshToken = generateRefreshToken(foundUser);

            // Remove old refresh token if it exists
            if (req.cookies.jwt) {
                const refreshToken = req.cookies.jwt;
                const foundToken = await User.findOne({ refreshToken }).exec();
                if (!foundToken) {
                    console.log('Hacker trying to bridge refresh token; attempted to reuse refresh token at login');
                    foundUser.refreshToken = "";
                }
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', /*secure: true*/ });
            }

            // Save the new refresh token with the current user
            foundUser.refreshToken = newRefreshToken;
            await foundUser.save();

            // Respond with tokens and user data
            const { pwd, refreshToken, ...rest } = foundUser._doc;
            console.log(rest);

            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                // secure: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }).json({ rest, accessToken });
            console.log("🚀 ~ file: authCtrlr.js:71 ~ handleLogIn ~ accessToken:", accessToken);
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// const handleLogIn = async (req, res) => {
//     try {
//         const { user, pwd } = req.body;
//         if (!user || !pwd) {
//             return res.status(400).json({ message: 'Username and password are required!' });
//         }

//         const foundUser = await User.findOne({ username: user }).exec();
//         console.log("foundUser:", foundUser)
//         if (!foundUser) {
//             return res.status(401).json({ message: 'Unauthorized!' });
//         }

//         const match = await bcrypt.compare(pwd, foundUser.pwd);

//         if (match) {
//             // Generate JWT tokens
//             const accessToken = generateAccessToken(foundUser);
//             const newRefreshToken = generateRefreshToken(foundUser);

//             // Remove old refresh token if it exists
//             if (req.cookies.jwt) {
//                 const refreshToken = req.cookies.jwt;
//                 console.log("refreshToken:", refreshToken)
//                 const foundToken = await User.findOne({ refreshToken }).exec();
//                 if (!foundToken) {
//                     console.log('Hacker trying to bridge refresh token; attempted to reuse refresh token at login');
//                     foundUser.refreshToken = "";
//                 }
//                 res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', /*secure: true*/ });
//             }

//             // Save the new refresh token with the current user
//             foundUser.refreshToken = newRefreshToken;
//             await foundUser.save();

//             // Respond with tokens and user data
//             const { pwd, refreshToken, ...rest } = foundUser._doc;
//             console.log(rest);

//             res.cookie('jwt', newRefreshToken, {
//                 httpOnly: true,
//                 // secure: true,
//                 sameSite: 'None',
//                 maxAge: 7 * 24 * 60 * 60 * 1000,
//             }).json({ rest, accessToken });
//             console.log("🚀 ~ file: authCtrlr.js:71 ~ handleLogIn ~ accessToken:", accessToken)
//         } else {
//             return res.sendStatus(401);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


module.exports = { handleLogIn, generateRefreshToken, generateAccessToken };