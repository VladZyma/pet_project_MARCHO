const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema({
  name: {type: String, trim: true, require: true},
  email: {type: String, trim: true, lowercase: true, unique: true, require: true},
  password: {type: String, require: true},
  wishlist: [Types.ObjectId],
  terms: {type: Boolean, require: true},
}, {
  timestamps: true,
});

module.exports = model('User', userSchema);
