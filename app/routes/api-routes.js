// Dependencies
// =============================================================
var SmartRocketData= require("../models/SmartRocketData");

// Routes
// =============================================================
module.exports = function(app) {

  app.post("/api/smart-rocket-data", function(req, res) {
    console.log("Smart Rocket Data:");
    console.log(req.body);
    SmartRocketData.create({
      population: req.body.population,
      mutation_rate: req.body.mutation_rate,
      frames: req.body.frames,
      first_success_generation: req.body.first_success_generation
    }).then(function(results) {
      res.json(results);
    });
  });

  app.get("/api/smart-rocket-data/all", function(req, res) {
    SmartRocketData.findAll({}).then(function(results) {
      res.json(results);
    });
  });
};
