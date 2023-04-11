import {axiosService} from "./axios.service";
import {urls} from "../config";

const productService = {
  getAllProducts: (page = 1) => axiosService.get(urls.products, {params: {page}}),
  // getProductsByParams: (page = 1, value) => axiosService.get(`${urls.products}?${value}`, {params: {page}}),
  getProductsByParams: (
      page = 1,
      limit = 2,
      title,
      priceMin,
      priceMax,
      color,
      size,
      category,
      tags) => axiosService.get(`${urls.products}`, {params: {page, limit, title, priceMin, priceMax, color, size, category, tags}}),
};

export {productService}
