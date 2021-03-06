import React, { Component, PropTypes } from 'react'
import './PinnedTweet.css'
import Popover from './../../../Popover';

class PinnedTweet extends Component {
  constructor(props){
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(){
    console.log("ID: ", this.props.id);
    this.props.onDeletePinnedTweet(this.props.id);
  }

  render(){
    return(
      <div className = "pinned-tweet-container">
        <div className = "pinned-tweet-content-container">
            <div className = "pinned-tweet-content">{this.props.content}</div>
        </div>
        <div className = "pinned-tweet-sentiment" style = {{backgroundColor: this.props.color}}>
          {this.props.sentiment}
          <button onClick = {this.onDelete} className = "pinned-tweet-more">x</button>
        </div>
      </div>
    );
  }
}

export default PinnedTweet;
