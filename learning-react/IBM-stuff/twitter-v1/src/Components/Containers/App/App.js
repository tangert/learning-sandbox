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
  constructor(props) {
    super(props)
    this.state ={
      //some initial tweet data
      tweet_data: [
        {
          handle: "weep wop",
          content: "bane and ox sucks lol",
          sentiment: 25,
          time: Date.now()
        },
        {
          handle: "weep wop",
          content: "bane and ox is alirght",
          sentiment: 50,
          time: Date.now()
        },
        {
          handle: "weep wop",
          content: "wow fucking love bane and ox",
          sentiment: 55,
          time: Date.now()
        }
      ],
      graph_data: [
      ]
    }
  }

  componentDidMount() {
        socket.on('server-connect', function (data) {
          console.log('SHOULD RECEIVE A SERVER EVENT:');
          console.log(data);
          socket.emit('client-connect', { connectedToClient: 'true' });
        }.bind(this));

        socket.on('sentiment-data', function(data){
          console.log('GETTING SENTIMENT: ');
          console.log(data);
          this.onSentimentData(data);
        }.bind(this));

        socket.on('stock-data', function(data){
          console.log('GETTING STOCK: ');
          console.log(data);
          this.onStockData(data);
        }.bind(this));
  }

  //FIXME: 1. actually learn how to render the data.
  // Learn how to pass down changes in state and propogate to each rendered component
  // Implement Redux.

  //Event handlers for socket events
  onSentimentData = (data) => {
    this.setState(previousState => ({
      tweet_data: [...previousState.tweet_data, data.key]
    }));
    console.log("TWEET COUNT: \n " + this.state.tweet_data.length);
  }

  onStockData = (data) => {
    console.log("GOT STOCK DATA!: " + data);
    this.state.stock_points.push(data);
    console.log("NEW STOCK POINT COUNT: \n " + this.state.stock_points.length);
  }

  render() {
    return (
      <div className="App">
        <div className="Content">
          <TweetsSection tweet_data = {this.state.tweet_data}/>
          <GraphSection graph_data = {this.state.graph_data}/>
        </div>
      </div>
    );
  }
}

export default App;
