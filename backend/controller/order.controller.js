const {orderService} = require('../service');

const orderController = {
  addOrder: async (req, res, next) => {
    try {
      const data = req.body;
      const order = await orderService.createOrder(data);

      res.status(201).json(order);
    } catch (e) {
      next(e);
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const orders = await orderService.findAllOrders();

      res.status(200).json(orders);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = orderController;