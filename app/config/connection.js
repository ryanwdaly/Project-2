// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");
var mysql = require("mysql")
var sequelize;
var connection;
// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
if(process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  sequelize.connect();
  module.exports = sequelize;
} else {
  sequelize = new Sequelize("algorithm_db", "root", "rootroot", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  module.exports = sequelize;
}

// Exports the connection for other files to use
