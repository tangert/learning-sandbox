import React, { Component, PropTypes } from 'react'
import Slider from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import './QuickUpdateSection.css'

const marks = {
  0: '1',
  25: '2',
  50: '3',
  75: '4',
  100: '5',
};

class QuickUpdateSection extends React.Component {
  constructor(props){
    super(props);
    this.state = { step_value: 1 };
    this.onStepChange = this.onStepChange.bind(this);
  }

  onStepChange(value){
    this.setState({
      step_value: Math.floor((value + 25)/25)
    });
  }

  render(){
    return(
      <div className = "quick-update-section-container">
        <div className = "quick-update-section-top">
          <div className = "quick-update-title">{this.props.title}</div>
          <div className = "quick-update-step-label">Step: {this.state.step_value}</div>
          <Slider className = "quick-update-slider" min={1} marks={marks} step={25} onChange={this.onStepChange} defaultValue={1} />
        </div>
        <div className = "quick-update-buttons-section">
          <button className = "quick-update-button pos" onClick = {()=> this.props.quickUpdate(this.state.step_value, "pos", this.props.title)}>+</button>
          <button className = "quick-update-button neg" onClick = {()=> this.props.quickUpdate(this.state.step_value, "neg", this.props.title)}>-</button>
        </div>
      </div>
    );
  }
}

export default QuickUpdateSection;
