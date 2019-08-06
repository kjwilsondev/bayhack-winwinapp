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
    // Add what type of artist they are
    // categories:
    //     cinematorgrapher,
    //     graphic artist,
    //     music producer,
    //     vocalist,
    
    // category: {
    //     type: String,
    //     ref: 'Category',
    // }
});

module.exports = User = mongoose.model("users", UserSchema);