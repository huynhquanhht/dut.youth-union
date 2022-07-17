'use strict';
const {Op} = require('sequelize');
const models = require('../models');
const sequelizeUtils = require('../utils/sequelize');
const roleUtils = require("../utils/role");
const userRepo = require("../repositories/user");
const studentRepo = require("../repositories/student");
const unionFeeRepo = require('../repositories/union_fee');
const submitUnionFeeRepo = require('../repositories/submit_union_fee');
const timeUtils = require("../utils/time");
const unionTextbookRepo = require("../repositories/union_textbook");
const moneyUtils = require("../utils/money");
const lectureRepo = require("../repositories/lecture");

const getUserAndRole = async (currentUserId) => {
  let option = {};
  option.include = [{ model: models.role, deleted_at: null,}];
  option.where = { id: currentUserId, deleted_at: null };
  let user = await userRepo.getOne(option);
  user = JSON.parse(JSON.stringify(user));
  return user;
}

const get = async (currentUserId, query) => {
  let option = {};
  option.where = {deleted_at: null};
  option.limit = query.size ? +query.size : 10;
  option.offset = query.page ? (query.page - 1) * query.size : 1;
  option.include
  if (query) {
    delete query.page;
    delete query.size;
    for (let attribute in query) {
      if (query.hasOwnProperty(attribute) && query[attribute]) {
        option.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
      }
    }
  }
  let unionFee = await unionFeeRepo.get(option);
  unionFee = sequelizeUtils.convertJsonToObject(unionFee);
  return unionFee;
};

const  getOfStudents = async (currentUserId, query) => {
  const user = await getUserAndRole(currentUserId);
  let option = {};
  if (user.roles[0].name === roleUtils.FACULTY_SECRETARY) {
    console.log('a');
    const lecture = await lectureRepo.getOne({where: {user_id: user.id}});
    const facultyId = lecture.faculty_id;
    console.log('facultyId - ', facultyId);
    option.limit = query.size ? +query.size : 10;
    option.offset = query.page ? (query.page - 1) * query.size : 1;
    option.include = [{
      model: models.unionFee,
      // where: {id: 23},
      require: false,
    }, {
      model: models.activityClass,
      where: { faculty_id: facultyId }
      // include: [{
      //   model: models.faculty,
      //   where: {id: facultyId}
      // }]
    }];
    if (query.studentId) {
      console.log('m - ', query.studentId);
      option.where = {id: query.studentId};
    }
    if (query.className) {
      console.log('n - ', query.className);
      option.include[1].where = { id: query.className };
    }
  } else {
    console.log('b');
    option.limit = query.size ? +query.size : 10;
    option.offset = query.page ? (query.page - 1) * query.size : 1;
    option.include = [{
      model: models.unionFee,
      // where: {id: 23},
      require: true,
    }, {
      model: models.activityClass,
    }];
    if (query.studentId) {
      console.log('a');
      option.where = {id: query.studentId};
    }
    if (query.className) {
      console.log('b');
      option.include[1].where = { id: query.className };
    }
  }
  let unionFeeOfStudents = await studentRepo.get(option);
  unionFeeOfStudents = JSON.parse(JSON.stringify(unionFeeOfStudents));
  unionFeeOfStudents.rows.forEach(item => {
    // item.unionFee = item.union_fees[0];
  })
  for (let item of unionFeeOfStudents.rows) {
    item.unionFee = item.union_fees[0];
    if (item.unionFee.submit_union_fee.confirmed_by != null) {
      const user = await getUserAndRole(item.unionFee.submit_union_fee.confirmed_by);
      item.unionFee.submit_union_fee.confirmed_by = user.name;
    }
  }
  return unionFeeOfStudents;
};

const getOfStudent = async (currentUserId, query) => {
  let userRole = await getUserAndRole(currentUserId);
  let student = await studentRepo.getOne({where: {user_id: currentUserId}});
  student = JSON.parse(JSON.stringify(student));
  console.log('student - ', student);
  let option = {};
  let unionFeeOfStudent = [];
  // if (userRole.roles[0].name === roleUtils.CLASS_SECRETARY) {
  //   console.log('a');
  // } else {
    option = {};
    option.where = { id: student.id};
    option.include = [
      {
        model: models.unionFee,
        required: false,
      }];
  // }
  unionFeeOfStudent = await studentRepo.getOne(option);
  unionFeeOfStudent = sequelizeUtils.convertJsonToObject(unionFeeOfStudent);
  return unionFeeOfStudent;
}

const submit = async (unionFees) => {
  let falseUpdation = [];
  let trueUpdation = [];
  unionFees.forEach(unionFee => {
    if (unionFee.submitted) {
      trueUpdation.push(unionFee.id);
    } else {
      falseUpdation.push(unionFee.id);
    }
  });
  const transaction = await models.sequelizeConfig.transaction();
  try {
    if (trueUpdation.length) {
      await submitUnionFeeRepo.update({
        submitted: true,
        submitted_at: timeUtils.getCurrentTime()
      }, trueUpdation, transaction);
    }
    if (falseUpdation.length) {
      await submitUnionFeeRepo.update({
        submitted: false,
        submitted_at: null,
        school_confirmed: null,
        confirmed_by: null,
      }, falseUpdation, transaction);
    }
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    return false;
  }
  return true;
}

const confirmSubmission = async (currentUserId, submitUnionFeeIds) => {
  let option = {};
  let userRole = await getUserAndRole(currentUserId);
  userRole = JSON.parse(JSON.stringify(userRole));
  const transaction = await models.sequelizeConfig.transaction();
  try {
    if (userRole.roles[0].name === roleUtils.CLASS_SECRETARY) {
      await submitUnionFeeRepo.update({
        class_confirmed: timeUtils.getCurrentTime()
      }, submitUnionFeeIds, transaction);
    } else {
      await submitUnionFeeRepo.update({
        submitted: true,
        school_confirmed: timeUtils.getCurrentTime(),
        confirmed_by: currentUserId,
      }, submitUnionFeeIds, transaction);
    }
    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    return false;
  }
};

const create = async (unionFee) => {
  const newUnionFee = {
    school_year: unionFee.schoolYear,
    amount_of_money: unionFee.amountOfMoney,
  };
  let transaction;
  try {
    transaction = await models.sequelizeConfig.transaction();
    const createdUnionFee = await unionFeeRepo.create(newUnionFee, transaction);
    if (createdUnionFee) {
      const option = { attributes: ['id'] };
      let studentIds = await studentRepo.get(option);
      let unionFeeSubmission = [];
      studentIds = JSON.parse(JSON.stringify(studentIds));
      console.log(studentIds);
      studentIds.rows.forEach(student => {
        unionFeeSubmission.push({
          student_id: student.id,
          union_fee_id: createdUnionFee.id,
          submitted: false,
        })
      });
      console.log('unionFeeSubmission - ', unionFeeSubmission);
      const createdUnionFeeSubmission = await submitUnionFeeRepo.createMany(unionFeeSubmission, transaction);
      if (createdUnionFeeSubmission.length === unionFeeSubmission.length) {
        await transaction.commit();
        return true;
      }
      await transaction.rollback();
      return false;
    }
  } catch (error) {
    if(transaction) {
      await transaction.rollback();
    }
    return false;
  }
}

const getInvoice = async (studentId, unionFeeId) => {
  let option = {};
  option.where = { id: unionFeeId };
  const unionFee = await unionFeeRepo.getOne(option);
  option.where = { id: studentId };
  option.include = [{
    model: models.activityClass,
    include: [{ model: models.faculty }],
    required: true,
  }];
  const student = await studentRepo.getOne(option);
  const dateText = timeUtils.formatDateText(new Date(new Date().toUTCString()));
  const moneyTextReader = new moneyUtils.readMoneyText();
  let invoice = {
    studentId: student.id,
    studentName: student.name,
    activityClass: student.activity_class.name,
    faculty: student.activity_class.faculty.name,
    reason: `Đoàn phí (${unionFee.school_year})`,
    submissionDate: dateText,
    moneyText: moneyTextReader.doc(unionFee.amount_of_money),
  }
  return invoice;
};

module.exports = { get, getOfStudent, getOfStudents, submit, confirmSubmission, create, getInvoice };