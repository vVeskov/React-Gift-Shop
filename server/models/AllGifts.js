const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingOrdersSchema = new Schema({
    giftsName: [{
        type: String,
        required: true
    }],
    totalSum: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }

})
module.exports = mongoose.model('PendingOrder', pendingOrdersSchema);
