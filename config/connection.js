const Sequelize = require('sequelize');

require('dotenv').config();

/*
By default Sequelize use JSON, hence we need to setup Sequelize for
Heroku's JawsDB, while using environmental variables
*/
const sequelize = process.env.JAWSDB_URL
   ? new Sequelize(process.env.JAWSDB_URL)
   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306
   });

module.exports = sequelize;