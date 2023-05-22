import {axiosService} from "./axios.service";
import {urls} from "../config";

const orderService = {
  createOrder: (data) => axiosService.post(urls.orders, data),
  getOrders: () => axiosService.get(urls.orders),
};

export {orderService}
