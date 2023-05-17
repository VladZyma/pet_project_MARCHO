import axios from 'axios';
import {createBrowserHistory} from "history";

import {baseURL} from "../config";
import {oauthService} from "./oauth.service";

const history = createBrowserHistory();
let isRefreshing = false;

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
  const accessToken = oauthService.getAccessToken();
  const actionToken = oauthService.getActionToken();

  if (accessToken) {
    config.headers.Authorization = accessToken;
  } else if (actionToken) {
    config.headers.Authorization = actionToken;
  }

  return config;
});

axiosService.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const refreshToken = oauthService.getRefreshToken();

  const userId = oauthService.getUserId();
  const isLoggedIn = oauthService.getIsLoggedIn();

  if (error.response?.status === 401 && refreshToken && !isRefreshing) {
    isRefreshing = true;

    try {
      const {data} = await oauthService.refresh(refreshToken);
      oauthService.setAccessTokens({...data, userId, isLoggedIn});
    } catch (e) {
      oauthService.deleteAccessTokens();
      history.replace('/login?expSession=true');
    }

    isRefreshing = false;
    return axiosService(error.config);
  }

  return Promise.reject(error);
});

export {axiosService, history}