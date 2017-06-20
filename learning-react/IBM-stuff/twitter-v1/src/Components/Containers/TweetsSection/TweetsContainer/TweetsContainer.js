import React, { Component } from 'react';
import Tweet from './../../../Presentational/Tweets/Tweet/Tweet.js';
import ReactList from 'react-list';
import { CSSTransitionGroup } from 'react-transition-group'
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

  renderGroup = (items, ref) =>
    <CSSTransitionGroup
      component='div'
      ref={ref}
      transitionName='new_tweet'
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
    >
      {items}
    </CSSTransitionGroup>;

  render(){
      return (
        <div className="Tweets-Container" style={{overflow: 'auto', maxHeight: 750, minHeight: 750}}>
          <ReactList
            itemRenderer={this.renderItem.bind(this)}
            itemsRenderer={this.renderGroup.bind(this)}
            length={this.props.tweet_data.length*0.75}
            type='uniform'
            useTranslate3d="true"
          />
        </div>
      );
  }
}

export default TweetsContainer;
