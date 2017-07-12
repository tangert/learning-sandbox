import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './Tweet.css';

let updateInterval;

class Tweet extends Component {
    constructor(props){
      super(props);
      this.state = {
        time: 0
      };

      this.updateTime = this.updateTime.bind(this);
    }

    updateTime() {
      var now = new Date().getTime();
      var updatedTime = Math.round((now - this.props.time)/1000);
        this.setState({
          time: updatedTime
        });
    }

    componentDidMount() {
      this.setState({mounted:  true});
      if(this.state.mounted) {
        updateInterval = setInterval(function(){
          this.updateTime();
        }.bind(this),1000);
      }
    }

    componentWillUnmount() {
       this.setState({mounted:  false});
       clearInterval(updateInterval);
    }

    render(){
      return(
        <div>
           <div className= "tweet-container" style={{backgroundColor: this.props.color.cssColor}}>
               <div className = "left">
               <div className="pic"></div>
             </div>

             <div className = "right">
               <div className = "top-wrapper">
                 <h1 className ="handle">@{this.props.handle}</h1>
                 <p className="time">{this.state.time > 2 ? (this.state.time + "s ago"): "Just now"}</p>
               </div>

               <div className = "bottom-wrapper">
                 <p className="tweet-content">{this.props.content}</p>
               </div>
             </div>
           </div>
      </div>
    );
  }
};

export default Tweet;
