import React, { Component } from 'react';
import './ButtonPanel.css';

class ButtonPanel extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStopFeed = this.onStopFeed.bind(this);
  }

  onSubmit(){

  }

  onStopFeed(){

  }

  render () {
    let button_section;
    if (!this.props.isReceivingData) {
      button_section = (
        <div className = "button-section">
          <button className ="button start" onClick = {this.onSubmit}>{"Start feed"}</button>
        </div>
      )
    } else {
      button_section = (
        <div className = "button-section">
          <button className ="button update" onClick = {this.onSubmit}>{"Update"}</button>
          <button className ="button stop" onClick = {this.onStopFeed}>{"Stop"}</button>
        </div>
      )
    }

    return(
      <div>{button_section}</div>
    );
  }
}

export default ButtonPanel;
