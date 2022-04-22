import moment from "moment";

const timeUtils = {
  convertDateTimeToDate: (time) => {
    return moment(time).format('DD/MM/YYYY');
  }
};

export default timeUtils;