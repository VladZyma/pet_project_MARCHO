import {axiosService} from "./axios.service";
import {urls} from "../config";

const productService = {
  addProduct: (productInfo) => axiosService.post(urls.products.all, productInfo),
  getAllProducts: (page = 1) => axiosService.get(urls.products.all, {params: {page}}),
  getPromoProducts: (page = 1) => axiosService.get(urls.products.promo, {params: {page}}),
  getProductsByParams: (page = 1,values) => axiosService.get(urls.products.all, {params: {page, ...values}}),
  getProductsFromWishlist: (productsIdArr) => axiosService.post(urls.products.wishlist, productsIdArr),
  getProductsFromCart: (productsIdArr) => axiosService.post(urls.products.cart, productsIdArr),
  updateProductById: (productId, productInfo) => axiosService.put(`${urls.products.all}/${productId}`, productInfo),
  addProductPhotoById: (productId, data) => axiosService.patch(`${urls.products.all}/${productId}/photo`, data),
  deleteProductById: (productId) => axiosService.delete(`${urls.products.all}/${productId}`),
};

export {productService}
