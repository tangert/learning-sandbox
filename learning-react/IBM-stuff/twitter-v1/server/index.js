'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const csv = require('fast-csv');
const fs = require('fs');
const blobUtil = require('blob-util');
const FileReader = require('filereader');
const request = require('superagent');

//Server
const PORT = process.env.PORT || 3001;
const server = require('http').Server(app);
const red = {r: 212, g: 75, b: 60};
const blue = {r: 158, g: 222, b: 242};

app.use(bodyParser.json());

//MongoDB
mongoose.connect('mongodb://localhost/BaneAndOx/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('CONNECTED TO MONGO LOL');
});

//Socket from client
var io = require('socket.io')(server, { origins: 'http://localhost:3000'});

//Global variables for traffic generation
var requestSent = false;
var pollSentimentData;
var pollStockData;
var pollTimer;
var timerTimeout;
var tweet_handles = [];
var tweet_contents = [];

//Attach socket to app for use within routes
app.io = io;
io.on('connection', function (socket) {
  socket.emit('server-connect', { connectedToServer: 'true' });

  db.collection('tweet_handles').find({}).toArray().then(function(data){
    tweet_handles = data;
  });

  socket.on('client-connect', function (data) {
    console.log('SHOULD RECEIVE A CLIENT EVENT');
    console.log(data);
  });

  /******PINNED TWEETS *******/
  socket.on('pinned-tweet-create', function(data){
    console.log(tweet_handles);
    let sent = Number(data.sentiment);
    let handle = getRandomElement(tweet_handles);

    let payload = {
      id: generateId(),
      handle: handle.handle,
      image: getRandomElement([0,1,2,3,4,5,6,7,8]),
      content: data.content,
      sentiment: sent,
      color: convertPercentToColor(red, blue, sent),
      time: Date.now()
    };

    let to_create = { action: 'CREATE', payload: payload };
    app.io.emit('pinned-tweets', to_create);
  });

  socket.on('pinned-tweet-delete', function(data){
    let to_delete = { action: 'DELETE', payload: data}
    app.io.emit('pinned-tweets', to_delete);
  });

  socket.on('pinned-tweets-clear', function(data){
    let to_clear = { action: 'CLEAR_ALL' }
    app.io.emit('pinned-tweets', to_clear);
  });

  //FILTERS
  socket.on('filter-change', function(data){
    app.io.emit('filter', data);
  });


  /******CLEARING STORE*******/
  socket.on('on-clear-store', function(data){
    app.io.emit('clear-store', { clearingStore: 'true' });
  });

  /******TIME CHANGE********/
  socket.on('on-time-change', function(data){
    console.log("SERVER SIDE TIME CHANGE: ", data);
    app.io.emit('time-change', data);
  });
});

//Root websocket route
app.get('/', function (req, res) {
  res.status(200).send('Web socket connects here.');
});

//Root for API
app.get('/api', function (req, res) {
  res.status(200).send('API is working.');
});

//clear store
app.delete('/api/clear-store', function(req, res)  {
  console.log("ABOUT TO CLEAR STORE");
  req.app.io.emit('clear-store', { clearingStore: 'true' });
});

/*******************************************************************/
/***********************TWEET DB ROUTES*****************************/
/*******************************************************************/
app.post('/api/upload-tweets', function(req,res){

  let request = req.body;
  let new_tweets = [];

  for (var i = 1; i < request.length; i++) {
    let post = {
      "content": request[i][0],
      "sentiment": request[i][1]
    };
    new_tweets.push(post);
  }

  console.log(new_tweets);
  db.collection('tweet_content').deleteMany({});
  db.collection('tweet_content').insertMany(new_tweets);
});


/*******************************************************************/
/**********************TRAFFIC GENERATION***************************/
/*******************************************************************/
app.use('/api/gen-traffic', function(req, res, next) {

  //Query variables
  const sent = Number(req.body.sentiment);
  const sentFlux = Number(req.body.sentFlux);
  const sentTimeRelease = Number(req.body.sentTimeRelease) * 1000 * 60;

  const stock = Number(req.body.stock);
  const stockFlux = Number(req.body.stockFlux);
  const stockTimeRelease = Number(req.body.stockTimeRelease) * 1000 * 60;

  const time = Number(req.body.time);

  console.log("REQUEST BODY: ");
  console.log(req.body);

  if (requestSent) {
    clearInterval(pollSentimentData);
    clearInterval(pollStockData);
    clearTimeout(timerTimeout);
    clearInterval(pollTimer);
  }

  //Generate traffic
    if (req.method === 'POST') {
      console.log("\n" + 'About to start countdown!');
      req.app.io.emit('traffic-gen', true );
      req.app.io.emit('send-request', req.body);
      res.send(req.body);

      //Local variables
      var timerIsRunning = true;
      const pollTime = 1000;

      //third placeholder variable for timeout comparisons
      const incomingTimeout = minutesToMs(time);
      timerTimeout = setTimeout(() => {
        console.log("TIMED OUT");
        timerIsRunning = false;
        requestSent = false;

        clearInterval(pollSentimentData);
        clearInterval(pollStockData);
        clearInterval(pollTimer);

        req.app.io.emit('traffic-gen', false );
      }, incomingTimeout);

      requestSent = true;

      //TIMER FOR ADMIN SCREEN
      const timer_start = new Date().getTime();
      var end = minutesToMs(time)
      var now = new Date().getTime();
      var endTime = now + end;

      if(time > 0) {
        if (timerIsRunning) {
          pollTimer = setInterval(function(){
            let now = new Date().getTime();
            let difference = endTime - now;
            req.app.io.emit('time-change', difference);
            }, 1000);
          }
      }

      //2: SENTIMENT
      //First grab all the data from the DB
      grabSentimentSensitiveData(sent, sentFlux);
      pollSentimentData = setInterval(function(){
        if (timerIsRunning) {
          sendSentimentData(sent);
        }
      }, sentTimeRelease);

      //3: STOCK
      pollStockData = setInterval(function(){
        if (timerIsRunning) {
          sendStockData(stock, stockFlux);
        }
      }, stockTimeRelease);
    }

  //Stop all current traffic
  else if (req.method === 'DELETE') {
    console.log('About to stop traffic.');
    res.send('Stopping traffic.');
    clearInterval(pollSentimentData);
    clearInterval(pollStockData);
    clearTimeout(timerTimeout);
    clearInterval(pollTimer);
    req.app.io.emit('time-change', 0);
    req.app.io.emit('traffic-gen', false );
  }

  /**********************************************************************/
  /**********************************************************************/
  /**********************************************************************/

  var images = [];

  function sendSentimentData(sentiment){
    var handle = getRandomElement(tweet_handles);
    var content = getRandomElement(tweet_contents);
    var image_id = getRandomElement([0,1,2,3,4,5,6,7]);
    var color = convertPercentToColor(red, blue, Number(content.sentiment));

    var payload = {
      handle: handle.handle,
      image: image_id,
      content: content.content,
      sentiment: content.sentiment,
      color: color,
      time: Date.now(),
      id: generateId()
    };

    sendOverSocket('sentiment-data', payload);
  }

  function sendStockData(stock, flux){
    var delta = stock*flux;
    var calculatedStock = getRandomFromRange(stock-delta, stock+delta);
    var color = convertPercentToColor(red, blue, calculatedStock);
    var newTime = new Date().getTime();

    var payload = {
      stock: calculatedStock,
      color: color,
      time: newTime
    };

    sendOverSocket('stock-data', payload);
  }

  function grabSentimentSensitiveData(sentiment, flux) {
    // console.log('Sending sentiment data: ' + sentiment);
    var delta = sentiment*flux;

    db.collection('tweet_handles').find({}).toArray().then(function(data){
      tweet_handles = data;
    });

    //FIXME: Doesn't return when sentiment is out of a certain range
    //FIXME: incorporate finding hashtags
    db.collection('tweet_content').find({
        $and: [
        { sentiment: { $lte: sentiment+delta } },
        { sentiment: { $gte: sentiment-delta } }
            ]
              }).toArray().then(function(data){
                console.log("FOUND SENTIMENT DATA: ", data);
                tweet_contents = data;
    });

    db.collection('images').find({}).toArray().then(function(data){
      images = data;
    });
  }

  function sendOverSocket(socket, payload) {
    req.app.io.emit(socket, payload);
  }

});

//Some useful helper functions
function generateId(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

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

function convertPercentToColor(color1, color2, percent) {
  var newColor = {};

  function makeChannel(a, b) {
      return(a + Math.round((b-a)*(percent/100)));
  }

  function makeColorPiece(num) {
      num = Math.min(num, 255);   // not more than 255
      num = Math.max(num, 0);     // not less than 0
      var str = num.toString(16);
      if (str.length < 2) {
          str = "0" + str;
      }
      return(str);
  }

  newColor.r = makeChannel(color1.r, color2.r);
  newColor.g = makeChannel(color1.g, color2.g);
  newColor.b = makeChannel(color1.b, color2.b);
  newColor.cssColor = "#" +
                      makeColorPiece(newColor.r) +
                      makeColorPiece(newColor.g) +
                      makeColorPiece(newColor.b);
  return(newColor);
}

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = 'app';
