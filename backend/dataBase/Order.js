const {model, Schema} = require('mongoose');

const OrderSchema = new Schema({
  name: String,
  email: String,
  city: String,
  country: String,
  address: String,
  postalCode: String,
  status: String,
  productsInfo: [{type: Object}],
}, {
  timestamps: true,
});

module.exports = model('Order', OrderSchema);
