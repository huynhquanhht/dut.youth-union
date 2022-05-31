const moment = require('moment');

const convertDateTimeToDate = (time) => {
  if (!time) {
    return '-';
  }
  return moment(time).format('DD/MM/YYYY');
};
const getCurrentTime = () => moment().format('YYYY-MM-DD HH:mm:ss.SSS');
const getCurrentDate = () => moment().format('YYYY-MM-DD');
const formatTime = (time) => moment(time).format('hh:mm DD/MM/YYYY');

const formatTimeText = (time) => {
  console.log('time - ', time);
  let clock = formatClock(time);
  let day = getDay(time);
  let date = getDate(time);
  let month = getMonth(time);
  return `${day}, lúc ${clock} ngày ${date} tháng ${month}`
};
const formatClock = (time) => moment(time, 'hh:mm DD/MM/YYYY').format('hh:mm');
const getDay = (time) => {
  const dayNum = moment(time).day();
  let day;
  switch (dayNum) {
    case 0:
      day = 'Thứ hai';
      break;
    case 1:
      day = 'Thứ ba';
      break;
    case 2:
      day = 'Thứ tư';
      break;
    case 3:
      day = 'Thứ năm';
      break;
    case 4:
      day = 'Thứ sáu';
      break;
    case 5:
      day = 'Thứ bảy';
      break;
    default:
      day = 'Chủ nhật';
      break;
  }
  return day;
};
const getDate = (time) => moment(time, 'hh:mm DD/MM/YYYY').format('D');
const getMonth = (time) => moment(time, 'hh:mm DD/MM/YYYY').format('M');
const getYear = (time) => moment(time, 'hh:mm DD/MM/YYYY').format('Y');

module.exports = {
  convertDateTimeToDate,
  getCurrentTime,
  getCurrentDate,
  formatTime,
  formatClock,
  formatTimeText,
  getDay,
  getDate,
  getMonth,
  getYear,
};