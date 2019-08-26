const mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    title: String,
    image: String,
});

module.exports = mongoose.model("album", albumSchema,'albums');

