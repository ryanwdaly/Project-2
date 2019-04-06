// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
var SmartRocketData = sequelize.define("smart_rocket_data", {
  population: Sequelize.INTEGER,
  mutation_rate: Sequelize.INTEGER,
  frames: Sequelize.INTEGER,
  first_success_generation: Sequelize.INTEGER
});

// Syncs with DB
SmartRocketData.sync();

// Makes the Book Model available for other files (will also create a table)
module.exports = SmartRocketData;
