import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './Tweet.css';

class Tweet extends Component {
    constructor(props){
      super(props);
      this.transitionEnd = this.transitionEnd.bind(this)
      this.mountStyle = this.mountStyle.bind(this)
      this.unMountStyle = this.unMountStyle.bind(this)
      this.state ={ //base css
        show: true,
        style :{
          opacity: 0,
          height: 0,
          transition: 'all 2s ease',
        }
      }
    }

    componentWillReceiveProps(newProps) { //check for the mounted props
      if(!newProps.mounted)
        return this.unMountStyle() //call outro animation when mounted prop is false
      this.setState({ //remount the node when the mounted prop is true
        show: true
      })
      setTimeout(this.mountStyle, 10) //call the into animiation
    }

    unMountStyle() { //css for unmount animation
      this.setState({
        style: {
          opacity: 0,
          height: 100,
          transition: 'all 1s ease',
        }
      })
    }

    mountStyle() { // css for mount animation
      this.setState({
        style: {
          opacity: 1,
          height: 100,
          transition: 'all 1.25s ease-in-out',
        }
      })
    }

    componentDidMount(){
      setTimeout(this.mountStyle, 10) //call the into animiation
    }

    transitionEnd(){
      if(!this.props.mounted){ //remove the node on transition end when the mounted prop is false
        this.setState({
          show: false
        })
      }
    }

    render(){
      return(
      this.state.show &&
      <div style={this.state.style} onTransitionEnd={this.transitionEnd}>
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
      </div>
    );
  }
};

export default Tweet;
