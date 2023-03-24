const {Schema, model, Types} = require('mongoose');

const oauthSchema = new Schema({
  _user_id: {type: Types.ObjectId, ref: 'User', require: true},
  accessToken: {type: String, require: true},
  refreshToken: {type: String, require: true},
}, {
  timestamps: true,
});

module.exports = model('OAuth', oauthSchema);
