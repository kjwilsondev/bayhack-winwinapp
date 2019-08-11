const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    // Future Implementation
    //
    // Quick Bio
    // bio: String
    //
    // Contact
    // website: String
    // email: User.email
    // 
    // Image
    // https://www.youtube.com/watch?v=srPXMt1Q0nY
    //
    // artist:
    //     cinematorgrapher,
    //     graphic artist,
    //     music producer,
    //     vocalist,
    // artist: {
    //     type: String,
    //     ref: 'User',
    // }
    //
    // Project
    // link: String
    // description: String
});

module.exports = User = mongoose.model("users", UserSchema);