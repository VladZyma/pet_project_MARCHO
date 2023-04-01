const {Schema, model} = require('mongoose');

const productSchema = new Schema({
  title: {type: String, trim: true, require: true},
  color: {type: String, trim: true, lowercase: true, require: true},
  info: [{
    size: {type: String, require: true},
    quantity: {type: Number, require: true},
  }],
  photo: {type: String},
  sku: {type: String, trim: true, uppercase: true, require: true},
  rating: {type: Number},
  votes: {type: Number},
  quantity: {type: Number, require: true},
  isSale: {type: Boolean, require: true},
  price: {
    current: {type: Number, require: true},
    sale: {type: Number},
  },
  categories: [String],
  tags: [String],
  review: {type: String, require: true},
}, {
  timestamps: true,
});

module.exports = model('Product', productSchema);
