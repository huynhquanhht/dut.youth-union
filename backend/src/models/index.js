'use strict';
const sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const user = require('./user');
const func = require('./function');
const permission = require('./permission');
const role = require('./role');
const roleOfUser = require('./role_of_user');
const group_function = require('./group_function');
const faculty = require('./faculty');
const lecture = require('./lecture');
const course = require('./course');
const activityClass = require('./activity_class');
const student = require('./student');

const sequelizeConfig = new sequelize(
  databaseConfig.name,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig.hostConfig,
);

module.exports = {
  sequelize: sequelize,
  sequelizeConfig: sequelizeConfig,
  func: func(sequelizeConfig, sequelize),
  group_function: group_function(sequelizeConfig, sequelize),
  role: role(sequelizeConfig, sequelize),
  permission: permission(sequelizeConfig, sequelize),
  user: user(sequelizeConfig, sequelize),
  roleOfUser: roleOfUser(sequelizeConfig, sequelize),
  faculty: faculty(sequelizeConfig, sequelize),
  lecture: lecture(sequelizeConfig, sequelize),
  course: course(sequelizeConfig, sequelize),
  activityClass: activityClass(sequelizeConfig, sequelize),
  student: student(sequelizeConfig, sequelize),
};
