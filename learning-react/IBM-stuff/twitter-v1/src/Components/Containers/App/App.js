import React, { Component } from 'react';
import TweetsSection from './../TweetsSection/TweetsSection';
import GraphSection from './../GraphSection/GraphSection';
import logo from './../../../logo.svg';
import io from 'socket.io-client';
import { Router, browserHistory } from 'react-router'
import './App.css';

//Socket that lives on the Express server.
const socket = io("http://localhost:3001");

class App extends Component {
  componentDidMount() {
      fetch('/api')
        .then(res => console.log(JSON.stringify(res.json)));

        socket.on('server-connect', function (data) {
          console.log('SHOULD RECEIVE A SERVER EVENT:');
          console.log(data);
          socket.emit('client-connect', { connectedToClient: 'true' });
        });
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
