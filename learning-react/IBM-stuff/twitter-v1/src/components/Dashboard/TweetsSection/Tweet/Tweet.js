import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './Tweet.css';

class Tweet extends Component {
    constructor(props){
      super(props);
      this.state = {
        mounted: false,
        time: 0,
        formattedTime: "Just now"
      };

      var updateInterval;
      this.updateTime = this.updateTime.bind(this);
      this.formatTime = this.formatTime.bind(this);
    }

    updateTime() {
      var now = new Date().getTime();
      var updatedTime = Math.round((now - this.props.time)/1000);
        this.setState({
          time: updatedTime
        });
    }

    formatTime(time) {
      let newTime;

      if (time < 5) {
        newTime = "Just now";
      } else if (time < 60) {
        newTime = this.state.time + "s ago";
      } else if (time < 3600){
        newTime = Math.floor(this.state.time / 60) + "m ago";
      } else {
        newTime = Math.floor(this.state.time / 3600) + "h ago";
      }

      this.setState({
        formattedTime: newTime
      });
    }

    componentDidMount() {
      this.setState({mounted:  true},() => {

          let interval_time = 5000;

          this.updateInterval = setInterval(function(){

            this.updateTime();
            this.formatTime(this.state.time);

            if (this.state.time > 60) {
              interval_time = 60000;
            } else if (this.state.time > 3600) {
              interval_time = 3600000;
            }
          }.bind(this),interval_time);
      });
    }

    componentWillUnmount() {
       clearInterval(this.updateInterval);
    }

    render(){
      return(
        <div>
           <div className= "tweet-container" style={{backgroundColor: this.props.color}}>
               <div className = "left">
               <div className="pic"><img src= {require('../../../../static/profile-pics/image' + this.props.image + '.jpeg')}/></div>
             </div>

             <div className = "right">
               <div className = "top-wrapper">
                 <h1 className ="handle">@{this.props.handle}</h1>
                 <p className="time">{this.state.formattedTime}</p>
               </div>

               <div className = "bottom-wrapper">
                 <p className="tweet-content">{this.props.content}</p>
               </div>
             </div>

             <div className = "tweet-container-background" style={{backgroundColor: this.props.color.cssColor}}></div>
           </div>
      </div>
    );
  }
};

export default Tweet;
