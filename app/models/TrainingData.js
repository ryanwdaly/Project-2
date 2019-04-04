// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var TrainingData = sequelize.define("training_data", {
  input: Sequelize.STRING,
  output: Sequelize.STRING,
});

// Syncs with DB
TrainingData.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = TrainingData;
