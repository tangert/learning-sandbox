import React, { Component, PropTypes } from 'react'
import './CurrentFeedHeader.css'

const UpdateItem = (props) => {
  return (
    <div className = "last-update-item">
      <div className = "last-update-item-title">{props.title}</div>
      <div className = "last-update-item-data">{props.data}</div>
    </div>
  )
}

class CurrentFeedHeader extends Component {
  render () {
    return(
      <div className = "current-feed-header-container">
          <div className = "current-feed-header-timer">{this.props.time}</div>

          <div className = "last-update-container">
            <div className = "last-update-title">Current values: </div>
            <div className = "last-update-data">
              <UpdateItem title = "sentiment" data = {this.props.lastSentiment}/>
              <UpdateItem title = "stock" data = {this.props.lastStock}/>
            </div>
          </div>
      </div>
    )
  }
}

export default CurrentFeedHeader;
