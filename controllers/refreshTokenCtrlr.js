const User = require('../model/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    try {
        const foundUser = await User.findOne({ refreshToken }).exec();

        if (!foundUser) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const hackedUser = await User.findOne({ username: decoded.username }).exec();
            hackedUser.refreshToken = [];
            await hackedUser.save();
            return res.sendStatus(403); // Forbidden
        }

        const newRefreshTokenArray = foundUser.refreshToken.filter((rToken) => rToken !== refreshToken);
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (foundUser.username !== decoded.username) return res.sendStatus(403);

        const accessToken = jwt.sign(
            { "UserInfo": { "username": decoded.username } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json({ accessToken });
    } catch (error) {
        console.log('Error refreshing token:', error);
        res.sendStatus(403); // Forbidden
    }
};


// const handleRefreshToken = async (req, res) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401);
//     console.log(cookies.jwt)
//     const refreshToken = cookies.jwt;
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
//     //? check for duplicate refreshToken from data base
//     const foundUser = await User.findOne({ refreshToken }).exec();

//     //? Detect reused refresh token
//     if (!foundUser) {
//         jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET,
//             async (err, decoded) => {
//                 if (err) return res.sendStatus(403) //? Forbidden
//                 const hackedUser = await User.findOne({ username: decoded.username }).exec();
//                 hackedUser.refreshToken = [];
//                 const result = await hackedUser.save();
//                 console.log(result);

//             })
//         return res.sendStatus(403)
//     }
//     //? Assign new refresh token to user
//     // const user = 
//     const newRefreshTokenArray = foundUser.refreshToken.filter(rToken => rToken !== refreshToken)
//     //? Evaluate JWTs
//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         async (err, decoded) => {
//             console.log("err", err)
//             console.log("decoded", decoded)
//             if (err) {
//                 console.log("expired refresh token")
//                 foundUser.refreshToken = [...newRefreshTokenArray];
//                 console.log("as refresh token", foundUser.refreshToken)
//                 const result = await foundUser.save();
//                 console.log("current state", result)
//             }
//             if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

//             //? runs if JWT is still valid
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": decoded.username
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: "10s" } //30m
//             )
//             const newRefreshToken = jwt.sign(
//                 { "username": foundUser.username },
//                 process.env.REFRESH_TOKEN_SECRET,
//                 { expiresIn: "5m" } //1d
//             );
//             //? Saving refresh token with current user
//             foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//             //? Create secure cookies with refresh token
//             // delete foundUser.pwd
//             const user = await foundUser.save();
//             console.log("after issuing refreshToken:", user);
//             return res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }).json({ accessToken }) //secure: true,
//             // console.log("access Token:", accessToken)
//             // res.end()
//         }
//     )
// }
// const handleRefreshToken = async (req, res) => {
//     const refreshToken = req.cookies.jwt;

//     if (!refreshToken) {
//         return res.sendStatus(401);
//     }

//     try {
//         const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//         const foundUser = await User.findOne({ username: decoded.username }).exec();

//         if (!foundUser) {
//             throw new Error("User not found");
//         }

//         // Clear the existing refresh token from the user
//         foundUser.refreshToken = foundUser.refreshToken.filter(token => token !== refreshToken);
//         await foundUser.save();

//         const accessToken = generateAccessToken(foundUser.username);
//         const newRefreshToken = generateRefreshToken(foundUser.username);

//         // Add the new refresh token to the user
//         foundUser.refreshToken.push(newRefreshToken);
//         await foundUser.save();

//         // Set the new refresh token as a cookie
//         res.cookie('jwt', newRefreshToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'None',
//             maxAge: 24 * 60 * 60 * 1000
//         });

//         res.json({ accessToken });
//     } catch (err) {
//         console.error("Error refreshing token:", err);
//         res.sendStatus(403); // Forbidden
//     }
// };

// // Helper function to generate an access token
// const generateAccessToken = (username) => {
//     return jwt.sign(
//         { UserInfo: { username } },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "10s" }
//     );
// };

// // Helper function to generate a refresh token
// const generateRefreshToken = (username) => {
//     return jwt.sign(
//         { username },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: "1d" }
//     );
// };


module.exports = { handleRefreshToken };