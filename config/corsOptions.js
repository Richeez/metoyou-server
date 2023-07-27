const allowedOrigins = require('./allowedOrigins')
const corsOptions = {
    origin: (origin, callback) => {
        const isAllowedOrigin = allowedOrigins.includes(origin) || !origin;
        callback(null, isAllowedOrigin);

    },
    optionsSuccessStatus: 200
}
module.exports = corsOptions;
