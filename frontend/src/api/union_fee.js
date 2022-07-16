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
  return axiosUtils.getRequest(url, 'UF-01');
};

const getOfStudent = () => {
  let url = `${BASE_URL}/student`;
  return axiosUtils.getRequest(url, 'UF-02');
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
  return axiosUtils.getRequest(url, 'UF-03');
}

const create = (unionFee) => {
  const url = `${BASE_URL}`;
  return axiosUtils.postRequest(url, { unionFee }, 'UF-04');
}

const submit = (unionFees) => {
  let url = `${BASE_URL}/submit`;
  return axiosUtils.putRequest(url, { unionFees }, 'UF-05');
};

const confirmSubmission = (submitUnionFeeIds) => {
  let url = `${BASE_URL}/confirm-submission`;
  return axiosUtils.putRequest(url, { submitUnionFeeIds }, 'UF-06');
};

const getInvoice = (studentId, unionFeeId) => {
  const url = `${BASE_URL}/invoice?studentId=${studentId}&unionFeeId=${unionFeeId}`;
  return axiosUtils.getRequest(url, 'UF-07');
};

export default { create, get, getOfStudent, submit, confirmSubmission, getInvoice, getOfStudents };
