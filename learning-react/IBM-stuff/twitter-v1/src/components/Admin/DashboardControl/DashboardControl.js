import React, { Component, PropTypes } from 'react'
import CurrentFeedHeader from './CurrentFeedHeader/CurrentFeedHeader'
import Presets from './Presets/Presets'
import LiveInjection from './LiveInjection/LiveInjection'
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
      time: 0,
      sentiment: 0,
      sentFlux: 0,
      sentTimeRelease: 0,
      stock: 0,
      stockFlux: 0,
      stockTimeRelease: 0,
      last_request_body: {},

      social_media_highlighted: false,
      presets_highlighted: false,
      live_injection_highlighted: false,
      isMounted: false
    };

    this.updateHighlight = this.updateHighlight.bind(this);
    this.parseMSIntoReadableTime = this.parseMSIntoReadableTime.bind(this);

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
          live_injection_highlighted: false,
          social_media_highlighted: false
        });
      }
    } else if (section == 'LIVE_INJECTION') {
      if(!this.state.live_injection_highlighted){
        this.setState({
          live_injection_highlighted: true,
          presets_highlighted: false,
          social_media_highlighted: false
        });
      }
    } else if (section == 'SOCIAL_MEDIA') {
      if(!this.state.social_media_highlighted){
        this.setState({
          social_media_highlighted: true,
          presets_highlighted: false,
          live_injection_highlighted: false
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
    console.log("CHANGING");
    //in seconds
    this.setState({
      sentTimeRelease: value
    });
  }

  onStockTimeReleaseChange = (value) => {
    //in seconds
    this.setState({
      stockTimeRelease: value
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

  onSubmit() {
    console.log("ABOUT TO UPDATE DATA");

    let requestBody = {
      time: this.state.time,

      sentiment: this.state.sentiment,
      sentFlux: this.state.sentFlux/100,
      sentTimeRelease: this.state.sentTimeRelease,

      stock: this.state.stock,
      stockFlux: this.state.stockFlux/500,
      stockTimeRelease: this.state.stockTimeRelease
    };

    axios({
      method: 'post',
      url: '/api/gen-traffic',
      data: requestBody
    });
  }

  onStopFeed() {
    console.log("ABOUT TO STOP DATA");
    axios.delete('api/gen-traffic');
  }

  onClearStore() {
    this.onStopFeed();
    socket.emit('on-clear-store', {});
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
                               graph_data = {this.props.graph_data.length > 0 ? this.props.graph_data : 0}
                               tweet_data = {this.props.tweet_data.length > 0 ? this.props.tweet_data : 0}
                               isRunning = {this.props.isReceivingData}
                               lastStock = {this.props.graph_data.length > 0 ? this.props.graph_data[this.props.graph_data.length-1].stock : 0}
                               lastSentiment = {this.props.tweet_data.length > 0 ? this.props.tweet_data[0].sentiment : 0}/>

            <div className = "dashboard-content-left-bottom">
              <LiveInjection updateHighlight = {this.updateHighlight}
                             isHighlighted = {this.state.live_injection_highlighted}

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
