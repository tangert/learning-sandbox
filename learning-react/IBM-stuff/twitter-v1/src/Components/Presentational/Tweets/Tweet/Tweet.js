import React, { Component } from 'react';
import './Tweet.css';

const Tweet = (props) => {
  // keep internal timer in state
    return(
      <div className= {"tweet-container " + (props.sentiment < 50 ? 'neg': 'pos')}>
          <div className = "left">
          <div className="pic"></div>
        </div>

        <div className = "right">
          <div className = "top-wrapper">
            <h1 className ="handle">@{props.handle}</h1>
            <p className="time">{props.time}</p>
          </div>

          <div className = "bottom-wrapper">
            <p className="tweet-content">{props.content}</p>
          </div>
        </div>
      </div>
    )
};

export default Tweet;
