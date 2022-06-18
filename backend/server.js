'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./src/routes');
const database = require('./src/models');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const syncDatabase = async (database) => {
  try {
    await database.sequelizeConfig.sync();
  } catch (error) {
    console.log(error);
  }
}
syncDatabase(database);
routes(app);
app.listen(SERVER_PORT, () => {
  console.log('Server is listening on port 3000');
});