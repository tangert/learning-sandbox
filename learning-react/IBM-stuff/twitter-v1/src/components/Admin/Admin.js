import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../../actions/index.js';

import Overdrive from 'react-overdrive';
import DashboardControl from './DashboardControl/DashboardControl'
import io from 'socket.io-client'
import './Admin.css'

class Admin extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = "admin">
        <DashboardControl tweet_data = {this.props.tweet_data}
                          graph_data = {this.props.graph_data}
                          pinned_tweets = {this.props.pinned_tweets}
                          filters = {this.props.filters}
                          isReceivingData = {this.props.isReceivingData}
                          last_request_body = {this.props.last_request_body}
                          time_left = {this.props.time_left}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

function mapStateToProps(state){
  return {
    graph_data: state.dashboard.stock_data,
    tweet_data: state.dashboard.tweet_data,
    filtered_tweets: state.dashboard.filtered_tweets,
    filters: state.dashboard.filters,
    pinned_tweets: state.dashboard.pinned_tweets,
    isReceivingData: state.dashboard.isReceivingData,
    last_request_body: state.api.last_request_body,
    time_left: state.api.time_left
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
