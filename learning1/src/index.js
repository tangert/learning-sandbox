import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var PLAYERS = [
  {
    name: "Tyler Angert",
    score: 31,
    id: 1
  },
  {
    name: "Ross Angert",
    score: 55,
    id: 2
  },
  {
    name: "Lucas Angert",
    score: 77,
    id: 3
  },
]


ReactDOM.render(<App title = "My Scoreboard" initialPlayers = {PLAYERS} />, document.getElementById('root'));
registerServiceWorker();
