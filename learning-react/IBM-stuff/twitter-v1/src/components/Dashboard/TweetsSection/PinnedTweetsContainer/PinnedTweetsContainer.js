import React, { Component } from 'react'
import Tweet from './../Tweet/Tweet'
import FlipMove from 'react-flip-move'
import { CSSTransitionGroup } from 'react-transition-group'
import './PinnedTweetContainer.css'

class PinnedTweetsContainer extends Component {
  renderTweets() {
    return this.props.pinned_tweets.map( (data) => {
      return (
          <Tweet
            key= {data.id}
            handle= {data.handle}
            time= {data.time}
            image = {data.image}
            content={data.content}
            sentiment={data.sentiment}
            color = {data.color.cssColor}>
          </Tweet>
        );
    });
  }

  render() {
    return(
      <div className = "pinned-tweets-container">
        <FlipMove duration={750} easing="ease-in-out" style={{overflow: 'auto', maxHeight: 330}}>
          {this.renderTweets()}
        </FlipMove>
      </div>
    );
  }
}

export default PinnedTweetsContainer;
