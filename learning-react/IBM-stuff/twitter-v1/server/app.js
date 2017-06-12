const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.get('/api', function (req, res) {
  res.status(200).send('API is working.');
  console.log('API IS WORKING!!!');
});

app.get('/', function (req, res) {
  res.status(200).send('Web socket connects here.');
  console.log('WEB SOCKET IS WORKING!!!');
});

app.use(function(req, res, next) {
  //this allows the React server to access the Express socket
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
