import React, { Component } from 'react';
import Tweet from './../../../Presentational/Tweets/Tweet/Tweet.js';
import ReactList from 'react-list';
import './TweetsContainer.css';

class TweetsContainer extends Component {

  renderItem(index, key) {
    return <Tweet
      key = {key}
      handle={this.props.tweet_data[index]["handle"]}
      time={this.props.tweet_data[index]["time"]}
      content={this.props.tweet_data[index]["content"]}
      sentiment={this.props.tweet_data[index]["sentiment"]}>
    </Tweet>
  }

  render(){
      return (
        <div className="Tweets-Container">
          <ReactList
            itemRenderer={this.renderItem.bind(this)}
            length={this.props.tweet_data.length}
            type='uniform'
            />
        </div>
      );
  }
}

export default TweetsContainer;
