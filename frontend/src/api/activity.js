import axiosUtils from '@/utils/axios';
const BASE_URL = '/activity';

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
  return axiosUtils.getRequest(url);
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
  return axiosUtils.getRequest(url);
}

const create = (activity) => {
  return axiosUtils.postRequest(`${BASE_URL}`, { newActivity: activity });
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`);
};

const update = (id, activity) => {
  console.log('mnk');
  return axiosUtils.putRequest(`${BASE_URL}`, {activityId: id, newActivity: activity});
};

const deleteActivities = (activityIds) => {
  return axiosUtils.deleteRequest(`${BASE_URL}`, {activityIds});
};



export default {getAll, create, getById, update, deleteActivities, get, getByCurrentStudent };
