import React, { Component } from 'react';
import TweetHeader from './../../Presentational/Tweets/TweetHeader/TweetHeader';
import TweetsContainer from './TweetsContainer/TweetsContainer';
import './TweetsSection.css';

class TweetsSection extends Component {
  render(){
    return(
      <div className="Tweet-Section">
        <TweetHeader tweet_data = {this.props.tweet_data}
                     date= {this.props.date}
                     isReceivingData = {this.props.isReceivingData}>
        </TweetHeader>
        <TweetsContainer tweet_data = {this.props.tweet_data}></TweetsContainer>
      </div>
    );
  }
}

export default TweetsSection;
