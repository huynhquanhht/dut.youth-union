import axiosUtils from '@/utils/axios';
const BASE_URL = '/student';

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
  return axiosUtils.getRequest(url, 'STU-01');
};

const createByCSV = (file) => {
  const url = `${BASE_URL}/create-by-csv`;
  return axiosUtils.postRequest(url, file, 'STU-06');
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`, 'STU-02');
};

const create = (student) => {
  return axiosUtils.postRequest(`${BASE_URL}`, {student}, 'STU-03');
}

const update = (student) => {
  return axiosUtils.putRequest(`${BASE_URL}`, {student}, 'STU-04');
}

export default  { get, createByCSV, getById, create, update };