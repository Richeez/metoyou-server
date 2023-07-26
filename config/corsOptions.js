const allowedOrigins = require('./allowedOrigins')
const corsOptions = {
    origin: (origin, callback) => {
        console.log("Allowed origin:", allowedOrigins.indexOf(origin))
        console.log("Unallowed origin:", !origin)
        const isAllowedOrigin = allowedOrigins.includes(origin) || !origin;
        callback(null, isAllowedOrigin);

    },
    optionsSuccessStatus: 200
}
module.exports = corsOptions;
