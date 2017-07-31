import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                         pinned_tweets = {this.props.pinned_tweets}
                         isReceivingData = {this.props.isReceivingData}
                         filtered_tweets = {this.props.filtered_tweets}
                         filters = {this.props.filters}
                         last_request_body = {this.props.last_request_body}/>

          <GraphSection graph_data = {this.props.graph_data}
                        tweet_data = {this.props.tweet_data}
                        isReceivingData = {this.props.isReceivingData}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    graph_data: state.dashboard.stock_data,
    tweet_data: state.dashboard.tweet_data,
    pinned_tweets: state.dashboard.pinned_tweets,
    filtered_tweets: state.dashboard.filtered_tweets,
    filters: state.dashboard.filters,
    isReceivingData: state.dashboard.isReceivingData,
    last_request_body: state.api.last_request_body
  };
}


export default connect(mapStateToProps, null)(Dashboard)
