import React, { Component } from 'react';
import TweetHeader from './../../Presentational/Tweets/TweetHeader/TweetHeader';
import TweetsContainer from './TweetsContainer/TweetsContainer';
import './TweetsSection.css';

class TweetsSection extends Component {
  render(){
    return(
      <div className="Tweet-Section">
        <TweetHeader date="June 7,2017" sent="23.33"></TweetHeader>
        <TweetsContainer data = {this.props.tweet_data}></TweetsContainer>
      </div>
    );
  }
}

export default TweetsSection;
