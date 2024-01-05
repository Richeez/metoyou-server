const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { generateRefreshToken, generateAccessToken } = require('./authCtrlr');

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const foundUser = await User.findOne({ username: decoded.username }).exec();

        if (!foundUser) {
            throw new Error("User not found");
        }

        // Clear the existing refresh token from the user
        foundUser.refreshToken = foundUser.refreshToken.filter(token => token !== refreshToken);
        await foundUser.save();

        // Generate a new access token
        const accessToken = generateAccessToken(foundUser.username);
        const newRefreshToken = generateRefreshToken(foundUser.username);

        // Add the new refresh token to the user
        foundUser.refreshToken = newRefreshToken
        await foundUser.save();

        // Set the new refresh token as a cookie
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            // secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000, // Set the appropriate expiration time for the refresh token
        });

        // res.cookie('jwt', newRefreshToken, {
        //     httpOnly: true,
        //     // secure: true,
        //     sameSite: 'None',
        //     maxAge: 5000, // Set the cookie to expire in 3 seconds
        // });
        res.json({ accessToken });
    } catch (err) {
        console.error("Error refreshing token:", err);
        res.sendStatus(403); // Forbidden
    }
};


module.exports = { handleRefreshToken };
