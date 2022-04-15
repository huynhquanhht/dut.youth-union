'use strict';
const databaseConfig = {
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  hostConfig: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: process.env.TIME_ZONE,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
      options: {
        encrypt: false,
        useUTC: false,
        dateFirst: 1,
        enableArithAbort: true,
        trustServerCertificate: true,
        instanceName: 'SQLSERVER',
      },
    },
    logging: console.log,
  },
};

module.exports = databaseConfig;