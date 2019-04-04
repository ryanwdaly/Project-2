// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var TrainingData = require("../models/TrainingData.js");
var mnist = require("mnist");
var trainingSet = mnist.training;
var testSet = mnist.test;

// Routes
// =============================================================
module.exports = function(app) {

// -post to api/mnist/training
// api/mnist/test
// api/minst/input

  // Get all books
  app.get("/api/training", function(req, res) {
    TrainingData.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // // Get a specific TrainingSession
  // app.get("/api/:TrainingSession", function(req, res) {
  //   TrainingSession.findAll({
  //     where: {
  //       title: req.params.training_session
  //     }
  //   }).then(function(results) {
  //     res.json(results);
  //   });
  // });

  // // Get all books of a specific genre
  // app.get("/api/genre/:genre", function(req, res) {
  //   TrainingSession.findAll({
  //     where: {
  //       genre: req.params.genre
  //     }
  //   }).then(function(results) {
  //     res.json(results);
  //   });
  // });

  // // Get all books from a specific author
  // app.get("/api/author/:author", function(req, res) {
  //   TrainingSession.findAll({
  //     where: {
  //       author: req.params.author
  //     }
  //   }).then(function(results) {
  //     res.json(results);
  //   });
  // });

  // // Get all "long" books (TrainingSessions 150 pages or more)
  // app.get("/api/TrainingSessions/long", function(req, res) {
  //   TrainingSession.findAll({
  //     where: {
  //       pages: {
  //         $gte: 150
  //       }
  //     },
  //     order: [["pages", "DESC"]]
  //   }).then(function(results) {
  //     res.json(results);
  //   });
  // });

  // // Get all "short" books (books 150 pages or less)
  // app.get("/api/books/short", function(req, res) {
  //   TrainingSession.findAll({
  //     where: {
  //       pages: {
  //         $lte: 150
  //       }
  //     },
  //     order: [["pages", "ASC"]]
  //   }).then(function(results) {
  //     res.json(results);
  //   });
  // });

  // // Add a book
  app.post("/api/mnist/training", function(req, res) {
    console.log("Training Data:");
    console.log(req.body);
    TrainingData.create({
      input: req.params.training,
      target: req.params.test,
    }).then(function(results) {
      res.json(results);
    });
  });

  // // Delete a book
  // app.delete("/api/book/:id", function(req, res) {
  //   console.log("Book ID:");
  //   console.log(req.params.id);
  //   Book.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function() {
  //     res.end();
  //   });
  // });
};
