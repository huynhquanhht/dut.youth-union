import axiosUtils from '@/utils/axios';
const BASE_URL = '/faculty';

const get = () => {
  return axiosUtils.getRequest(`${BASE_URL}`);
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`);
};

export default {get, getById};
