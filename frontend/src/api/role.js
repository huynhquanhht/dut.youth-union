import axiosUtils from '@/utils/axios';
const BASE_URL = '/role';

const getAll = () => {
  let url = `${BASE_URL}/all`;
  return axiosUtils.getRequest(url);
}

const getById = (id) => {
  let url = `${BASE_URL}/${id}`;
  return axiosUtils.getRequest(url, 1);
};

export default { getById, getAll };
