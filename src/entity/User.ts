import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    remember: {
        type: Boolean,
        require: true
    }
})

const User = mongoose.model('Role', user);

module.exports = User;