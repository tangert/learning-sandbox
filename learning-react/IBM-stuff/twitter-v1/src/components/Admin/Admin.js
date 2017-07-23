import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../../actions/index.js';

import Overdrive from 'react-overdrive';
import DashboardControl from './DashboardControl/DashboardControl'
import './Admin.css';

class Admin extends Component {
  render(){
    return(
      <div className = "admin">
        <DashboardControl tweet_data = {this.props.tweet_data}
                          graph_data = {this.props.graph_data}
                          isReceivingData = {this.props.isReceivingData}
                          last_request_body = {this.props.last_request_body}/>
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
    isReceivingData: state.dashboard.isReceivingData,
    last_request_body: state.api.last_request_body
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
