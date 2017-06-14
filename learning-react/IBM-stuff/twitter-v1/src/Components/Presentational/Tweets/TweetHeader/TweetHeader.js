import React, { Component } from 'react';
import './TweetHeader.css';

class TweetHeader extends Component {
  render(){
      return (
        <div className="Tweet-Header">
            <div className = "top">
              <div className = "text-wrap">
                <p className = "twitter-title"> Twitter Sentiment </p>
                <p className="date">{this.props.date}</p>
              </div>
            </div>

            <div className = "bottom">
              <p className="avg-sent">Average sentiment:</p>
              <p className="color-id-neg">{this.props.sent}</p>
            </div>
        </div>
      );
  }
}

export default TweetHeader;
