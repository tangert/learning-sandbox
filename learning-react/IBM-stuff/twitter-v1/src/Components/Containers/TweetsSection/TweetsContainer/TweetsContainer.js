import React, { Component } from 'react';
import Tweet from './../../../Presentational/Tweets/Tweet/Tweet.js';
import ReactList from 'react-list';
import { CSSTransitionGroup } from 'react-transition-group'
import './TweetsContainer.css';

class TweetsContainer extends Component {
  constructor(props){
      super(props);
      this.state = {
        showChild: true,
      }
  }

  renderItem(index, key) {
    console.log(index);
    return <Tweet
      onTransitionEnd={this.transitionEnd} mounted={this.state.showChild}
      key = {key}
      handle={this.props.tweet_data[index]["handle"]}
      time={this.props.tweet_data[index]["time"]}
      content={this.props.tweet_data[index]["content"]}
      sentiment={this.props.tweet_data[index]["sentiment"]}>
    </Tweet>;
  }

  render(){
      return (
        <div className="Tweets-Container" style={{overflow: 'auto', maxHeight: 750, minHeight: 750}}>
          <ReactList
            itemRenderer={this.renderItem.bind(this)}
            length={this.props.tweet_data.length}
            type='uniform'
            useTranslate3d="true"
          />
        </div>
      );
  }
}

export default TweetsContainer;
