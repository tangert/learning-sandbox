'use strict';
//Dependencies
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

//Server
const PORT = process.env.PORT || 3001;
const server = require('http').Server(app);

//Socket from client
var io = require('socket.io')(server, { origins: 'http://localhost:3000'});

//Web socket connection
io.on('connection', function (socket) {
  socket.emit('server-connect', { connectedToServer: 'true' });
  socket.on('client-connect', function (data) {
    console.log('SHOULD RECEIVE A CLIENT EVENT');
    console.log(data);
  });
});

//Root API
app.get('/api', function (req, res) {
  res.status(200).send('API is working.');
  console.log('API IS WORKING!!!');
});

//Generates traffic and populates the client with certain paramters
//Admin hits this endpoint
//Time is optional to be able to update the sentiment/stock
app.post('/api/gen-traffic/:time?/:sentiment/:stock', function (req, res) {
  res.send(req.params);

  if (req.params.time != null) {
      console.log('About to start countdown!');

      //Set appropriate interval with the time (in minutes) param
      //This will set the end release for when the socket receives server data
      //1 :TIME
      // SET THE TIMEOUT
      const timeout = minutesToMs(req.params.time);
      let timerIsRunning = true;

      //After the allotted period of time, timer no longer runs
      setTimeout(() => {
        timerIsRunning = false;
      }, timeout);

      //2 :SENTIMENT
      const pollSentimentData = setInterval(() => {
        if (timerIsRunning) {
          sendSentimentData();
        } else {
          console.log('DONE!');
          clearInterval(pollSentimentData);
        }
      }, 500);

      //3 :STOCK
      const pollStockData = setInterval(() => {
        if (timerIsRunning) {
          sendStockData();
        } else {
          console.log('DONE!');
          clearInterval(pollStockData);
        }
      }, 500);
  }

  //just update the sentiment/stock otherwise
  else {
    console.log('No time provided. Just updating sentiment and stock.');
  }

  //Helper functions
  function sendSentimentData(){
    // SET INTERNAL SENTIMENT RELEASE INTERVAL
    // Query mongo for tweet content whose [SENTIMENT] val is +/- :SENTIMENT
    // Pull random tweet HANDLE, IMAGE, and pair with CONTENT
    // Send as JSON payload to client to render
    console.log('Sending sentiment data');
  }

  function sendStockData(){
    //SET INTERNAL STOCK RELEASE interval
    //Simply send over numerical values for the graph to render in real time by adding points
    console.log('Sending stock data');

  }

  function minutesToMs (min) {
    return min * 60 * 1000;
  }

  function getRandomTime(min,max){
    var time = Math.random()*(max - min) + min;
    console.log(time);
    return time;
  }
});

//Add handles to the DB
app.post('/api/handles', function (req, res) {
  console.log('Adding handle');
});

//Add tweets to the DB
app.post('/api/tweets', function (req, res) {
  console.log('Adding tweet');
});

//Root websocket route
app.get('/', function (req, res) {
  res.status(200).send('Web socket connects here.');
  console.log('WEB SOCKET IS WORKING!!!');
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = 'app';
