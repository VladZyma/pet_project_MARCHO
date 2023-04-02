import {axiosService} from "./axios.service";
import {urls} from "../config";

const productService = {
  getAllProducts: (page = 1) => axiosService.get(urls.products, {params: {page}}),
};

export {productService}
