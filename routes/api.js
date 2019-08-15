const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja.js');

// GET a list of ninjas using geoNear from the database
router.get('/ninjas', function(req, resp, next) {
  Ninja.aggregate(
    [{ $geoNear:{
          near:{
            type: 'Point',
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
          },
          spherical: true,
          maxDistance: 1000000,
          distanceField: "dist.calculated"
        }
      }
    ]).then(function(results){ resp.send(results); });
});

// ADD a new ninja to the database
router.post('/ninjas', function(req, resp, next) {
  Ninja.create(req.body).then(function(ninja) {
    resp.send(ninja);
  }).catch(next);
});

// UPDATE a ninja in the database
router.put('/ninjas/:id', function(req, resp, next) {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Ninja.findOne({ _id: req.params.id }).then(function(ninja) {
      resp.send(ninja);
    });  // new ninja
  });
});

// DELETE a ninja from the database
router.delete('/ninjas/:id', function(req, resp, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then(function(ninja) {
      resp.send(ninja);  // removed ninja
  });
});

module.exports = router;
