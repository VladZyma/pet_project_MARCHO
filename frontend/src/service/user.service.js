import {axiosService} from "./axios.service";
import {urls} from "../config";

const userService = {
    register: (user) => axiosService.post(urls.register, user),
    getAll: () => axiosService.get(urls.users),
};

export {userService}