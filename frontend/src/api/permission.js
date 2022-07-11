import axiosUtils from '@/utils/axios';
const BASE_URL = '/permission';

const update = (permission) => {
  let url = `${BASE_URL}`;
  return axiosUtils.putRequest(url, {permission});
}

export default { update };
