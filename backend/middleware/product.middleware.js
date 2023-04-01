const {mongoIdValidator} = require('../validator');
const {ApiError} = require('../customError');

const productMiddleware = {
  isProductIdValid: (req, res, next) => {
    try {
      const {productId} = req.params;

      const validate = mongoIdValidator.validate(productId);

      if (validate.error) {
        throw new ApiError(validate.error.message, 400);
      }

      req.productId = validate.value;
      next();
    } catch (e) {
      next(e);
    }
  },
};

module.exports = productMiddleware;
