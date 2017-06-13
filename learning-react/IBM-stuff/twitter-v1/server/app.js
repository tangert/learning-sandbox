const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

//Root API
app.get('/api', function (req, res) {
  res.status(200).send('API is working.');
  console.log('API IS WORKING!!!');
});

//Generates traffic and populates the client with certain paramters
app.get('/api/gen-traffic/:time', function (req, res) {
  console.log('Generating traffic');
});

//Add handles to the DB
app.get('/api/handles', function (req, res) {
  console.log('Adding handle');
});

//Add tweets to the DB
app.get('/api/tweets', function (req, res) {
  console.log('Adding tweet');
});

//Root websocket route
app.get('/', function (req, res) {
  res.status(200).send('Web socket connects here.');
  console.log('WEB SOCKET IS WORKING!!!');
});

//This allows the React server to access the Express socket
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//Redirect for unknown routes
app.use(function(req, res) {
    res.status(404).send('This page dont exsit bro.');
});

module.exports = app;
