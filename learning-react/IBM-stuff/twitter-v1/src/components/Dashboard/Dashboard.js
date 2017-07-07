import React, { Component } from 'react';
import TweetsSection from './TweetsSection/TweetsSection';
import GraphSection from './GraphSection/GraphSection';
import io from 'socket.io-client';
import { Router, browserHistory } from 'react-router'
import './Dashboard.css';

//Socket that lives on the Express server.
const socket = io("http://localhost:3001");

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state ={
      tweet_data: [],
      graph_data: [],
      isReceivingData: true
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

        socket.on('traffic-gen', function(data){
          this.onTrafficGen(data);
        }.bind(this));
  }

  //FIXME: Implement Redux.
  //Event handlers for socket events
  onSentimentData = (data) => {
    this.setState(previousState => ({
      tweet_data: [data.key, ...previousState.tweet_data]
    }));
  }

  onStockData = (data) => {
    var newTime = new Date().getTime();
    this.setState(previousState => ({
      graph_data: [...previousState.graph_data, {point: data.key, timeStamp: newTime} ]
    }));
  }

  onTrafficGen = (data) => {
    if(data.key.isRunning) {
      console.log("DATA KEY RUNNING: ")
      console.log(data.key);
      this.setState({
        isReceivingData: true
      })
    } else {
      console.log("DATA KEY NOT RUNNING ")
      this.setState({
        isReceivingData: false
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Content">
          <TweetsSection tweet_data = {this.state.tweet_data}
                         isReceivingData = {this.state.isReceivingData}/>
          <GraphSection graph_data = {this.state.graph_data}
                        tweet_data = {this.state.tweet_data}
                        isReceivingData = {this.state.isReceivingData}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
