const {model, Schema, Types} = require('mongoose');

const actionTokenSchema = new Schema({
  _user_id: {type: Types.ObjectId, ref: 'User'},
  tokenType: String,
  actionToken: String,
}, {
  timestamps: true,
});

module.exports = model('ActionToken', actionTokenSchema);
