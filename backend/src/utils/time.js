const moment = require('moment');

const timeUtils = {
  convertDateTimeToDate: (time) => {
    if (!time) {
      return '-';
    }
    return moment(time).format('DD/MM/YYYY');
  },
  getCurrentTime: () => {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  },
  getCurrentDate: () => {
    return moment().format('YYYY-MM-DD');
  }
};

module.exports = timeUtils;