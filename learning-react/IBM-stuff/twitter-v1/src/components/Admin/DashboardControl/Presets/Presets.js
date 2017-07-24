import React, { Component, PropTypes } from 'react'
import Preset from './Preset/Preset'
import './Presets.css'

class Presets extends Component {
  //map this.props.presets (from mongo) to container
  render () {
    return(
      <div className = "presets-container">
        <div className = "presets-content"
          onMouseOver = {()=>this.props.updateHighlight('PRESETS')}
          style ={ this.props.isHighlighted ? {opacity: 1} : {opacity: 0.5} }>

          <div className = "label-control-header">
            <div className = "corner-label">PRESETS</div>
          </div>

          <Preset label = "incident" description = "Show after boom." time = "10:00" color = "#FF5757"/>
          <Preset label = "recovery" description = "stock will recover" time = "10:00" color = "#8BB361"/>
          <Preset label = "bankrupt" description = "Bane and Ox goes to absolute shit" time = "5:00" color = "#C27900"/>
          <Preset label = "success" description = "Bane and Ox at an all time high" time = "60:00" color = "#7FB7F9"/>
        </div>
      </div>
    );
  }
}

export default Presets;
