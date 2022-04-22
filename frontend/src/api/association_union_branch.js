import axiosUtils from '@/utils/axios';
const BASE_URL = '/association-union-branch';

const getAll = () => {
  return axiosUtils.getRequest(`${BASE_URL}`);
};

export default {getAll};
