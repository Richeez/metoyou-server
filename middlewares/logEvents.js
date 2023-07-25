const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateAndTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logTime = `Date: ${dateAndTime}\t Id: ${uuid()}\t${message}\n`;
    console.log(logTime);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
            console.log("as dir: ", __dirname)
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logTime);
    } catch (error) {
        console.log(error)

    }

}

const logger = (req, res, next) => {
    console.log(`Method: ${req.method}\n\nPath: ${req.path}`)
    logEvents(`Method: ${req.method}\tFrom: ${req.headers.origin}\tFor: ${req.url}`, 'reqLog.txt');
    next()
}

module.exports = { logger, logEvents };