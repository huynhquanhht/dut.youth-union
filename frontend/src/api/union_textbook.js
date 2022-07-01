import axiosUtils from '@/utils/axios';
const BASE_URL = '/union-textbook';

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
  return axiosUtils.getRequest(url);
};

const update = (unionTextbooks) => {
  let url = BASE_URL;
  return axiosUtils.putRequest(url, {unionTextbooks});
};

const confirmSubmission = (unionTextbookIds) => {
  let url = `${BASE_URL}/confirm-submission`;
  return axiosUtils.putRequest(url, {unionTextbookIds});
}

export default { get, update, confirmSubmission};
