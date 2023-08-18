const { logEvents } = require("./logEvents")


const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt')
    console.error(err.stack)
    const status = res?.statusCode ? res.statusCode : 500 // server Error
    res.status(status).json({ message: err.message, isError: true })

}

module.exports = errorHandler;