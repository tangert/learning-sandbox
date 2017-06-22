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

//MongoDB
mongoose.connect('mongodb://localhost/BaneAndOx/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('CONNECTED TO MONGO LOL');
});

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

//Root websocket route
app.get('/', function (req, res) {
  res.status(200).send('Web socket connects here.');
  console.log('WEB SOCKET IS WORKING!!!');
});

//Root for API
app.get('/api', function (req, res) {
  res.status(200).send('API is working.');
  console.log('API IS WORKING!!!');
});


var requestSent = false;
var prevTimeout;
var pollSentimentData;
var pollStockData;

//Traffic generation
app.use('/api/gen-traffic', function(req, res, next) {

  //Query variables
  const sent = Number(req.query.sentiment);
  const sentFlux = Number(req.query.sentFlux);
  const stock = Number(req.query.stock);
  const stockFlux = Number(req.query.stockFlux);
  const time = Number(req.query.time);

  //Generate traffic
  if (req.method === 'POST') {
    console.log('About to start countdown!');
    res.send(req.query);

    if (requestSent) {
      clearInterval(pollSentimentData);
      clearInterval(pollStockData);
    }

    //Local variables
    var timerIsRunning = true;
    const pollTime = 1000;
    requestSent = true;

    var timeout;
    if (time != null) {
      timeout = minutesToMs(time);
      console.log('GOT A TIMEOUT OF: ' + timeout);
      prevTimeout = timeout;
    } else {
      timeout = prevTimeout;
    }

    //1: TIME
    setTimeout(() => {
      timerIsRunning = false;
      requestSent = false;
    }, timeout);

    //2: SENTIMENT
    //First grab all the data from the DB
    grabSentimentSensitiveData(sent, sentFlux);
    pollSentimentData = setInterval(() => {
      if (timerIsRunning) {
        sendSentimentData(sent);
      } else {
        console.log('DONE!');
        clearInterval(pollSentimentData);
      }
    }, pollTime);

    //3: STOCK
    pollStockData = setInterval(() => {
      if (timerIsRunning) {
        sendStockData(stock, stockFlux);
      } else {
        console.log('DONE!');
        clearInterval(pollStockData);
      }
    }, pollTime*2);
  }

  //Stop all current traffic
  else if (req.method === 'DELETE') {
    console.log('About to stop traffic.');
    res.send('Stopping traffic.');
    clearInterval(pollSentimentData);
    clearInterval(pollStockData);
  }

  /**********************************************************************/
  /**********************************************************************/
  /**********************************************************************/
  //DATA TRANSFER FUNCTIONS
  var tweet_handles = [];
  var tweet_contents = [];
  var images = [];

  function sendSentimentData(sentiment){
    var handle = getRandomElement(tweet_handles);
    var content = getRandomElement(tweet_contents);
    var image = getRandomElement(images);

    var payload = {
      handle: handle["handle"],
      image: image["link"],
      content: content["content"],
      sentiment: content["sentiment"],
      time: Date.now(),
    };

    sendOverSocket('sentiment-data', payload);
  }

  function sendStockData(stock, flux){
    var delta = stock*flux;
    var calculatedStock = getRandomFromRange(stock-delta, stock+delta);
    sendOverSocket('stock-data', calculatedStock);
  }

  function grabSentimentSensitiveData(sentiment, flux) {
    console.log('Sending sentiment data: ' + sentiment);
    var delta = sentiment*flux;

    db.collection('tweet_handles').find({}).toArray().then(function(data){
      tweet_handles = data;
    });

    db.collection('tweet_content').find({
              $and: [
                { sentiment: { $lte: sentiment+delta } },
                { sentiment: { $gte: sentiment-delta } }
                    ]
              }).toArray().then(function(data){
                tweet_contents = data;
    });

    db.collection('images').find({}).toArray().then(function(data){
      images = data;
    });
  }

  function sendOverSocket(socket, payload) {
    req.app.io.emit(socket, {key:payload});
    console.log(payload);
  }

});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

//Some useful helper functions
function getRandomElement(arr) {
  var rand = arr[Math.floor(Math.random()*arr.length)];
  return rand;
}

function minutesToMs(min) {
  return min * 60 * 1000;
}

function getRandomFromRange(min,max){
  var val = Math.floor(Math.random()*(max - min) + min);
  return val;
}

module.exports = 'app';
