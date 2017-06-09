import React, { Component } from 'react';
import Tweet from './../../Presentational/Tweet/Tweet';
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
      handle={this.state.tweets[index].handle}
      time="28m"
      content={this.state.tweets[index].content}>
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
