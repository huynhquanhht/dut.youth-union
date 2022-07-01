const models = require("../models");
const userRepo = require("../repositories/user");

const getUserAndRole = async (currentUserId) => {
  let option = {};
  option.include = [{ model: models.role, deleted_at: null,}];
  option.where = { id: currentUserId, deleted_at: null };
  let user = await userRepo.getOne(option);
  user = JSON.parse(JSON.stringify(user));
  return user;
}

module.exports = { getUserAndRole };
