import moment from "moment";

const timeUtils = {
  convertDateTimeToDate: (time) => {
    if (!time) {
      return '-';
    }
    return moment(time).format('DD/MM/YYYY');
  }
};

export default timeUtils;