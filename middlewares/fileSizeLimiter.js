const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024

const fileSizeLimiter = (req, res, next) => {
    const files = req.files;
    const filesOverLimit = []
    //? Check for files that are over limit
    Object.keys(files).forEach(keys => {
        if (files[keys].size > FILE_SIZE_LIMIT) {
            filesOverLimit.push(files[keys].name)
        }
    })

    if (filesOverLimit.length) {
        const properVerb = filesOverLimit.length > 1 ? "are" : "is";
        const errorMsg = `Upload Failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB`.replaceAll(",", ", ")
        const message = filesOverLimit.length < 3
            ? errorMsg.replace(",", "and")
            : errorMsg.replace(/, (?=[^,]*$)/, " and")

        return res.status(413).json({ status: "error", message })
    }
    next()
}

module.exports = fileSizeLimiter;