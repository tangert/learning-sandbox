import React, { Component, PropTypes } from 'react'
import CurrentFeedHeader from './CurrentFeedHeader/CurrentFeedHeader'
import Presets from './Presets/Presets'
import FeedControl from './FeedControl/FeedControl'
import SocialMedia from './SocialMedia/SocialMedia'
import ButtonPanel from './ButtonPanel/ButtonPanel'
import axios from 'axios';
import io from 'socket.io-client'
import './DashboardControl.css'

var updateCountdownInterval;
const socket = io("http://localhost:3001");

class DashboardControl extends Component {
  constructor(props){
    super(props);

    this.state = {
      sentiment: 0,
      sentFlux: 0.5,
      sentTimeRelease: 5,
      stock: 0,
      stockFlux: 0.5,
      stockTimeRelease: 5,
      last_request_body: {},

      social_media_highlighted: false,
      presets_highlighted: false,
      feed_control_highlighted: false,
      isMounted: false
    };

    this.updateHighlight = this.updateHighlight.bind(this);
    this.parseMSIntoReadableTime = this.parseMSIntoReadableTime.bind(this);
    this.formatTimeValue = this.formatTimeValue.bind(this);

    this.onQuickUpdate = this.onQuickUpdate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStopFeed = this.onStopFeed.bind(this);
    this.onClearStore = this.onClearStore.bind(this);
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  //This updates the appropriate section when hovered over.
  updateHighlight = (section) => {
    if(section == 'PRESETS') {
      if(!this.state.presets_highlighted){
        this.setState({
          presets_highlighted: true,
          feed_control_highlighted: false,
          social_media_highlighted: false
        });
      }
    } else if (section == 'FEED_CONTROL') {
      if(!this.state.feed_control_highlighted){
        this.setState({
          feed_control_highlighted: true,
          presets_highlighted: false,
          social_media_highlighted: false
        });
      }
    } else if (section == 'SOCIAL_MEDIA') {
      if(!this.state.social_media_highlighted){
        this.setState({
          social_media_highlighted: true,
          presets_highlighted: false,
          feed_control_highlighted: false
        });
      }
    }
  }

  parseMSIntoReadableTime = (milliseconds) => {
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return (h + ':' + m + ':' + s);
  }

  /******** BUTTON FUNCTIONS *********/
  onSubmit() {
    console.log("ABOUT TO UPDATE DATA");
    let data = {
      sentiment: this.state.sentiment,
      sentFlux: this.state.sentFlux/100,
      sentTimeRelease: this.state.sentTimeRelease,

      stock: this.state.stock,
      stockFlux: this.state.stockFlux/500,
      stockTimeRelease: this.state.stockTimeRelease
    };
    socket.emit('traffic-gen', data);
  }

  onQuickUpdate = (step, direction, title) => {
    let update;

    if(title === 'Stock') {
      if(direction === 'pos') {
        update = { stock: this.state.stock + step };
      } else {
        if (this.state.stock > 0) {
          update = { stock: this.state.stock - step };
        }
      }
    } else if (title === 'Sentiment') {
      if(direction === 'pos') {
        update = { sentiment: this.state.sentiment + step };
      } else {
        if (this.state.sentiment > 0) {
          update = { sentiment: this.state.sentiment - step };
        }
      }
    }

    console.log("UPDATE: ", update);
    this.setState(update, () => {
      let data = {
        sentiment: this.state.sentiment,
        sentFlux: this.state.sentFlux/100,
        sentTimeRelease: this.state.sentTimeRelease,

        stock: this.state.stock,
        stockFlux: this.state.stockFlux/500,
        stockTimeRelease: this.state.stockTimeRelease
      };
      console.log(this.state);
      socket.emit('on-quick-update-graph', data.stock);
      socket.emit('traffic-gen', data);
    });
  }

  onStopFeed() {
    console.log("ABOUT TO STOP DATA");
    socket.emit('traffic-stop');
  }


  /******** SLIDER FUNCTIONS *********/

  onSentChange = (value) => {
    console.log("SENTIMENT: " + value);
    this.setState({
      sentiment: value
    });
  }

  onSentFluxChange = (value) => {
    console.log("SENT FLUX: " + value);
    this.setState({
      sentFlux: value
    });
  }

  onStockChange = (value) => {
    console.log("STOCK: " + value);
    this.setState({
      stock: value
    });
  }

  onStockFluxChange = (value) => {
    console.log("STOCK FLUX: " + value);
    this.setState({
      stockFlux: value
    });
  }

  onSentTimeReleaseChange = (value) => {
    console.log("CHANGING SENT TIME RELEASE: ", value);
    //in seconds
    this.setState({
      sentTimeRelease: this.formatTimeValue(value)
    });
  }

  onStockTimeReleaseChange = (value) => {
    console.log("CHANGING STOCK TIME RELEASE: ", value);
    //in seconds
    this.setState({
      stockTimeRelease: this.formatTimeValue(value)
    });
  }

  onTimeChange = (event) => {
    this.setState({
      time: Number(event.target.value)
    },() => {
        console.log(this.state);
    });
  }

  onRangeAfterChange = (value) => {
    console.log(value);
  }

  onClearStore() {
    this.onStopFeed();
    socket.emit('on-clear-store');
  }

  formatTimeValue(value){
    let new_value;
    switch(value){
      case 0:
        new_value = 5;
        break;
      case 25:
        new_value = 15;
        break;
      case 50:
        new_value = 30;
        break;
      case 75:
        new_value = 45;
        break;
      case 100:
        new_value = 60;
    }
    return new_value;
  }

  render () {
    return(
      <div className = "dashboard-content-container">

        <div className = "dashboard-content-left">

            <div className = "dashboard-content-title-section">
              <div className = "current-feed-title">FEED CONTROL</div>
              <button className = "reset-feed-button" onClick = {this.onClearStore}>RESET</button>
            </div>

            <CurrentFeedHeader time = { this.parseMSIntoReadableTime(this.props.time_left)}
                               isRunning = {this.props.isReceivingData}
                               lastStock = {this.props.graph_data.length > 0 ? this.props.graph_data[this.props.graph_data.length-1].stock : 0}
                               lastSentiment = {this.props.tweet_data.length > 0 ? this.props.tweet_data[0].sentiment : 0}/>

            <div className = "dashboard-content-left-bottom">
              <FeedControl updateHighlight = {this.updateHighlight}
                             isHighlighted = {this.state.feed_control_highlighted}

                             onQuickUpdate = {this.onQuickUpdate}
                             isReceivingData = {this.props.isReceivingData}

                             last_request_body = {this.props.last_request_body}
                             time = {this.state.time}
                             onTimeChange = {this.onTimeChange}

                             sentTimeRelease = {this.state.sentTimeRelease}
                             sentiment = {this.state.sentiment}
                             onSentFluxChange = {this.onSentFluxChange}
                             onSentChange = {this.onSentChange}
                             onRangeAfterChange = {this.onRangeAfterChange}
                             onSentTimeReleaseChange = {this.onSentTimeReleaseChange}

                             stockTimeRelease = {this.state.stockTimeRelease}
                             stock = {this.state.stock}
                             onStockFluxChange = {this.onStockFluxChange}
                             onStockChange = {this.onStockChange}
                             onRangeAfterChange = {this.onRangeAfterChange}
                             onStockTimeReleaseChange = {this.onStockTimeReleaseChange}
                             />

           </div>

           <ButtonPanel
             isReceivingData = {this.props.isReceivingData}
             onSubmit = {this.onSubmit}
             onStopFeed = {this.onStopFeed}
             />

        </div>

        <SocialMedia updateHighlight = {this.updateHighlight}
                     isHighlighted = {this.state.social_media_highlighted}
                     pinned_tweets = {this.props.pinned_tweets}
                     filters = {this.props.filters}
                     />

      </div>
    );
  }
}

export default DashboardControl;
