const {Product} = require('../dataBase');

const productService = {
  createProduct: async (productInfo) => {
    return Product.create(productInfo);
  },
  findAllProducts: async (query) => {
    const {limit = 6, page = 1} = query;

    let findObj = {};

    const [products, count] = await Promise.all([
        Product.find(findObj).limit(limit).skip((+page - 1) * limit).lean(),
        Product.count(findObj),
    ]);

    const totalPages = Math.ceil(count / limit);
    let prevPage = false;
    let nextPage = false;

    if (page < totalPages) {
      nextPage = true;
    }
    if (page > 1) {
      prevPage = true;
    }
    if (page === totalPages) {
      nextPage = false;
    }

    return {
      products,
      page: +page,
      totalPages,
      prevPage,
      nextPage,
      count,
    }
  },
  findProductById: async (productId) => {
    return Product.findById(productId).lean();
  },
  findUpdateProductById: async (productId, productInfo) => {
    return Product.findByIdAndUpdate(productId, productInfo, {new: true}).lean();
  },
};


module.exports = productService;
