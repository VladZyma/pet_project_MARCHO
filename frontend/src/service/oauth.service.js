import {axiosService} from "./axios.service";
import {urls} from "../config";

const _accessTokenKey = 'accessToken';
const _refreshTokenKey = 'refreshToken';
const _userName = 'userName';
const _userId = 'userId';
const _actionToken = 'actionToken';

const oauthService = {
  register: (user) => axiosService.post(urls.register, user),
  login: (user) => axiosService.post(urls.auth.login, user),
  refresh: (refreshToken) => axiosService.post(urls.auth.refresh, {refreshToken}),
  logout: () => axiosService.post(urls.auth.logout),
  forgotPassword: (email) => axiosService.post(urls.auth.forgotPassword, email),
  setNewPassword: (info) => axiosService.put(urls.auth.forgotPassword, info),

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
  getUserId: () => {
    return localStorage.getItem(_userId);
  },
  deleteAccessTokens: () => {
    localStorage.removeItem(_accessTokenKey);
    localStorage.removeItem(_refreshTokenKey);
    localStorage.removeItem(_userName);
    localStorage.removeItem(_userId);
  },

  setActionToken: (token) => {
    localStorage.setItem(_actionToken, token);
  },
  getActionToken: () => {
    return localStorage.getItem(_actionToken);
  },
  deleteActionToken: () => {
    localStorage.removeItem(_actionToken);
  },
};

export {oauthService}