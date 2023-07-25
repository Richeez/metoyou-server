const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Map,
        of: Boolean
    },
    picsPath: { type: String, required: true },
    userPicsPath: String,
    location: String,
    description: String,
    occupation: String,
    refreshToken: [String]
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema);