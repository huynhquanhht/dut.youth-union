import axiosUtils from '@/utils/axios';
const BASE_URL = '/user';

const login = (loginInfo) => {
  return axiosUtils.postRequest(`${BASE_URL}/login`, loginInfo);
};

export default { login };
