import React, { Component } from 'react';
import Tweet from './../../../Presentational/Tweets/Tweet/Tweet.js';
import ReactList from 'react-list';
import './TweetsContainer.css';

class TweetsContainer extends Component {

  state = {
    tweets: this.props.data
  };

  handleTweets(tweets) {
    this.setState({tweets});
  }

  renderItem(index, key) {
    return <Tweet key = {key}
      handle={this.state.tweets[index]["handle"]}
      time={this.state.tweets[index]["time"]}
      content={this.state.tweets[index]["content"]}>
    </Tweet>
  }

  render(){
      return (
        <div className="Tweets-Container">
          <ReactList
            itemRenderer={this.renderItem.bind(this)}
            length={this.state.tweets.length}
            type='uniform'
            />
        </div>
      );
  }
}

export default TweetsContainer;
