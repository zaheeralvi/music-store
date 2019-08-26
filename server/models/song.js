const mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    title: String,
    album_id: String,
    artist_id: String,
});

module.exports = mongoose.model("song", songSchema,'songs');

