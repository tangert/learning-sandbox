import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './Tweet.css';

class Tweet extends Component {
    constructor(props){
      super(props);
      this.state = {};
    }

    componentWillMount(){
      console.log("ABOUT TO MOUNT");
    }

    componentDidMount(){
      console.log("TWEET MOUNTED");
    }

    render(){
      return(
      <div>
          <CSSTransitionGroup
             transitionName="new"
             transitionEnterTimeout={250}
             transitionLeaveTimeout={250}
             transitionAppear={true}
             transitionAppearTimeout={500}
             >
             {
               <div className= {"tweet-container " + (this.props.sentiment < 50 ? 'neg': 'pos')}>
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
             }
        </CSSTransitionGroup>
      </div>
    );
  }
};

export default Tweet;
