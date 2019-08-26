const mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    title: String,
    image: String,
    genre: String,
});

module.exports = mongoose.model("album", albumSchema,'albums');

