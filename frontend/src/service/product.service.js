import {axiosService} from "./axios.service";
import {urls} from "../config";

const productService = {
  getAllProducts: (page = 1) => axiosService.get(urls.products.all, {params: {page}}),
  getPromoProducts: (page = 1) => axiosService.get(urls.products.promo, {params: {page}}),
  getProductsByParams: (page = 1,values) => axiosService.get(urls.products.all, {params: {page, ...values}}),
  getProductsFromWishlist: (productsIdArr) => axiosService.post(urls.products.wishlist, productsIdArr),
};

export {productService}
