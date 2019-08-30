const mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    album: Object,
    user_id: String,
    album_id: String,
});

module.exports = mongoose.model("cart", cartSchema,'carts');

