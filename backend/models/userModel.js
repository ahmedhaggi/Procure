// Database schema of users

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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

    isUser: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    resetCode: { type: String }

}, {
    timestamps: true
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel