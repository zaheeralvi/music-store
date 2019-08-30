const mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    title: String,
    artist: Object,
    image: String,
    genre: String,
    songs: Array,
    price: Number,
});

module.exports = mongoose.model("album", albumSchema,'albums');

