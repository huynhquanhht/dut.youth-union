'use strict';
const sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const sequelizeConfig = new sequelize(
  databaseConfig.name,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig.hostConfig,
);

module.exports = {
  sequelize: sequelize,
  sequelizeConfig: sequelizeConfig,
};
