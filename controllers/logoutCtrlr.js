const User = require('../model/User');

const handleLogout = async (req, res) => {
    //TODONOTE: ALso delete access token from client side
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //? No content
    const refreshToken = cookies.jwt;
    //? check for refreshToken in data base
    const userFound = await User.findOne({ refreshToken });
    if (!userFound) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }
    //? Delete refresh token from data base
    userFound.refreshToken = userFound.refreshToken.filter(rToken => rToken !== refreshToken);
    const result = await userFound.save();
    console.log(result)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204);
}

module.exports = { handleLogout };