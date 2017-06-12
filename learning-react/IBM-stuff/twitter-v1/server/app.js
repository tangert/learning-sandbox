const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
// app.use(cors());

app.get('/api', function (req, res) {
  res.status(200).send('Workin.');
  console.log('WOOHOO WE WORKIN!!!');
});

app.get('/', function (req, res) {
  res.status(200).send('Web socket connects here.');
  console.log('SOCKETTTT');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(function(req, res) {
    res.status(404).send('Sorry cant find that!');
});

module.exports = app;
