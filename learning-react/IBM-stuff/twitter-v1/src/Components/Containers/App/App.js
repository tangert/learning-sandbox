import React, { Component } from 'react';
import TweetsSection from './../TweetsSection/TweetsSection';
import GraphSection from './../GraphSection/GraphSection';
import io from 'socket.io-client';
import { Router, browserHistory } from 'react-router'
import './App.css';

//Socket that lives on the Express server.
const socket = io("http://localhost:3001");

class App extends Component {
  //place the sentiment and stock data into state and set it on each socket EVENT

  componentDidMount() {
        socket.on('server-connect', function (data) {
          console.log('SHOULD RECEIVE A SERVER EVENT:');
          console.log(data);
          socket.emit('client-connect', { connectedToClient: 'true' });
        });

        socket.on('sentiment-data', function(data){
          console.log('GETTING SENTIMENT: ');
          console.log(data);
        });

        socket.on('stock-data', function(data){
          console.log('GETTING STOCK: ');
          console.log(data);
        });
  }

  render() {
    return (
      <div className="App">
        <div className="Content">
          <TweetsSection/>
          <GraphSection/>
        </div>
      </div>
    );
  }
}

export default App;
