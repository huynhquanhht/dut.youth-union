import axiosUtils from '@/utils/axios';
const BASE_URL = '/faculty';

const get = () => {
  return axiosUtils.getRequest(`${BASE_URL}`, 'FA-01');
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`, 'FA-02');
};

const create = (faculty) => {
  console.log('faculty - ', faculty);
  return axiosUtils.postRequest(`${BASE_URL}`, faculty, 'FA-03');
}

const update = (faculty) => {
  console.log('faculty - ', faculty);
  return axiosUtils.putRequest(`${BASE_URL}`, {faculty}, 'FA-04');
}

export default {get, getById, create, update};
