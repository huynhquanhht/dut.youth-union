import axiosUtils from '@/utils/axios';
const BASE_URL = '/news';

const getAll = (page, size) => {
  return axiosUtils.getRequest(`${BASE_URL}?page=${page}&size=${size}`);
};

const get = (query) => {
  let url = BASE_URL;
  let queryString = '';
  for (let attribute in query) {
    queryString += `&${attribute}=${query[attribute]}`;
  }
  if (queryString) {
    queryString = queryString.slice(1, queryString.length);
    url += '?' + queryString;
  }
  return axiosUtils.getRequest(url, 'NE-01');
};

const getByCurrentStudent = (query) => {
  let url = BASE_URL;
  let queryString = '';
  for (let attribute in query) {
    queryString += `&${attribute}=${query[attribute]}`;
  }
  if (queryString) {
    queryString = queryString.slice(1, queryString.length);
    url += '?' + queryString;
  }
  return axiosUtils.getRequest(url, 'NE-01');
}

const create = (news) => {
  return axiosUtils.postRequest(`${BASE_URL}`, { news: news }, 'NE-03');
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`, 'NE-02');
};

const update = (id, news) => {
  console.log('mnk');
  return axiosUtils.putRequest(`${BASE_URL}`, {newsId: id, news: news}, 'NE-04');
};

const deleteActivities = (newsIds) => {
  return axiosUtils.deleteRequest(`${BASE_URL}`, {newsIds}, 'NE-05');
};



export default {getAll, create, getById, update, deleteActivities, get, getByCurrentStudent };
