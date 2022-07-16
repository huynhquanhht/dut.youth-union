import axiosUtils from '@/utils/axios';
const BASE_URL = '/activity-class';

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
  return axiosUtils.getRequest(url, 'ACLA-01');
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`, 'ACLA-02');
};


const create = (activityClass) => {
  let url = BASE_URL;
  return axiosUtils.postRequest(url, {activityClass}, 'ACLA-03');
};

const update = (activityClass) => {
  let url = BASE_URL;
  return axiosUtils.putRequest(url, {activityClass}, 'ACLA-04');
}

const uploadCSV = (file) => {
  console.log('file - ', file);
  const url = `${BASE_URL}/create-by-csv`;
  return axiosUtils.postRequest(url, file, 'ACLA-06');
}

const deleteActivityClass = (activityClassId) => {
  console.log('activityId - ', activityClassId);
  const url = `${BASE_URL}/${activityClassId}`;
  return axiosUtils.deleteRequest(url, 'ACLA-05');
};
export default {get, uploadCSV, deleteActivityClass, create, update, getById};
