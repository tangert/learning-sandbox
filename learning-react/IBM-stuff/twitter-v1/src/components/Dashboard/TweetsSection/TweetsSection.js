import React, { Component } from 'react';
import TweetHeader from './TweetHeader/TweetHeader';
import TweetFeedContainer from './TweetFeedContainer/TweetFeedContainer';
import PinnedTweetsContainer from './PinnedTweetsContainer/PinnedTweetsContainer';
import ToggleDisplay from './../../../modules/ToggleDisplay';
import './TweetsSection.css';

const TweetsSection = (props) => {
  return (
    <div className="Tweet-Section">
      <TweetHeader tweet_data = {props.tweet_data}
                   date= {props.date}
                   isReceivingData = {props.isReceivingData}
                   last_request_body = {props.last_request_body}
      />
    <PinnedTweetsContainer pinned_tweets = {props.tweet_data}/>
    <div className = "tweet-feed-separator"></div>
    <TweetFeedContainer tweet_data = {props.tweet_data}/>
    </div>
  )
}

export default TweetsSection;
