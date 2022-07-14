import axios from 'axios';
import localStorageUtils from '@/utils/local_storage';
import router from '@/router';
import MESSAGE from './message';
import store from '@/store';

const service = axios.create({
  baseURL: process.env.VUE_APP_SERVER,
  timeout: process.env.VUE_APP_TIMEOUT,
});

service.interceptors.request.use(
  (config) => {
    const userToken = localStorageUtils.getService().getToken();
    if (userToken) {
      config.headers['Authorization'] = 'Bearer ' + userToken;
    }
    config.headers['Content-type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  function (error) {
    console.log('error - ', error);
    if (error.response.status === 401) {
      localStorageUtils.getService().clearAll();
      if (error.response.data.message === MESSAGE.LOGIN_FAIL) {
        console.log('abc');
        return Promise.reject(error);
      }
      router.replace({ path: '/login' });
      return;
    }
    if (error.response.status === 404) {
      router.replace({ path: '/error/not-found' });
      return;
    }
    if (error.response.status === 403) {
      store.commit('setSnackbar', {
        type: 'info',
        visible: true,
        text: error.response.data.message,
      })
      return;
    }
    if (error.response.status === 500) {
      router.push({ name: 'internal-server' });
      return;
    }
    return Promise.reject(error);
  }
);

const getRequest = (url, functionId) => {
  return service.request({
    method: 'get',
    url: url,
    responseType: 'json',
    headers: {
      function_id: functionId,
    }
  });
};

const putRequest = (url, data = {}, functionId) => {
  return service.request({
    method: 'put',
    url: url,
    responseType: 'json',
    data: data,
    headers: {
      function_id: functionId,
    }
  });
};

const postRequest = (url, data = {}, functionId) => {
  return service.request({
    method: 'post',
    url: url,
    responseType: 'json',
    data: data,
    headers: {
      function_id: functionId,
      'Content-Type': 'multipart/form-data',
    }
  });
};

const deleteRequest = (url, data = {}, functionId) => {
  return service.request({
    method: 'delete',
    url: url,
    responseType: 'json',
    data: data,
    headers: {
      function_id: functionId,
    }
  });
};

export default { getRequest, postRequest, putRequest, deleteRequest };
