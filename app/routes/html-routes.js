// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {
  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });
  app.get("/mnist-nn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/mnistNN/mnist_nn.html"));
  });

  app.get("/smart-rockets", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/smartRockets/smart_rockets.html"));
  });
  app.get("/show-data", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/show_data/show_data.html"));
  });
  app.get("/show-data", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/a_star_is_born/a_star.html"));
  });
  app.get("/show-data", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/maze_generator/maze_gem.html"));
  });

};
