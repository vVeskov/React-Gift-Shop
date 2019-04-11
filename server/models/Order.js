const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productName: {
        type: mongoose.Schema.Types.String
    },
    user: {
        type: mongoose.Schema.Types.String
    },
    price: {
        type: mongoose.Schema.Types.String
    },
    giftQnt:{
        type: mongoose.Schema.Types.Number
    }
});

module.exports = mongoose.model('Order', orderSchema);