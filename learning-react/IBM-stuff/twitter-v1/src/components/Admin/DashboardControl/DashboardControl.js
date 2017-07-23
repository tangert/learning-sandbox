import React, { Component, PropTypes } from 'react'
import CurrentFeedHeader from './CurrentFeedHeader/CurrentFeedHeader'
import Presets from './Presets/Presets'
import LiveInjection from './LiveInjection/LiveInjection'
import SocialMedia from './SocialMedia/SocialMedia'
import './DashboardControl.css'

var updateCountdownInterval;

class DashboardControl extends Component {
  constructor(props){
    super(props);

    this.state = {
      social_media_highlighted: false,
      presets_highlighted: false,
      live_injection_highlighted: false,
      timeLeft: 0,
      isMounted: false
    };

    this.updateHighlight = this.updateHighlight.bind(this);
    this.updateCountdown = this.updateCountdown.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.parseMSIntoReadableTime = this.parseMSIntoReadableTime.bind(this);
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

  updateCountdown() {
    clearInterval(updateCountdownInterval);
    this.startCountdown(this.props.last_request_body.time);
  }

  startCountdown(time) {
    clearInterval(updateCountdownInterval);
    var end = (time)*60*1000;
    var now = new Date().getTime();
    var endTime = now + end;

      updateCountdownInterval = setInterval(function(){
          //local now used on each update.
          let now = new Date().getTime();
          var difference = endTime - now;

          this.setState({
            timeLeft: difference
          });

          if(difference < 1000) {
            clearInterval(updateCountdownInterval);
          }
        }.bind(this),1000);
    }

  parseMSIntoReadableTime = (milliseconds) => {
    //Get hours from milliseconds
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

  render () {
    return(
      <div className = "dashboard-content-container">

        <div className = "dashboard-content-left">
            <div className = "current-feed-title">FEED CONTROL</div>

            <CurrentFeedHeader time = { this.props.isReceivingData ? this.parseMSIntoReadableTime(this.state.timeLeft) : this.updateCountdown() }
                               graph_data = {this.props.graph_data.length > 0 ? this.props.graph_data : 0}
                               tweet_data = {this.props.tweet_data.length > 0 ? this.props.tweet_data : 0}
                               isRunning = {this.props.isReceivingData}
                               lastStock = {this.props.graph_data.length > 0 ? this.props.graph_data[this.props.graph_data.length-1].stock : 0}
                               lastSentiment = {this.props.tweet_data.length > 0 ? this.props.tweet_data[0].sentiment : 0}/>

            <div className = "dashboard-content-left-bottom">
              <LiveInjection updateHighlight = {this.updateHighlight}
                             isHighlighted = {this.state.live_injection_highlighted}

                             isReceivingData = {this.props.isReceivingData}
                             updateCountdown = {this.updateCountdown}
                             startCountdown = {this.startCountdown}
                             />

             <Presets updateHighlight = {this.updateHighlight}
                    isHighlighted = {this.state.presets_highlighted} />

           </div>
        </div>

        <SocialMedia updateHighlight = {this.updateHighlight}
                     isHighlighted = {this.state.social_media_highlighted}/>

      </div>
    );
  }
}

export default DashboardControl;
