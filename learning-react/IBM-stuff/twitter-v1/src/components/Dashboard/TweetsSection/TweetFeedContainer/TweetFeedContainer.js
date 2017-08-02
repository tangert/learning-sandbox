import React, { Component } from 'react';
import Tweet from './../Tweet/Tweet';
import FlipMove from 'react-flip-move';
import { CSSTransitionGroup } from 'react-transition-group';
import './TweetFeedContainer.css';

class TweetFeedContainer extends Component {
  constructor(props){
    super(props);
  }

  renderTweets() {
    if (this.props.tweet_data != undefined) {
    return this.props.tweet_data.slice(0,50).map( (data) => {
      return (
        <Tweet
          key={data.id}
          handle={data.handle}
          time={data.time}
          image = {data.image}
          content={data.content}
          sentiment={data.sentiment}
          color = {data.color.cssColor}>
        </Tweet>
        );
    });
    }
  }

  render(){
    return (
      <div className="Tweets-Container" style={{overflow: 'auto', maxHeight: 900}}>
        <FlipMove duration={750} easing="ease-in-out">
          { this.renderTweets() }
        </FlipMove>
      </div>
    );
  }
}


export default TweetFeedContainer;
