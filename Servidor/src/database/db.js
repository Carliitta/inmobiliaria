const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

module.exports = sequelize;
