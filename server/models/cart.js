const mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    album_id: String,
    user_id: String,
});

module.exports = mongoose.model("cart", cartSchema,'carts');

