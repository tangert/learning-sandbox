import React, { Component } from 'react';
import './TweetHeader.css';

class TweetHeader extends Component {
  render(){
      return (
        <div className="Tweet-Header">
          <h1 className ="title">Twitter Sentiment</h1>
          <p id="date">{this.props.date}</p>
          <p id="avg-sent">Average sentiment: <span id="color-id-neg">{this.props.sent}</span></p>
        </div>
      );
  }
}

export default TweetHeader;
