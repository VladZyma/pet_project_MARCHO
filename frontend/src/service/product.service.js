import {axiosService} from "./axios.service";
import {urls} from "../config";

const productService = {
  getAllProducts: () => axiosService.get(urls.products),
};

export {productService}
