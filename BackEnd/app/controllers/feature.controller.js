const db = require("../models");
const Feature = db.features;

// Create and Save a new feature
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a feature
    const feature = new Feature({

      name: req.body.name,
      description: req.body.description,
      done: req.body.done ? req.body.done : false
    });
  
    // Save feature in the database
    feature
      .save(feature)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the feature."
        });
      });
  };

// Retrieve all features from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Feature.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving features."
        });
      });
  };

// Find a single feature with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Feature.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Feature with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Feature with id=" + id });
      });
  };

// Update a Feature by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Feature.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Feature with id=${id}. Maybe Feature was not found!`
          });
        } else res.send({ message: "Feature was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Feature with id=" + id
        });
      });
  };

// Delete a Feature with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Feature.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Feature with id=${id}. Maybe Feature was not found!`
          });
        } else {
          res.send({
            message: "Feature was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Feature with id=" + id
        });
      });
  };

// Delete all Features from the database.
exports.deleteAll = (req, res) => {
    Feature.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Features were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Features."
        });
      });
  };

// Find all done Features
exports.findAllDone = (req, res) => {
    Feature.find({ done: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Features."
        });
      });
  };