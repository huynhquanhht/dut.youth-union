'use strict';
const newsRepo = require('../repositories/news');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelizeUtils = require('../utils/sequelize');
const timeUtils = require('../utils/time');

const get = async (query) => {
  let options = {};
  // options.limit = query.size ? +query.size : 10;
  // options.offset = query.page ? (query.page - 1) * query.size : 1;
  delete query.page;
  delete query.size;
  for (let attribute in query) {
    if (query.hasOwnProperty(attribute) && query[attribute]) {
      options.where[attribute] = {[Op.like]: `%${query[attribute]}%`};
    }
  }
  let newsList = await newsRepo.getAllAndCount(options);
  newsList = sequelizeUtils.convertJsonToObject(newsList);
  newsList.rows.forEach((item) => {
    item.created_at = timeUtils.formatTime(item.created_at);
  });
  return newsList;
};

const getById = async (newsId) => {
  let options = {};
  options.where = { id: newsId };
  return await newsRepo.getById(options);
}

const create = async (news) => {
  const data = {
    title: news.title,
    cover_url: news.coverUrl,
    content: news.content,
    university_union_id: news.universityUnionId,
    category: news.category,
  };
  return await newsRepo.create(data);
};

const update = async (newsId, news) => {
  let condition = {};
  condition.where = { id: newsId };
  const data = {
    title: news.title,
    cover_url: news.coverUrl,
    content: news.content,
    university_union_id: news.universityUnionId,
    category: news.category,
  };
  return await newsRepo.updateById(data, condition);
};

const deleteByIds = async (newsIds) => {
  const options = { where: { id: newsIds } };
  const deletionResult = await newsRepo.deleteByIds(options);
  return deletionResult;
};

module.exports = {
  get,
  getById,
  create,
  update,
  deleteByIds,
};
