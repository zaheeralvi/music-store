
const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
});

module.exports = mongoose.model("user", userSchema,'users');

