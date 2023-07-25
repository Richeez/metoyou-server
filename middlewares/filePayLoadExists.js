const filePayLoadExists = (req, res, next) => {
    const files = req.files;
    console.log("🚀 ~ file: filePayLoadExists.js:3 ~ filePayLoadExists ~ files:", files)
    if (!files || Object.keys(files).length === 0) return res.status(400).send('No files were uploaded.');

    next()
}

module.exports = filePayLoadExists;