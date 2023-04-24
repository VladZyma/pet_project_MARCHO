import axios from 'axios';
import {createBrowserHistory} from "history";
import {useDispatch} from 'react-redux';

import {baseURL} from "../config";
import {oauthService} from "./oauth.service";
import {oauthActions} from "../redux";

const history = createBrowserHistory();
const dispatch = useDispatch();
let isRefreshing = false;

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
  const accessToken = oauthService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  return config;
});

axiosService.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const refreshToken = oauthService.getRefreshToken();

  if (error.response?.status === 401 && refreshToken && !isRefreshing) {
    isRefreshing = true;

    try {
      const {data} = await oauthService.refresh(refreshToken);
      oauthService.setAccessTokens(data);
    } catch (e) {
      oauthService.deleteAccessTokens();
      dispatch(oauthActions.logIn(false));
      history.replace('/login?expSession=true');
    }

    isRefreshing = false;
    return axiosService(error.config);
  }

  return Promise.reject(error);
});

export {axiosService, history}