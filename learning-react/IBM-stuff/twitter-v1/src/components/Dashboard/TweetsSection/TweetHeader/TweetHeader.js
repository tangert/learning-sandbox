import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import axios from 'axios';
import './TweetHeader.css';
import io from 'socket.io-client'

const socket = io("http://localhost:3001");

class TweetHeader extends Component {
  constructor(props){
    super(props);
    const date =  new Date().toDateString();
    this.state = {
      avgSent: 0,
      date: date,
    }
    this.computeAverage = this.computeAverage.bind(this);
    this.playButtonHandler = this.playButtonHandler.bind(this);
  }

  computeAverage() {
    if(this.props.tweet_data.length > 0) {
      const data_limit = 20;
      const sentiment_sum = this.props.tweet_data.slice(0,data_limit).map((point) => {
        return point.sentiment;
      }).reduce((a, b) => a + b, 0);

      this.setState({
        avgSent: sentiment_sum / data_limit
      });
    }
  }


  componentDidMount(){
      setInterval(function(){
        if(this.props.isReceivingData) {
          this.computeAverage();
        }
      }.bind(this),1000);
  }

  playButtonHandler(){
    console.log("play button");
    const requestExists = Object.keys(this.props.last_request_body).length > 0;
    if(!this.props.isReceivingData && requestExists){
      socket.emit('traffic-gen', this.props.last_request_body);
    } else {
      socket.emit('traffic-stop');
    }
  }

  render(){
    let button_state;
    if(this.props.isReceivingData){
      button_state = "| |";
    } else {
      button_state = " > ";
    }

    return (
        <div className="Tweet-Header">
            <div className = "tweet-header-content">
              <div className = "top">
                <div className = "text-wrap">
                  <p className = "twitter-title"> Twitter Sentiment </p>
                  <p className="date">{this.state.date}</p>
                </div>
              </div>

              <div className = "bottom">
                <p className="avg-sent">Average sentiment:</p>
                <div className = { this.state.avgSent < 50 ? "color-id-neg" : "color-id-pos" }>
                  <AnimatedNumber
                    component="text"
                    value={this.state.avgSent}
                    stepPrecision={2}
                    duration={300}
                    />%
                </div>
              </div>
            </div>

            <div className = "tweet-header-button-container">
              <button className = "tweet-header-button"
                onClick = {this.playButtonHandler} >
                <span style = {{fontSize: 20, fontWeight: 600}}>
                    { button_state }
                </span>
                </button>
            </div>
        </div>
      );
  }
}

export default TweetHeader;
