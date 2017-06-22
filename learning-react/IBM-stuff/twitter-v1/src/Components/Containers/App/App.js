import React, { Component } from 'react';
import TweetsSection from './../TweetsSection/TweetsSection';
import GraphSection from './../GraphSection/GraphSection';
import io from 'socket.io-client';
import { Router, browserHistory } from 'react-router'
import './App.css';

//Socket that lives on the Express server.
const socket = io("http://localhost:3001");

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      tweet_data: [],
      graph_data: [],
    }
  }

  componentDidMount() {
        socket.on('server-connect', function (data) {
          console.log('SHOULD RECEIVE A SERVER EVENT:');
          socket.emit('client-connect', { connectedToClient: 'true' });
        }.bind(this));

        socket.on('sentiment-data', function(data){
          console.log('GETTING SENTIMENT: ');
          this.onSentimentData(data);
        }.bind(this));

        socket.on('stock-data', function(data){
          console.log('GETTING STOCK: ');
          this.onStockData(data);
        }.bind(this));
  }

  //FIXME: Implement Redux.
  //Event handlers for socket events
  onSentimentData = (data) => {
    this.setState(previousState => ({
      tweet_data: [data.key, ...previousState.tweet_data]
    }));
    console.log("TWEET COUNT: \n " + this.state.tweet_data.length);
  }

  onStockData = (data) => {
    var newTime = new Date().getTime();
    this.setState(previousState => ({
      graph_data: [...previousState.graph_data, {point: data.key, timeStamp: newTime} ]
    }));
    console.log(this.state);
    console.log("NEW STOCK POINT COUNT: \n " + this.state.graph_data.length);
  }

  render() {
    return (


      <div className="App">
        <div className="Content">
          <TweetsSection tweet_data = {this.state.tweet_data}/>
          <GraphSection graph_data = {this.state.graph_data} tweet_data = {this.state.tweet_data}/>
        </div>
      </div>
    );
  }
}

export default App;
