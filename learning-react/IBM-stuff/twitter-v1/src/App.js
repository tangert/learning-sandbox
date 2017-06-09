import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className="Tweet-Section">

          <div className="Tweet-Header">
            <h1 id ="title">Twitter Stream</h1>
            <h5>June 7, 2017</h5>
          </div>

          <div className="Tweets-Container">

            <div className="Tweet">
            </div>
            <div className="Tweet">
            </div>
            <div className="Tweet">
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default App;
