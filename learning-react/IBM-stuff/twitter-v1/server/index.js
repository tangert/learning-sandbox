'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');

const image_dir = './profile-pics';
//Server constants
const PORT = process.env.PORT || 3001;
const server = require('http').Server(app);
const red = {r: 212, g: 75, b: 60};
const blue = {r: 158, g: 222, b: 242};

app.use(bodyParser.json());

//MongoDB
//Change to remote URL
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
    if(data.length < 1) {
      tweet_handles = false;
    } else {
      tweet_handles = data;
    }
  });

  socket.on('client-connect', function (data) {
    console.log('SHOULD RECEIVE A CLIENT EVENT');
    console.log(data);
  });

  /*******************************************************************/
  /**********************TRAFFIC GENERATION***************************/
  /*******************************************************************/

  socket.on('traffic-stop', function(data){
    console.log('About to stop traffic.');
    clearInterval(pollSentimentData);
    clearInterval(pollStockData);
    clearTimeout(timerTimeout);
    clearInterval(pollTimer);
    app.io.emit('time-change', 0);
    app.io.emit('traffic-gen', false );
  });

  //graph quick update
  socket.on('on-quick-update-graph', function(data){
    let color = convertPercentToColor(red, blue, data);
    let newTime = new Date().getTime();
    let payload = {
      stock: data,
      color: color,
      time: newTime
    };
    app.io.emit('quick-update-graph', payload);
  });

  socket.on('traffic-gen', function(data){
    console.log('About to start traffic');
    const sent = data.sentiment;
    const sentFlux = data.sentFlux;
    const sentTimeRelease = data.sentTimeRelease * 1000;

    const stock = data.stock;
    const stockFlux = data.stockFlux;
    const stockTimeRelease = data.stockTimeRelease * 1000;

    if (requestSent) {
      clearInterval(pollSentimentData);
      clearInterval(pollStockData);
      clearTimeout(timerTimeout);
      clearInterval(pollTimer);
    }

      console.log("\n" + 'About to start countdown!');
      app.io.emit('traffic-gen', true );
      app.io.emit('update-graph', stockTimeRelease);
      app.io.emit('send-request', data);

      //Local variables
      const pollTime = 1000;
      let timerIsRunning = true;

      //By default set to 5 hour timeout
      timerTimeout = setTimeout(() => {
        console.log("TIMED OUT");
        timerIsRunning = false;
        requestSent = false;

        clearInterval(pollSentimentData);
        clearInterval(pollStockData);
        clearInterval(pollTimer);

        app.io.emit('traffic-gen', false );
      }, 18000000);

      requestSent = true;

      //TIMER FOR ADMIN SCREEN
      const timer_start = new Date().getTime();

      if (timerIsRunning) {
        pollTimer = setInterval(function(){
          let now = new Date().getTime();
          let difference = now - timer_start;
          app.io.emit('time-change', difference);
          }, 1000);
        }

      //2: SENTIMENT
      //First grab all the data from the DB
      grabSentimentSensitiveData(sent, sentFlux);
      pollSentimentData = setInterval(function(){
        if (timerIsRunning) {
          if(tweet_contents !== false && tweet_handles !== false) {
            sendSentimentData(sent);
          } else {
            clearInterval(pollSentimentData);
          }
        }
      }, sentTimeRelease);

      //3: STOCK
      pollStockData = setInterval(function(){
        if (timerIsRunning) {
          sendStockData(stock, stockFlux);
        }
      }, stockTimeRelease);

    /**********************************************************************/
    /**********************************************************************/
    /**********************************************************************/

    var images = [];

    function sendSentimentData(sentiment){
      let handle = getRandomElement(tweet_handles);
      let content = getRandomElement(tweet_contents);
      let image_id = getRandomElement([0,1,2,3,4,5,6,7]);

      let color = convertPercentToColor(red, blue, Number(content.sentiment));
        let payload = {
          handle: handle.handle,
          image: 9,
          content: content.content,
          sentiment: content.sentiment,
          color: color,
          time: Date.now(),
          id: generateId()
        };

        app.io.emit('sentiment-data', payload);
    }

    function sendStockData(stock, flux){
      let delta = stock*flux;
      let calculatedStock = getRandomFromRange(stock-delta, stock+delta);
      let color = convertPercentToColor(red, blue, calculatedStock);
      let newTime = new Date().getTime();

      let payload = {
        stock: calculatedStock,
        color: color,
        time: newTime
      };

      app.io.emit('stock-data', payload);
    }

    function grabSentimentSensitiveData(sentiment, flux) {
      // console.log('Sending sentiment data: ' + sentiment);
      let delta = sentiment*flux;

      db.collection('tweet_handles').find({}).toArray().then(function(data){
        if(data.length < 1) {
          tweet_handles = false;
        } else {
          tweet_handles = data;
        }
      });

      //FIXME: Doesn't return when sentiment is out of a certain range
      //FIXME: incorporate finding hashtags
      db.collection('tweet_content').find({
          $and: [
          { sentiment: { $lte: sentiment+delta } },
          { sentiment: { $gte: sentiment-delta } }
              ]
                }).toArray().then(function(data){
                  console.log("DATA FROM RESULTS:", data);

                  if(data.length < 1) {
                    console.log("no data: length: ", data.length);
                    tweet_contents = false;
                  } else {
                    console.log("FOUND SOME DATA?", data);
                    tweet_contents = data;
                  }
      });
    }
  });

  /*******************************************************************/
  /**********************PINNED TWEETS***************************/
  /*******************************************************************/
  socket.on('pinned-tweet-create', function(data){
    let sent = Number(data.sentiment);
    let handle = getRandomElement(tweet_handles);

    let payload = {
      id: generateId(),
      handle: handle.handle,
      image: getRandomElement([0,1,2,3,4,5,6,7,8,9]),
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
    app.io.emit('pinned-tweets', { action: 'CLEAR_ALL' });
  });

  //FILTERS
  socket.on('filter-change', function(data){
    app.io.emit('filter', data);
  });


  /*******************************************************************/
  /**********************CLEARING STORE***************************/
  /*******************************************************************/
  socket.on('on-clear-store', function(data){
    app.io.emit('clear-store', { clearingStore: 'true' });
  });

  /*******************************************************************/
  /**********************TIME KEEPING*********************************/
  /*******************************************************************/
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

  setTimeout(function(){
    db.collection('tweet_content').insertMany(new_tweets);
  },2000);
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
