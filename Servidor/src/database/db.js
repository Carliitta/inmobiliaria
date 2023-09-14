const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER_NAME, DB_PASSWORD, DB_NAME, DB_HOST , DATABASE_URL} = process.env;

/* const sequelize = new Sequelize(
  `postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
); */


const sequelize = new Sequelize(
  DATABASE_URL,
  {
    host:DB_HOST,
    logging: false,
    native: false,
  }
);

module.exports = sequelize;
