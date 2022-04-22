'use strict';
const swaggerOptions = require('../config/swagger.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const groupFunctionRouter = require('./group_function');
const roleRouter = require('./role');
const funcRouter = require('./function');
const facultyRouter = require('./faculty');
const courseRouter = require('./course');
const activityClassRouter = require('./activity_class');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const routes = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use('/group-function', groupFunctionRouter);
  app.use('/role', roleRouter);
  app.use('/function', funcRouter);
  app.use('/faculty', facultyRouter);
  app.use('/course', courseRouter);
  app.use('/activity-class', activityClassRouter);
};

module.exports = routes;