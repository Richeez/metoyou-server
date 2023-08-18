const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogIn = async (req, res) => {
    const cookies = req.cookies;
    console.log(req.body)
    console.log(`cookie avialable at login: ${JSON.stringify(cookies)}`)
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "username and password are required!" });
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.status(401).json({ "message": "Unauthorized!" }); //? Unauthorized.
    const match = await bcrypt.compare(pwd, foundUser.pwd); //? Evalute password
    if (match) {
        //? Create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" } //30m
        );
        const newRefreshToken = jwt.sign(
            {
                "username": foundUser.username,

            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" } //1d
        );

        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rToken => rToken !== cookies?.jwt)
        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();
            //? Detect refresh token reused and deleting it if found
            if (!foundToken) {
                console.log('Hacker trying to bridge refresh token; attempted to reuse refresh token at login')
                newRefreshTokenArray = [];

            }
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })

        }

        //? Saving refresh token with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        delete foundUser.pwd
        const user = await foundUser.save();
        const { pwd, refreshToken, ...rest } = user._doc;
        console.log(rest);
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 }).json({ rest, accessToken }) /*secure: true*/;
        res.end()

    } else {
        return res.sendStatus(401);
    }
}

module.exports = { handleLogIn };