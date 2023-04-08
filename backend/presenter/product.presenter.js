const normalizeOne = (product) => {
  return  {
    _id: product._id,
    title: product.title,
    color: product.color,
    info: product.info.map(item => item),
    photo: product.photo,
    sku: product.sku,
    rating: product.rating,
    votes: product.votes,
    quantity: product.quantity,
    isSale: product.isSale,
    price: {
      current: product.price.current,
      sale: product.price.sale
    },
    categories: product.categories.map(category => category),
    tags: product.tags.map(tag => tag),
    review: product.review,

  }
};

const normalizeAll = (products) => {
  return products.map(product => normalizeOne(product));
};

module.exports = {
  normalizeOne,
  normalizeAll,
};