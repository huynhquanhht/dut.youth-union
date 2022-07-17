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
  return axiosUtils.getRequest(url, 'UT-01');
};

const update = (unionTextbooks) => {
  let url = BASE_URL;
  return axiosUtils.putRequest(url, {unionTextbooks}, 'UT-02');
};

const confirmSubmission = (unionTextbookIds) => {
  let url = `${BASE_URL}/confirm-submission`;
  return axiosUtils.putRequest(url, {unionTextbookIds}, 'UT-03');
}

export default { get, update, confirmSubmission};
