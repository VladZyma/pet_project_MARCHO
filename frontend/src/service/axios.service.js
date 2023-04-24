import axios from 'axios';

import {baseURL} from "../config";
import {oauthService} from "./oauth.service";

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
  const accessToken = oauthService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  return config;
});

export {axiosService}