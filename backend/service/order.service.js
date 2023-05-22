const {Order} = require('../dataBase');

const orderService = {
 createOrder: async (order) => {
   return Order.create(order);
 },
 findAllOrders: async (filter = {}) => {
   return Order.find(filter).sort({"createdAt": -1}).lean();
 },
};

module.exports = orderService;