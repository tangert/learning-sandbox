import React, { Component } from 'react';
import './Tweet.css';

var Tweet = React.createClass({
  getInitialState(){
    return{
      isHovered: false
    };
  },

  render: function(){
    var p = this.props;
    return(
      <div className="Tweet">
        <div className="pic"></div>
        <h1 className ="handle">@{p.handle}</h1>
        <p className="time">{p.time}</p>
        <p className="tweet-content">{p.content}</p>
      </div>
    )
  }
});

export default Tweet;
