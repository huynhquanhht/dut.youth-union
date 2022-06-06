'use strict';
const newsService = require('../services/news');
const MESSAGE = require('../utils/message.js');

const get = async (req, res) => {
  try {
    const query = req.query;
    const currentUserId = req.userId;
    const newsList = await newsService.get(query, currentUserId);
    res.status(200).send(newsList);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
};

const getById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await newsService.getById(newsId);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const create = async (req, res) => {
  console.log('abc');
  try {
    const news = req.body.news;
    const currentUserId = req.payload.userId;
    if (!news.title ||
      !news.coverUrl ||
      !news.content ||
      !news.universityUnionId ||
      !news.category
    ) {
      res.status(400).send({ message: MESSAGE.CREATE_FAIL });
    }
    console.log('news - ', news);
    const isCreated = await newsService.create(news);
    if (isCreated) {
      res.status(200).send({ message: MESSAGE.CREATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.CREATE_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const update = async (req, res) => {
  try {
    const newsId = req.body.newsId;
    const news = req.body.news;
    if (!news.title ||
      !news.coverUrl ||
      !news.content ||
      !news.universityUnionId ||
      !news.category
    ) {
      res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
    }
    const isUpdated = await newsService.update(newsId, news);
    if (isUpdated) {
      res.status(200).send({ message: MESSAGE.UPDATE_SUCCESS });
      return;
    }
    res.status(400).send({ message: MESSAGE.UPDATE_FAIL });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

const deleteByIds = async (req, res) => {
  try {
    const newsIds = req.body.newsIds;
    if (!Array.isArray(newsIds) || !newsIds.length) {
      res.status(400).send({ message: MESSAGE.INVALID_DATA });
      return;
    }
    const deletionResult = await newsService.deleteByIds(newsIds);
    res.status(200).send({
      message:
        MESSAGE.DELETE_SUCCESS + ` (${deletionResult}/${newsIds.length})`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: MESSAGE.SERVER_ERROR });
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  deleteByIds,
};
