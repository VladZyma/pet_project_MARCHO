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
  findUpdateUserById: async (userId, userInfo) => {
    return User.findByIdAndUpdate(userId, userInfo, {new: true}).lean();
  },
  findUpdateUserWishListById: async (userId, productId) => {
    return User.findByIdAndUpdate(userId, {$push: {wishlist: productId}}, {new: true}).lean();
  },
  findDeleteProductFromUserWishListById: async (userId, productId) => {
    return User.updateOne({_id: userId}, {$pull: {wishlist: productId}}, {new: true}).lean();
  },
};

module.exports = userService;
