import React, { Component } from 'react';
import Tweet from './../../../Presentational/Tweets/Tweet/Tweet.js';
import FlipMove from 'react-flip-move';
import { CSSTransitionGroup } from 'react-transition-group'
import './TweetsContainer.css';

class TweetsContainer extends Component {
  constructor(props){
      super(props);
  }

  renderTweets() {
    return this.props.tweet_data.slice(0,20).map( (data) => {
      return (
        <Tweet
          key={data["time"]}
          handle={data["handle"]}
          time={data["time"]}
          content={data["content"]}
          sentiment={data["sentiment"]}
          color = {data["color"]}>
        </Tweet>
        );
    });
  }

  render(){
      return (
        <div className="Tweets-Container" style={{overflow: 'auto', maxHeight: 750, minHeight: 750}}>
          <FlipMove duration={750} easing="ease-in-out">
            { this.renderTweets() }
          </FlipMove>
        </div>
      );
  }
}

export default TweetsContainer;
