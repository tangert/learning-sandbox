import React, { Component } from 'react'
import Tweet from './../Tweet/Tweet'
import FlipMove from 'react-flip-move'
import { CSSTransitionGroup } from 'react-transition-group'
import './PinnedTweetContainer.css'

class PinnedTweetsContainer extends Component {
  constructor(props){
    super(props);
  }

  renderTweets() {
    if (this.props.pinned_tweets != undefined) {
    return this.props.pinned_tweets.map( (data) => {
      return (
        <Tweet
          key={data.time}
          handle={data.handle}
          time={data.time}
          content={data.content}
          sentiment={data.sentiment}
          color = {data.color}>
        </Tweet>
        );
    });
    }
  }

  render() {
    return(
      <div className = "pinned-tweets-container">
        <FlipMove duration={750} easing="ease-in-out" style={{overflow: 'auto', maxHeight: 400}}>
          { this.renderTweets() }
        </FlipMove>
      </div>
    );
  }
}

export default PinnedTweetsContainer;
