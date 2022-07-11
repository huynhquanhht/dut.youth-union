import axiosUtils from '@/utils/axios';
const BASE_URL = '/activity';

const getAll = (page, size) => {
  return axiosUtils.getRequest(`${BASE_URL}/all?page=${page}&size=${size}`);
};

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

const getRegisteredListById = (activityId, query) => {
  let url = `${BASE_URL}/registered-list/${activityId}`;
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

const getByCurrentStudent = (query) => {
  let url = `${BASE_URL}/student`;
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

const getPointListOfCurrentStudent = (schoolYear) => {
  let url = `${BASE_URL}/student/point-list?schoolYear=${schoolYear}`;
  return axiosUtils.getRequest(url);
};

const create = (activity) => {
  return axiosUtils.postRequest(`${BASE_URL}`, { newActivity: activity });
};

const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`);
};

const update = (id, activity) => {
  console.log('mnk');
  return axiosUtils.putRequest(`${BASE_URL}`, {activityId: id, newActivity: activity});
};

const deleteActivities = (activityIds) => {
  return axiosUtils.deleteRequest(`${BASE_URL}`, {activityIds});
};

const openActivityRegistration = (activityId) => {
  return axiosUtils.putRequest(`${BASE_URL}/open-registration/${activityId}`);
};

const closeActivityRegistration = (activityId) => {
  return axiosUtils.putRequest(`${BASE_URL}/close-registration/${activityId}`);
};

const register = (activityId) => {
  return axiosUtils.postRequest(`${BASE_URL}/register/${activityId}`);
}

const attend = (activityId) => {
  return axiosUtils.putRequest(`${BASE_URL}/attend/${activityId}`);
}

const addParticipant = (participantInfo) => {
  return axiosUtils.postRequest(`${BASE_URL}/add-participant`, participantInfo);
};

const attendParticipants = (registrationIds) => {
  return axiosUtils.putRequest(`${BASE_URL}/attend-participants`, {registrationIds});
};

const deleteParticipants = (registrationIds) => {
  return axiosUtils.deleteRequest(`${BASE_URL}/delete-participants`, {registrationIds});
}

export default {
  getAll,
  create,
  getById,
  update,
  deleteActivities,
  get,
  getByCurrentStudent,
  openActivityRegistration,
  closeActivityRegistration,
  getPointListOfCurrentStudent,
  register,
  attend,
  getRegisteredListById,
  addParticipant,
  attendParticipants,
  deleteParticipants
};
