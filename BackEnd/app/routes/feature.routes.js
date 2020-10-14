module.exports = app => {
    const features = require("../controllers/feature.controller.js");
  
    var router = require("express").Router();
  
    // Create a new feature
    router.post("/", features.create);
  
    // Retrieve all features
    router.get("/", features.findAll);
  
    // Retrieve all done features
    router.get("/done", features.findAllDone);
  
    // Retrieve a single feature with id
    router.get("/:id", features.findOne);
  
    // Update a feature with id
    router.put("/:id", features.update);
  
    // Delete a feature with id
    router.delete("/:id", features.delete);
  
    // Create a new feature
    router.delete("/", features.deleteAll);
  
    app.use('/api/features', router);
  };