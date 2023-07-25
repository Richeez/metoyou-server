const path = require("path")

const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {

        const files = req.files;

        const fileExtentions = []
        Object.keys(files).forEach(key => {
            fileExtentions.push(path.extname(files[key].name))
        })

        //? Check if file extensions are allowed
        const isAllowed = fileExtentions.every(ext => allowedExtArray.includes(ext))
        if (!isAllowed) {

            const message = `Upload Failed. Only ${allowedExtArray.toSting()} files allowed.`.replaceAll(",", ", ")
            return res.status(422).json({ status: "error", message })

        }
        next()

    }
}

module.exports = fileExtLimiter;