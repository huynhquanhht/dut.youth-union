'use strict';
const sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const user = require('./user');
const func = require('./function');
const permission = require('./permission');
const role = require('./role');
const roleOfUser = require('./role_of_user');
const groupFunction = require('./group_function');
const universityUnion = require('./university_union');
const faculty = require('./faculty');
const lecture = require('./lecture');
const course = require('./course');
const activityClass = require('./activity_class');
const student = require('./student');
const unionTextbook = require('./union_textbook');
const unionFee = require('./union_fee');
const submitUnionFee = require('./submit_union_fee');
const activity = require('./activity');
const registerJoin = require('./register_join');
const news = require('./news');


const sequelizeConfig = new sequelize(
  databaseConfig.name,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig.hostConfig,
);

let database = {
  sequelize: sequelize,
  sequelizeConfig: sequelizeConfig,
  func: func(sequelizeConfig, sequelize),
  groupFunction: groupFunction(sequelizeConfig, sequelize),
  role: role(sequelizeConfig, sequelize),
  permission: permission(sequelizeConfig, sequelize),
  user: user(sequelizeConfig, sequelize),
  roleOfUser: roleOfUser(sequelizeConfig, sequelize),
  universityUnion: universityUnion(sequelizeConfig, sequelize),
  faculty: faculty(sequelizeConfig, sequelize),
  lecture: lecture(sequelizeConfig, sequelize),
  course: course(sequelizeConfig, sequelize),
  activityClass: activityClass(sequelizeConfig, sequelize),
  student: student(sequelizeConfig, sequelize),
  unionTextbook: unionTextbook(sequelizeConfig, sequelize),
  unionFee: unionFee(sequelizeConfig, sequelize),
  submitUnionFee: submitUnionFee(sequelizeConfig, sequelize),
  activity: activity(sequelizeConfig, sequelize),
  registerJoin: registerJoin(sequelizeConfig, sequelize),
  news: news(sequelizeConfig, sequelize),
};

Object.keys(database).forEach((modelName) => {
  if (database[modelName].associate) {
    database[modelName].associate(database);
  }
});

module.exports = database;
