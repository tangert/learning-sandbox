import React, { Component } from 'react';
import TweetHeader from './../../Presentational/TweetHeader/TweetHeader';
import TweetsContainer from './../TweetsContainer/TweetsContainer';
import './TweetsSection.css';

var TWEET_DATA = [
  {
    handle: "sucksballlss",
    content: "Testing out Bane and Ox!!!",
    id:1
  },
  {
    handle: "Jgihribhr",
    content: "bnihgirjorb out Bane and Ox!!!",
    id:2
  },
  {
    handle: "wooowoooo",
    content: "Testing out Bane and WOWOJFO!!!",
    id:3
  }
  ,
  {
    handle: "wooowoooo",
    content: "Testing out Bane and WOWOJFO!!!",
    id:4
  }
  ,
  {
    handle: "wooowoooo",
    content: "Testing out Bane and WOWOJFO!!!",
    id:5
  }
];

class TweetsSection extends Component {
  render(){
    return(
      <div className="Tweet-Section">
        <TweetHeader date="June 7,2017" sent="23.33"></TweetHeader>
        <TweetsContainer data = {TWEET_DATA}></TweetsContainer>
      </div>
    );
  }
}

export default TweetsSection;
