const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftSchema = new Schema({
  giftName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Gift', giftSchema);