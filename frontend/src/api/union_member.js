import axiosUtils from '@/utils/axios';
const BASE_URL = '/union-member'

const getAll = (page, size) => {
  return axiosUtils.getRequest(`${BASE_URL}?page=${page}&size=${size}`);
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
  return axiosUtils.getRequest(url);
};

export default  { getAll, get };