import React, { Component, PropTypes } from 'react'
import './LastUpdatePanel.css'


const UpdateItem = (props) => {
  return (
    <div className = "last-update-item">
      <div className = "last-update-item-title">{props.title}</div>
      <div className = "last-update-item-data">{props.data}</div>
    </div>
  )
}

class LastUpdatePanel extends Component {
  render(){
    return(
      <div className = "last-update-container">
        <div className = "last-update-title">Last update: </div>
        <div className = "last-update-data">
          <UpdateItem title = "time" data = {this.props.time}/>
          <UpdateItem title = "sentiment" data = {this.props.sentiment}/>
          <UpdateItem title = "stock" data = {this.props.stock}/>
          <UpdateItem title = "trading" data = {this.props.trading}/>
        </div>
      </div>
    );
  }
}

export default LastUpdatePanel;
