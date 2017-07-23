'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

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

//Attach socket to app for use within routes
app.io = io;
io.on('connection', function (socket) {
  socket.emit('server-connect', { connectedToServer: 'true' });
  socket.on('client-connect', function (data) {
    console.log('SHOULD RECEIVE A CLIENT EVENT');
    console.log(data);
  });
});

//Global variables for traffic generation
var requestSent = false;
var pollSentimentData;
var pollStockData;
var timerTimeout;

//Root websocket route
app.get('/', function (req, res) {
  res.status(200).send('Web socket connects here.');
});

//Root for API
app.get('/api', function (req, res) {
  res.status(200).send('API is working.');
});

/*******************************************************************/
/***********************TWEET DB ROUTES*****************************/
/*******************************************************************/
//Get all tweets
app.get('/api/tweets',function(req,res){

});

//Gets a specific tweet
app.get('/api/tweets/:id',function(req,res){

});

//Edit a specific tweet
app.put('api/tweets/edit/:id', function(req,res){

});

//Create a tweet
app.post('/api/tweets/create', function(req,res) {
  //parse through the request body and place each individual part into each
});

//Delete a tweet
app.delete('api/tweets/delete/:id', function(req,res){

});

/*******************************************************************/
/***********************PRESET DB ROUTES*****************************/
/*******************************************************************/
app.get('/api/presets', function(req,res){
  //return all the presets from the db as an array
});

app.post('/api/presets/create', function(req,res){
  const newPreset =req.body;
  //get new preset in terms of a json object
  //create a new mongoose model
  //update the db
  //send a socket event to the store with the same object
});

app.put('/api/presets/edit/:id', function(req,res){
  //grab the appropriate preset from DB according to the id
  //reassign the mdoel to the new req body
  //save the model!
});

app.delete('/api/presets/delete/:id', function(req,res){
  //grab the appropriate preset from DB according to the id
  //delete it
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

        req.app.io.emit('traffic-gen', false );
      }, incomingTimeout);

      requestSent = true;

      //2: SENTIMENT
      //First grab all the data from the DB
      grabSentimentSensitiveData(sent, sentFlux);

      //RANDOMIZE
      // pollSentimentData = () => {
      //   var rand = Math.round(Math.random()*(3000-500)) + 500;
      //   setTimeout(function(){
      //       if (timerIsRunning) { sendSentimentData(sent); }
      //       pollSentimentData();
      //   }, rand);
      // }

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
    req.app.io.emit('traffic-gen', false );
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
    var color = convertPercentToColor(red, blue, Number(content.sentiment));

    var payload = {
      handle: handle.handle,
      image: image.link,
      content: content.content,
      sentiment: content.sentiment,
      color: color,
      time: Date.now()
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
