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
      if(time < 3) {
        newTime = "Just now";
      } else if (time < 60) {
        newTime = this.state.time + "s ago";
      } else {
        newTime = Math.floor(this.state.time / 60) + "m ago";
      }

      this.setState({
        formattedTime: newTime
      });
    }

    componentDidMount() {
      this.setState({mounted:  true},() => {
          this.updateInterval = setInterval(function(){
            this.updateTime();
            this.formatTime(this.state.time);
          }.bind(this),1000);
      });
    }

    componentWillUnmount() {
       clearInterval(this.updateInterval);
    }

    render(){
      return(
        <div>
           <div className= "tweet-container" style={{borderColor: this.props.color.cssColor, backgroundColor: this.props.color.cssColor}}>
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
