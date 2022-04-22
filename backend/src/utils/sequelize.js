'use strict'
const convertData = (data) => {
  return JSON.parse(JSON.stringify(data));
};

module.exports = {
  convertData,
}