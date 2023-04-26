const {Product} = require('../dataBase');

const productService = {
  createProduct: async (productInfo) => {
    return Product.create(productInfo);
  },
  findAllProducts: async (query) => {
    const {limit = 6, page = 1, sort = 'default', title, priceMin, priceMax, color, size, category, tags} = query;

    let findObj = {};
    let sortObg = {};

    switch (sort) {
      case 'default':
        sortObg = {'createdAt': 1}
        break;
      case 'ratingDown':
        sortObg = {'rating': -1}
        break;
      case 'ratingUp':
        sortObg = {'rating': 1}
        break;
      case 'priceDown':
        sortObg = {'price.current': -1}
        break;
      case 'priceUp':
        sortObg = {'price.current': 1}
        break;
    }

    if (title) {
      const titleArr = title.split(' ');

      const normalizedTitleArr = titleArr.map(title => title.charAt(0).toUpperCase() + title.slice(1).toLowerCase());
      const normalizedTitle = normalizedTitleArr.join(' ');

      findObj = {...findObj, title: {$regex: normalizedTitle}};
    }

    if (priceMin && priceMax) {
      findObj = {$and: [
          {...findObj},
          {$or: [{'price.current': {$lte: priceMax, $gte: priceMin}}, {'price.sale': {$lte: priceMax, $gte: priceMin}}] },
        ]};
    }

    if (color) {
      const colorArr = color.split(',');

      findObj = {$and: [
          {...findObj},
          {color: {$in: colorArr}}
        ]};
    }

    if (size) {
      const normalizedSize = size.toUpperCase();

      findObj = {...findObj,  info: {$elemMatch: {size: normalizedSize}}}
    }

    if (category) {
      findObj = {...findObj, categories: {$in: [category]}}
    }

    if (tags) {
      const tagsArr = tags.split(',');

      findObj = {...findObj, tags: {$in: tagsArr}}
    }

    const [products, count] = await Promise.all([
        Product.find(findObj).limit(limit).skip((+page - 1) * limit).sort(sortObg).lean(),
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
  findProductsFromWishlist: async (productIdArr) => {
    return Product.find({_id: {$in: productIdArr}}).lean();
  },
};


module.exports = productService;
