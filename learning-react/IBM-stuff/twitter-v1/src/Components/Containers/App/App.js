import React, { Component } from 'react';
import TweetsSection from './../TweetsSection/TweetsSection';
import GraphSection from './../GraphSection/GraphSection';
import logo from './../../../logo.svg';
import './App.css';

// Routing
import { Router, browserHistory } from 'react-router'


class App extends Component {

  // const io = require('socket.io-client')
  // const socket = io()

  componentDidMount() {
  fetch('/api')
    .then(res => console.log(JSON.stringify(res.json)));

    //
    // socket.on('server event', function (data) {
    //   console.log(data);
    //   socket.emit('client event', { socket: 'io' });
    // });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="Content">
          <TweetsSection/>
          <GraphSection/>
        </div>
      </div>
    );
  }
}

export default App;
