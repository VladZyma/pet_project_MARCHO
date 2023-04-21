const useCreateProductObj = (product, selectedSize) => {

  const productColors = {
    blue: '#00aeef',
    red: '#f52574',
    green: '#24d4ac',
    orange: '#ff7e00',
    black: '#000000',
    purple: '#923899',
  };

  let productPrice = product.price.current;

  if (product.isSale) {
    productPrice = product.price.sale;
  }

  const productObj = {
    id: product._id,
    title: product.title,
    img: product.photo,
    price: productPrice,
    color: productColors[product.color],
    size: selectedSize,
    sku: product.sku,
    quantity: product.quantity,
  };

  return productObj;
};

export {useCreateProductObj}
