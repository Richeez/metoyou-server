const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    username: {
        type: String,
        required: true
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            username: {
                type: String,
                required: true

            },
            picsPath: {
                type: String,
            },
            comment: {
                type: String,
                required: true
            }

        }

    ],


    picsPath: [],
    userPicsPath: [],
    location: String,
    description: String,
    occupation: String,
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema);