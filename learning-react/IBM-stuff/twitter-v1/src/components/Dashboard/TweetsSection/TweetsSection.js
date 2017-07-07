import React, { Component } from 'react';
import TweetHeader from './TweetHeader/TweetHeader';
import TweetFeedContainer from './TweetFeedContainer/TweetFeedContainer';
import './TweetsSection.css';

const TweetsSection = (props) => {
  return (
    <div className="Tweet-Section">
      <TweetHeader tweet_data = {props.tweet_data}
                   date= {props.date}
                   isReceivingData = {props.isReceivingData}
      />
      <TweetFeedContainer tweet_data = {props.tweet_data}/>
    </div>
  )
}

export default TweetsSection;
