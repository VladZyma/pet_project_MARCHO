const {Product} = require('../dataBase');

const productService = {
  createProduct: async (productInfo) => {
    return Product.create(productInfo);
  },
  findAllProducts: async (query) => {
    const {limit = 6, page = 1, title, priceMin, priceMax, color, size, category, tags} = query;

    let findObj = {};

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
