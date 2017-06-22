import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import './TweetHeader.css';

class TweetHeader extends Component {
  constructor(props){
    super(props);
    const date =  new Date().toDateString();
    this.state = {
      dataCount: 0,
      dataSum: 0,
      avgSent: 0,
      date: date
    }
    this.computeAverage = this.computeAverage.bind(this);
  }

  computeAverage() {
    const data = this.props.tweet_data;
    this.setState(previousState => ({
      dataCount: data.length,
      dataSum: previousState.dataSum + data[0].sentiment,
      avgSent: (this.state.dataSum + data[0].sentiment) / (this.state.dataCount + 1)
    }));
  }

  componentDidMount(){
    console.log(this.state);
    setInterval(function(){
      this.computeAverage();
    }.bind(this),1000);
  }

  render(){
      return (
        <div className="Tweet-Header">
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
      );
  }
}

export default TweetHeader;
