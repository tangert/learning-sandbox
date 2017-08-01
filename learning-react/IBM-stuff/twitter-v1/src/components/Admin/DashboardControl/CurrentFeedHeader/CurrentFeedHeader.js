import React, { PropTypes } from 'react'
import './CurrentFeedHeader.css'

class CurrentFeedHeader extends React.Component {
  constructor(props){
    super(props);
    this.formatStockData = this.formatStockData.bind(this);
    this.formatTweetData = this.formatTweetData.bind(this);
  }

  formatStockData(data) {
    let stock_points = [];
    for(var i = 0; i < data.length; i++) {
      stock_points.push(data[i].stock);
    }
    return stock_points;
  }

  formatTweetData(data) {
    let sent_points = []
    for(var i = 0; i < data.length; i++) {
      sent_points.push(data[i].sentiment);
    }

    let splice_start;
    let splice_end = sent_points.length-1;
    sent_points.length > 20 ? splice_start = sent_points.length - 20 : splice_start = 0;

    return sent_points.splice(splice_start, splice_end);
  }

  render () {
    return(
      <div className = "current-feed-header-container">
        <div className = "current-feed-header-timer">{this.props.time}</div>
      </div>
    )
  }
}

export default CurrentFeedHeader;
