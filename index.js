const express = require('express');
const routes = require('./routes/api.js');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Set up express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static("public"));

// Body parser middleware
app.use(bodyParser.json());

// Route handlers middleware
app.use('/api', routes);

// Error handling middleware
app.use(function(error, req, resp, next) {
  // console.log(error);
  resp.status(422).send({ error: error.message});
});

// Listen for requests
app.listen(process.env.port || 4000, printMsg = () => {
  console.log('Now listening for requests.');
})
