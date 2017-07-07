import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import './TweetHeader.css';

class TweetHeader extends Component {
  constructor(props){
    super(props);
    const date =  new Date().toDateString();
    this.state = {
      avgSent: 0,
      date: date
    }
    this.computeAverage = this.computeAverage.bind(this);
  }

  computeAverage() {
    if(this.props.tweet_data.length > 0) {
      const data_limit = 20;

      //grab all of the sentiments from the tweet data
      const sentiment_sum = this.props.tweet_data.slice(0,data_limit).map((point) => {
        return point.sentiment;
      }).reduce((a, b) => a + b, 0);

      this.setState({
        avgSent: sentiment_sum / data_limit
      });
    }
  }


  componentDidMount(){
    console.log(this.state);
      setInterval(function(){
        if(this.props.isReceivingData) {
          this.computeAverage();
        }
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
