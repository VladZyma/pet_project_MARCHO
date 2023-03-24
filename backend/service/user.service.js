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
};

module.exports = userService;
