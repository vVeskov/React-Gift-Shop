const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingOrdersSchema = new Schema({
    giftsName: [{
        type: String,
        required: true
    }],
    totalSum: {
        type: mongoose.Schema.Types.Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
})
module.exports = mongoose.model('Pending-Orders', pendingOrdersSchema);
