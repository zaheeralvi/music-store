const mongoose = require('mongoose');

var checkoutSchema = mongoose.Schema({
    album: Array,
    user_id: String,
    username: String,
});

module.exports = mongoose.model("checkout", checkoutSchema,'checkouts');

