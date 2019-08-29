const mongoose = require('mongoose');

var checkoutSchema = mongoose.Schema({
    album: Object,
    user_id: String,
});

module.exports = mongoose.model("checkout", checkoutSchema,'checkouts');

