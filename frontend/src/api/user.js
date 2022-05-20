import axiosUtils from '@/utils/axios';
const BASE_URL = '/user';

const login = (loginInfo) => {
  return axiosUtils.postRequest(`${BASE_URL}/login`, loginInfo);
};

const get = (query) => {
  let url = BASE_URL;
  let queryString = '';
  for (let attribute in query)  {
    queryString += `&${attribute}=${query[attribute]}`;
  }
  if (queryString) {
    queryString = queryString.slice(1, queryString.length);
    url += '?' + queryString;
  }
  return axiosUtils.getRequest(url, 1);
};

const getById = (userId) => {
  return axiosUtils.getRequest(`${BASE_URL}/${userId}`);
};

export default { login, get, getById };
