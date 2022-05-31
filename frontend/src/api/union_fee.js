import axiosUtils from '@/utils/axios';
const BASE_URL = '/union-fee';

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

const getOfStudent = (query) => {
  let url = `${BASE_URL}/student`;
  let queryString = '';
  for (let attribute in query)  {
    queryString += `&${attribute}=${query[attribute]}`;
  }
  if (queryString) {
    queryString = queryString.slice(1, queryString.length);
    url += '?' + queryString;
  }
  return axiosUtils.getRequest(url);
}

const submit = (unionFees) => {
  let url = `${BASE_URL}/submit`;
  return axiosUtils.putRequest(url, { unionFees });
};

const confirmSubmission = (submitUnionFeeIds) => {
  let url = `${BASE_URL}/confirm-submission`;
  return axiosUtils.putRequest(url, { submitUnionFeeIds });
};

export default { get, getOfStudent, submit, confirmSubmission };
