import {axiosService} from "./axios.service";
import {urls} from "../config";

const userService = {
  findUserById: (userId) =>
      axiosService.get(`${urls.users.users}/${userId}`),

  deleteUserById: (userId) =>
      axiosService.delete(`${urls.users.users}/${userId}`),

  updateUserWishListById: (userId, productId) =>
      axiosService.post(`${urls.users.wishList.add}/${userId}`, {productId}),

  deleteProductFromUserWishListById: (userId, productId) =>
      axiosService.post(`${urls.users.wishList.remove}/${userId}`, {productId}),

};

export {userService}
