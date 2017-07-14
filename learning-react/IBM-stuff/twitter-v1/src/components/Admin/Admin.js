import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../../actions/index.js';

import Overdrive from 'react-overdrive';
import DashboardControl from './DashboardControl/DashboardControl'
import './Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className = "admin">
        <DashboardControl/>
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
