import {axiosService} from "./axios.service";
import {urls} from "../config";

const userService = {
  // register: (user) => axiosService.post(urls.register, user),
  // login: (user) => axiosService.post(urls.auth.login, user),
  // refresh: (refresh) => axiosService.post(urls.auth.refresh, {refresh}),
  getAll: () => axiosService.get(urls.users),
};

export {userService}