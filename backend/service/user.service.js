const {User} = require('../dataBase');

const userService = {
  register: async (userInfo) => {
    return User.create(userInfo);
  },
  findAllUsers: async (filter = {}) => {
    return User.find(filter).lean();
  },
  findUserByEmail: async (email) => {
    return User.findOne({email}).lean();
  },
  findUserById: async (userId) => {
    return User.findById(userId).lean();
  },
  findDeleteUserById: async (userId) => {
    return User.findByIdAndDelete(userId);
  },
  findUpdateUserById: async (userId, userInfo) => {
    return User.findByIdAndUpdate(userId, userInfo, {new: true}).lean();
  },
  findUpdateUserProductById: async (userId, productId, key, selectedSize) => {
    if (key === 'wishlist') {
      return User.findByIdAndUpdate(userId, {$push: {[key]: productId}}, {new: true}).lean();
    }
    if (key === 'cart') {
      return User.findByIdAndUpdate(userId, { $push: {"cart.products": productId, "cart.sizes": {"productId": productId, "size": selectedSize}} }, {new: true}).lean();
    }
  },
  findDeleteUserProductById: async (userId, productId, key) => {
    if (key === 'wishlist') {
      return User.updateOne({_id: userId}, { $pull: {[key]: productId} }, {new: true}).lean();
    }
    if (key === 'cart') {
      return User.updateOne({_id: userId}, { $pull: {"cart.products": productId, "cart.sizes": {"productId": productId}} });
    }
  },
};

module.exports = userService;
