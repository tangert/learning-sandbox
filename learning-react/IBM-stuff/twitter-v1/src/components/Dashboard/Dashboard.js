import React, { Component } from 'react';
import TweetsSection from './TweetsSection/TweetsSection';
import GraphSection from './GraphSection/GraphSection';
import { Router, browserHistory } from 'react-router'
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="App">
        <div className="Content">
          <TweetsSection tweet_data = {this.props.tweet_data}
                         isReceivingData = {this.props.isReceivingData}/>
          <GraphSection graph_data = {this.props.graph_data}
                        tweet_data = {this.props.tweet_data}
                        isReceivingData = {this.props.isReceivingData}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
