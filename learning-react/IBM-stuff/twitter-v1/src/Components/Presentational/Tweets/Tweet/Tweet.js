import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './Tweet.css';

class Tweet extends Component {
    constructor(props){
      super(props);
      console.log(props.color);
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
                 <p className="time">{this.props.time}</p>
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
