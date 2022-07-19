'use strict'
const studentRepo = require('../repositories/student');
const roleOfUserRepo = require('../repositories/role_of_user');
const {Op} = require("sequelize");
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');
const fs = require("fs");
const timeUtils = require("../utils/time");
const {parse} = require("csv-parse");
const bcrypt = require("bcrypt");
const userRepo = require('../repositories/user');
const unionTextbookRepo = require('../repositories/union_textbook');
const csv = require('csvtojson')
const MESSAGE = require("../utils/message");
const activityClassService = require("./activity_class");
const facultyRepo = require("../repositories/faculty");
const roleUtils = require("../utils/role");
const lectureRepo = require("../repositories/lecture");


const get = async (query, userId) => {
  let option = {};
  option.where = {deleted_at: null};
  option.limit = query.size ? +query.size : 10;
  option.offset = query.page ? (query.page - 1) * query.size : 1;
  query.activityClassId = query.activityClassId ? query.activityClassId : '';
  query.className = query.className ? query.className : '';
  const user = await getUserAndRole(userId);
  if (user.roles[0].name === roleUtils.FACULTY_SECRETARY) {
    const lecture = await lectureRepo.getOne({where: {user_id: user.id}});
    const facultyId = lecture.faculty_id;
    option.include = [
      {
        model: models.activityClass,
        where: {name: {[Op.like]: `%${query.className}%`}, faculty_id: facultyId},
        required: true,
      }];
  } else {
    option.include = [
      {
        model: models.activityClass,
        where: {name: {[Op.like]: `%${query.className}%`}, deleted_at: null},
        required: true,
      }];
  }
  if (query) {
    delete query.page;
    delete query.size;
    delete query.className;
    for (let attribute in query) {
      if (query.hasOwnProperty(attribute) && query[attribute]) {
        option.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
      }
    }
  }
  let students = await studentRepo.get(option);
  students = sequelizeUtils.convertJsonToObject(students);
  return students;
};

const getCSVData = (file) => new Promise((resolve, reject) => {
  let data = [];
  fs.createReadStream(`E:/s-union/code/s-union/backend/src/storage/${timeUtils.getCurrentDate()}-${file.originalname}`)
    .pipe(parse({delimiter: ",", from_line: 2}))
    .on("data", (row) => {
      const item = {
        id: row[0],
        name: row[1],
        activityClassId: row[2],
        isUnionMember: row[3],
        isClassSecretary: row[4],
      }
      data.push(item);
    })
    .on('end', () => {
      resolve(data);
    });
});

const createMany = async (file) => {
  let users = []
  let csvData = [];
  let students = [];
  let transaction;
  csvData = await getCSVData(file);
  csvData.forEach(item => {
    const user = {
      name: item.name,
      username: item.id,
      password: bcrypt.hashSync(item.id + '@123', bcrypt.genSaltSync(10)),
      is_active: true,
    };
    users.push(user);
  });
  try {
    transaction = await models.sequelizeConfig.transaction();
    const roleOfUsers = [];
    // Create users
    let newUsers = await userRepo.createMany(users, transaction);
    newUsers = JSON.parse(JSON.stringify(newUsers));
    if (newUsers.length !== users.length) {
      console.log('a');
      await transaction.rollback();
      return false;
    }
    for (let index = 0; index < newUsers.length; ++index) {
      const roleOfUser = {user_id: newUsers[index].id, role_id: csvData[index].isClassSecretary === 'Y' ? 5 : 6};
      const student = {
        id: csvData[index].id,
        name: csvData[index].name,
        activity_class_id: csvData[index].activityClassId,
        is_union_member: csvData[index].isUnionMember === 'Y' ? true : false,
        is_class_secretary: csvData[index].isClassSecretary === 'Y' ? true : false,
        user_id: newUsers[index].id,
      };
      roleOfUsers.push(roleOfUser);
      students.push(student);
    }
    // Create role of user
    const newRoleOfUsers = await roleOfUserRepo.createMany(roleOfUsers, transaction);
    if (newRoleOfUsers.length !== newUsers.length) {
      console.log('b');
      await transaction.rollback();
      return false;
    }
    // Create students
    let newStudents = await studentRepo.createMany(students, transaction);
    if (newStudents.length !== students.length) {
      console.log('c');
      await transaction.rollback();
      return false;
    }
    // Create union fee submission
    newStudents = JSON.parse(JSON.stringify(newStudents));
    const unionTextbooks = newStudents.map(student => ({
      student_id: student.id,
      submitted: false,
    }));
    console.log('newStudentIds - ', unionTextbooks);
    const unionTextbook = await unionTextbookRepo.createMany(unionTextbooks, transaction);
    console.log('unionTextbook - ', unionTextbook);
    if (unionTextbook.length !== unionTextbooks.length) {
      console.log('d');
      await transaction.rollback();
      return false;
    }
    await transaction.commit();
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    return false;
  }
  return true;
};

const getById = async (studentId) => {
  let options = {};
  options.where = {id: studentId};
  options.include = [{ model: models.activityClass }];
  return await studentRepo.getOne(options);
}
const create = async (student) => {
  return await studentRepo.create({
    id: student.id,
    name: student.name,
    gender: student.gender,
    birthday: student.birthday,
    email: student.email,
    phone: student.phone,
    activity_class_id: student.activityClassId,
    is_class_secretary: student.isClassSecretary,
    is_union_member: student.isUnionMember,
  });
};

const update = async (student) => {
  let condition = {
     where: { id: student.id },
  };
  let newStudent = {
    name: student.name,
    gender: student.gender,
    birthday: student.birthday,
    email: student.email,
    phone: student.phone,
    activity_class_id:student.activity_class_id,
  }
  const isUpdated = await studentRepo.update(condition, newStudent);
  return isUpdated[0] ? true : false;
};



const deleteStudent = async (studentId) => {
  let option = {};
  option.where = { id: studentId };
  const result = await studentRepo.del(option);
  return result ? true : false;
};

const getUserAndRole = async (currentUserId) => {
  let option = {};
  option.include = [{ model: models.role, deleted_at: null,}];
  option.where = { id: currentUserId, deleted_at: null };
  let user = await userRepo.getOne(option);
  user = JSON.parse(JSON.stringify(user));
  return user;
}

module.exports = {
  get,
  createMany,
  deleteStudent,
  getById,
  create, update
};