import React, { Component } from 'react';
import Tweet from './../../../Presentational/Tweets/Tweet/Tweet.js';
import ReactList from 'react-list';
import FlipMove from 'react-flip-move';
import { CSSTransitionGroup } from 'react-transition-group'
import './TweetsContainer.css';

class TweetsContainer extends Component {
  constructor(props){
      super(props);
  }

  renderTweets() {
    return this.props.tweet_data.map( (data) => {
      return (
        <Tweet
          key={data["time"]}
          handle={data["handle"]}
          time={data["time"]}
          content={data["content"]}
          sentiment={data["sentiment"]}>
        </Tweet>
        );
    });
  }

  render(){
      return (
        <div className="Tweets-Container" style={{overflow: 'auto', maxHeight: 750, minHeight: 750}}>
          <FlipMove duration={750} easing="ease-out">
            { this.renderTweets() }
          </FlipMove>
        </div>
      );
  }
}

export default TweetsContainer;
