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

const create = (query) => {

};

const getOfStudent = () => {
  let url = `${BASE_URL}/student`;
  return axiosUtils.getRequest(url);
}

const getOfStudents = (query) => {
  console.log('abc');
  let url = `${BASE_URL}/students`;
  let queryString = '';
  for (let attribute in query)  {
    queryString += `&${attribute}=${query[attribute]}`;
  }
  if (queryString) {
    queryString = queryString.slice(1, queryString.length);
    url += '?' + queryString;
  }
  console.log('url - ', url);
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

const getInvoice = (studentId, unionFeeId) => {
  const url = `${BASE_URL}/invoice?studentId=${studentId}&unionFeeId=${unionFeeId}`;
  return axiosUtils.getRequest(url);
};

export default { create, get, getOfStudent, submit, confirmSubmission, getInvoice, getOfStudents };
