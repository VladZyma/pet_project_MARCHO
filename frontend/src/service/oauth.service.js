import {axiosService} from "./axios.service";
import {urls} from "../config";

const _accessTokenKey = 'accessToken';
const _refreshTokenKey = 'refreshToken';
const _userName = 'userName';
const _userId = 'userId';

const oauthService = {
  register: (user) => axiosService.post(urls.register, user),
  login: (user) => axiosService.post(urls.auth.login, user),
  refresh: (refresh) => axiosService.post(urls.auth.refresh, {refresh}),

  setAccessTokens: ({accessToken, refreshToken, name, userId}) => {
    localStorage.setItem(_accessTokenKey, accessToken);
    localStorage.setItem(_refreshTokenKey, refreshToken);
    localStorage.setItem(_userName, name);
    localStorage.setItem(_userId, userId);
  },
  getAccessToken: () => {
    return localStorage.getItem(_accessTokenKey);
  },
  getRefreshToken: () => {
    return localStorage.getItem(_refreshTokenKey);
  },
  getUserName: () => {
    return localStorage.getItem(_userName);
  },
  deleteAccessTokens: () => {
    localStorage.removeItem(_accessTokenKey);
    localStorage.removeItem(_refreshTokenKey);
    localStorage.removeItem(_userName);
  },
};

export {oauthService}