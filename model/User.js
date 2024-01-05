const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        min: 2,
        max: 50,
        unique: true,
        required: true
    },
    nickname: {
        type: String,
        min: 2,
        max: 50,
        unique: true,
    },
    email: {
        type: String,
        max: 50,
        unique: true,
        required: true
    },
    pwd: {
        type: String,
        min: 5,
        required: true
    },
    picsPath: {
        type: Array,
        default: []

    },
    backgroundBg: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    refreshToken: String,
    viewedProfile: Number,
    impressions: Number,
    location: String,
    occupation: String
}, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);