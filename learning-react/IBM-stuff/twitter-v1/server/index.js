'use strict';
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

//Attach socket to app for use within routes
app.io = io;
io.on('connection', function (socket) {
  socket.emit('server-connect', { connectedToServer: 'true' });
  socket.on('client-connect', function (data) {
    console.log('SHOULD RECEIVE A CLIENT EVENT');
    console.log(data);
  });
});

//Root for API
app.get('/api', function (req, res) {
  res.status(200).send('API is working.');
  console.log('API IS WORKING!!!');
});

//Generates traffic and populates the client with certain paramters
//Time is optional to be able to update the sentiment/stock
//this keeps track of overlapping API requests
var requestSent = false;
app.post('/api/gen-traffic/:time?/:sentiment/:stock', function (req, res) {
  res.send(req.params);

  const pollTime = 1000;

  //If there is a time parameter and no request has already been sent
  if (req.params.time != null && !requestSent) {
      console.log('About to start countdown!');
      //Store a local variable that branches based on whether a request has come in or not
      requestSent = true;

      //Set appropriate interval with the time (in minutes) param
      //This will set the end release for when the socket receives server data
      //1 :TIME
      // SET THE TIMEOUT
      const timeout = minutesToMs(req.params.time);
      let timerIsRunning = true;

      //After the allotted period of time, timer no longer runs
      setTimeout(() => {
        timerIsRunning = false;
        requestSent = false;
      }, timeout);

      //2 :SENTIMENT
      const pollSentimentData = setInterval(() => {
        if (timerIsRunning) {
          sendSentimentData(Number(req.params.sentiment), 0.5);
        } else {
          console.log('DONE!');
          clearInterval(pollSentimentData);
        }
      }, pollTime);

      //3 :STOCK
      const pollStockData = setInterval(() => {
        if (timerIsRunning) {
          sendStockData(Number(req.params.stock));
        } else {
          console.log('DONE!');
          clearInterval(pollStockData);
        }
      }, pollTime);

  } else if (requestSent) {
    console.log('API request already in progress. Please wait.\n');
  } else {
    //Just update the sentiment/stock otherwise
    console.log('No time provided. Just updating sentiment and stock.\n');
  }

  //Helper functions
  function sendSentimentData(sentiment, percent){
    // SET INTERNAL SENTIMENT RELEASE INTERVAL
    // Query mongo for tweet content whose [SENTIMENT] val is +/- :SENTIMENT
    // Pull random tweet HANDLE, IMAGE, and pair with CONTENT
    console.log('Sending sentiment data: ' + sentiment);
    var delta = sentiment*percent;
    var calculatedSentiment = getRandomFromRange(sentiment-delta, sentiment+delta);
    console.log('Value: ' + calculatedSentiment + "\n");
    
    // Send new tweet as JSON payload (handle, image, content, time) to client to render
    var payload = {
      handle: "woopdy woop",
      image: "image1",
      content: "Bane and Ox fucking rules",
      time: Date.now(),
      sentiment: calculatedSentiment
    };

    req.app.io.emit('sentiment-data', {key:payload});
  }

  function sendStockData(stock){
    //SET INTERNAL STOCK RELEASE interval
    //Simply send over numerical values for the graph to render in real time by adding points
    console.log('Sending stock data: ' + stock + "\n");
    req.app.io.emit('stock-data', {key:stock});
  }

  function minutesToMs (min) {
    return min * 60 * 1000;
  }

  function getRandomFromRange(min,max){
    console.log('Min: ' + min + " :: Max: " + max);
    var time = Math.floor(Math.random()*(max - min) + min);
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
