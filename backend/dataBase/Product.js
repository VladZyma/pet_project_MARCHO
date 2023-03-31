const {Schema, model} = require('mongoose');

const productSchema = new Schema({
  title: {type: String, trim: true, require: true},
  color: {type: String, trim: true, lowercase: true, require: true},
  size: {type: String, trim: true, lowercase: true, require: true},
  sku: {type: String, trim: true, uppercase: true, require: true},
  rating: {type: Number},
  votes: {type: Number},
  isSale: {type: Boolean, require: true},
  review: {type: String, require: true},
  price: {
    current: {type: Number, require: true},
    sale: {type: Number},
  },
  categories: [String],
  tags: [String],
}, {
  timestamps: true,
});

module.exports = model('Product', productSchema);
