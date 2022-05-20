'use strict'
const convertJsonToObject = (data) => {
  return JSON.parse(JSON.stringify(data));
};

module.exports = {
  convertJsonToObject,
}