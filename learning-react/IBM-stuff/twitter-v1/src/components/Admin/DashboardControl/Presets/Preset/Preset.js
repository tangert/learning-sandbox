import React, { PropTypes } from 'react'
import './Preset.css'


class Preset extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render () {

    const borderStyle = {
      borderColor: this.props.color
      
    };

    const bgStyle = {
      backgroundColor: this.props.color
    };

    return(
      <div className= "preset-container" style = {borderStyle}>
        <div className = "preset-top">
          <div className = "preset-left">
            <div className = "preset-label" style = {bgStyle} >{this.props.label}</div>
            <div className = "preset-time">{this.props.time}</div>
          </div>

          <div className = "preset-right">
          <button className = "preset-more">...</button>
          </div>
          </div>

        <div className = "preset-bottom">
          <div className = "preset-description">{this.props.description}</div>
          <button className = "preset-selection" style = {borderStyle}></button>
        </div>
      </div>
    );
  }
}

export default Preset;
