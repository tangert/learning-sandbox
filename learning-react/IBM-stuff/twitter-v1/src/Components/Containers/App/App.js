import React, { Component } from 'react';
import TweetsSection from './../TweetsSection/TweetsSection';
import GraphSection from './../GraphSection/GraphSection';
import logo from './../../../logo.svg';
import './App.css';

class App extends Component {
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
