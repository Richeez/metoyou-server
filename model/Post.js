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
                require: true
            },
            username: {
                type: String,
                require: true

            },
            picsPath: {
                type: String,
            },
            comment: {
                type: String,
                require: true
            }

        }

    ],


    picsPath: { type: String, required: true },
    userPicsPath: String,
    location: String,
    description: String,
    occupation: String,
    refreshToken: [String]
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema);