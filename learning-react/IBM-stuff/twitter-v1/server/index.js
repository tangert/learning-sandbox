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

  //Generate traffic
  if (req.method === 'POST') {
    console.log('About to start countdown!');
    res.send(req.query);

    if (requestSent) {
      clearInterval(pollSentimentData);
      clearInterval(pollStockData);
    }

    var timerIsRunning = true;
    const pollTime = 1000;
    requestSent = true;

    var timeout;
    if (req.query.time != null) {
      timeout = minutesToMs(Number(req.query.time));
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
    pollSentimentData = setInterval(() => {
      if (timerIsRunning) {
        sendSentimentData(Number(req.query.sentiment), 0.25);
      } else {
        console.log('DONE!');
        clearInterval(pollSentimentData);
      }
    }, pollTime);

    //3: STOCK
    pollStockData = setInterval(() => {
      if (timerIsRunning) {
        sendStockData(Number(req.query.stock), 0.25);
      } else {
        console.log('DONE!');
        clearInterval(pollStockData);
      }
    }, pollTime);
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

  //Data transfer functions
  function sendSentimentData(sentiment, percent){
    // SET INTERNAL SENTIMENT RELEASE INTERVAL
    // Query mongo for tweet content whose [SENTIMENT] val is +/- :SENTIMENT
    // Pull random tweet HANDLE, IMAGE, and pair with CONTENT
    console.log('Sending sentiment data: ' + sentiment);
    var delta = sentiment*percent;
    var calculatedSentiment = getRandomFromRange(sentiment-delta, sentiment+delta);
    console.log('Value: ' + calculatedSentiment + "\n");

    var handle;
    var content;
    var image;
    var payload;

    //FIXME: the sentiment bug.

    db.collection('TweetHandle').aggregate([{$sample: {size: 1}}],
        function (err, res) {
            if (err) return handleError(err);
            handle = res;

      db.collection('TweetContent').aggregate([{$sample: {size: 1}}],
          function (err, res) {
              if (err) return handleError(err);
              content = res;

          db.collection('Image').aggregate([{$sample: {size: 1}}],
              function (err, res) {
                  if (err) return handleError(err);
                  image = res;

                  // Send new tweet as JSON payload (handle, image, content, time) to client to render
                  payload = {
                    handle: handle,
                    image: image,
                    content: content,
                    time: Date.now(),
                    sentiment: calculatedSentiment
                  };

                  sendOverSocket('sentiment-data', payload);
        });
      });
    });
  }

  function sendStockData(stock, percent){
    //SET INTERNAL STOCK RELEASE interval
    //Send over numerical values for the graph to
    //render in real time by adding points
    console.log('Sending stock data: ' + stock + "\n");
    var delta = stock*percent;
    var calculatedStock = getRandomFromRange(stock-delta, stock+delta);
    sendOverSocket('stock-data', calculatedStock);
  }

  //Helper functions
  function minutesToMs (min) {
    return min * 60 * 1000;
  }

  function getRandomFromRange(min,max){
    console.log('Min: ' + min + " :: Max: " + max);
    var time = Math.floor(Math.random()*(max - min) + min);
    return time;
  }

  function sendOverSocket(socket, payload) {
    req.app.io.emit(socket, {key:payload});
    console.log(payload);
  }

});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = 'app';
