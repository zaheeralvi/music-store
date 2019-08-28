const mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    title: String,
    artist: String,
    image: String,
    genre: String,
    songs: Array
});

module.exports = mongoose.model("album", albumSchema,'albums');

