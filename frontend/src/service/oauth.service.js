import {axiosService} from "./axios.service";
import {urls} from "../config";

const _accessTokenKey = 'accessToken';
const _refreshTokenKey = 'refreshToken';
const _userName = 'userName';
const _userId = 'userId';
const _actionToken = 'actionToken';
const _isLoggedIn = 'isLoggedIn';

const oauthService = {
  register: (user) => axiosService.post(urls.register, user),
  login: (user) => axiosService.post(urls.auth.login, user),
  refresh: (refreshToken) => axiosService.post(urls.auth.refresh, {refreshToken}),
  logout: () => axiosService.post(urls.auth.logout),
  forgotPassword: (data) => axiosService.post(urls.auth.forgotPassword, data),
  setNewPassword: (info) => axiosService.put(urls.auth.forgotPassword, info),

  setAccessTokens: ({accessToken, refreshToken, name, userId, isLoggedIn}) => {
    localStorage.setItem(_accessTokenKey, accessToken);
    localStorage.setItem(_refreshTokenKey, refreshToken);
    localStorage.setItem(_userName, name);
    localStorage.setItem(_userId, userId);
    localStorage.setItem(_isLoggedIn, isLoggedIn);
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
  getIsLoggedIn: () => {
    return localStorage.getItem(_isLoggedIn);
  },
  deleteAccessTokens: () => {
    localStorage.removeItem(_accessTokenKey);
    localStorage.removeItem(_refreshTokenKey);
    localStorage.removeItem(_userName);
    localStorage.removeItem(_userId);
    localStorage.removeItem(_isLoggedIn);
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