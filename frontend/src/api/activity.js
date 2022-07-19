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
  return axiosUtils.getRequest(url, 'AC-01');
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
  return axiosUtils.getRequest(url, 'AC-07');
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

const create = (activity) => {
  return axiosUtils.postRequest(`${BASE_URL}`, { newActivity: activity }, 'AC-03');
};

const update = (id, activity) => {
  console.log('mnk');
  return axiosUtils.putRequest(`${BASE_URL}`, {activityId: id, newActivity: activity}, 'AC-04');
};

const deleteActivities = (activityIds) => {
  return axiosUtils.deleteRequest(`${BASE_URL}`, {activityIds}, 'AC-05');
};

const getPointListOfCurrentStudent = (schoolYear) => {
  let url = `${BASE_URL}/student/point-list?schoolYear=${schoolYear}`;
  return axiosUtils.getRequest(url, 'AC-06');
};

const register = (activityId) => {
  return axiosUtils.postRequest(`${BASE_URL}/register/${activityId}`, 'AC-08');
}

const attend = (activityId) => {
  let url = `${BASE_URL}/attend/${activityId}`;
  return axiosUtils.putRequest(url);
}

const addParticipant = (participantInfo) => {
  return axiosUtils.postRequest(`${BASE_URL}/add-participant`, participantInfo, 'AC-10');
};

const attendParticipants = (registrationIds) => {
  console.log('abc');
  return axiosUtils.putRequest(`${BASE_URL}/attend-participants`, {registrationIds}, 'AC-11');
};

const deleteParticipants = (registrationIds) => {
  return axiosUtils.deleteRequest(`${BASE_URL}/delete-participants`, {registrationIds}, 'AC-12');
}


const getById = (id) => {
  return axiosUtils.getRequest(`${BASE_URL}/${id}`, 'AC-02');
};


const openActivityRegistration = (activityId) => {
  return axiosUtils.putRequest(`${BASE_URL}/open-registration/${activityId}`);
};

const closeActivityRegistration = (activityId) => {
  return axiosUtils.putRequest(`${BASE_URL}/close-registration/${activityId}`);
};




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
