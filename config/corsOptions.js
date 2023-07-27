const allowedOrigin = require('./allowedOrigins')
const corsOptions = {
    origin: (origin, callback) => {
        allowedOrigin.indexOf(origin) !== -1 || !origin
            ? callback(null, true)
            : callback(new Error('Not allowed by CORS'))
    },
    optionsSuccessStatus: 200
}
module.exports = corsOptions;
