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
  return axiosUtils.getRequest(url);
};

const uploadCSV = (file) => {
  console.log('file - ', file);
  const url = `${BASE_URL}/create-by-csv`;
  return axiosUtils.postRequest(url, file);
}

const deleteActivityClass = (activityClassId) => {
  console.log('activityId - ', activityClassId);
  const url = `${BASE_URL}/${activityClassId}`;
  return axiosUtils.deleteRequest(url);
};
export default {get, uploadCSV, deleteActivityClass};
