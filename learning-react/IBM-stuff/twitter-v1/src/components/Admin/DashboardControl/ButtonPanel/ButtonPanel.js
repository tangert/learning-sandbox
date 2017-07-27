import React, { Component } from 'react';
import './ButtonPanel.css';

class ButtonPanel extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let button_section;
    if (!this.props.isReceivingData) {
      button_section = (
        <div className = "button-section">
          <button className ="button start" onClick = {this.props.onSubmit}>{"Start feed"}</button>
        </div>
      )
    } else {
      button_section = (
        <div className = "button-section">
          <button className ="button update" onClick = {this.props.onSubmit}>{"Update"}</button>
          <button className ="button stop" onClick = {this.props.onStopFeed}>{"Stop"}</button>
        </div>
      )
    }

    return(
      <div>{button_section}</div>
    );
  }
}

export default ButtonPanel;
