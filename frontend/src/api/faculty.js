import axiosUtils from '@/utils/axios';
const BASE_URL = '/faculty';

const get = () => {
  return axiosUtils.getRequest(`${BASE_URL}`);
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`);
};

const create = (faculty) => {
  console.log('faculty - ', faculty);
  return axiosUtils.postRequest(`${BASE_URL}`, faculty);
}

const update = (faculty) => {
  console.log('faculty - ', faculty);
  return axiosUtils.putRequest(`${BASE_URL}`, {faculty});
}

export default {get, getById, create, update};
