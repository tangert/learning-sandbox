import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import './SocialMedia.css'

class SocialMedia extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTweetContent: "",
      currentTweetSentiment: 0
    };

    this.onCreatePinnedTweet = this.onCreatePinnedTweet.bind(this);
    this.onEditPinnedTweet = this.onEditPinnedTweet.bind(this);
    this.onDeletePinnedTweet = this.onDeletePinnedTweet.bind(this);

    this.handleTweetContentChange = this.handleTweetContentChange.bind(this);
    this.handleTweetSentimentChange = this.handleTweetSentimentChange.bind(this);
  }

  handleClick(e) {
    this.setState({open: !this.state.open});
  }

  handleTweetContentChange(e) {
    this.setState({
      currentTweetContent: e.target.value
    });
  }

  handleTweetSentimentChange(e) {
    this.setState({
      currentTweetSentiment: e.target.value
    });
  }

  generateId(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  onCreatePinnedTweet(){
    console.log("Creating new pinned tweet");
    let requestBody = {
      content: this.state.currentTweetContent,
      sentiment: this.state.currentTweetSentiment,
    };

     axios({
       method: 'post',
       url: '/api/pinned-tweets',
       data: requestBody
     });
  }

  onEditPinnedTweet(id){

  }

  onDeletePinnedTweet(id){

  }

  render () {
    return(
      <div className = "social-media-container">

        <div className = "social-media-title">
          <div>Social Media</div>
        </div>

        <div className = "social-media-content"
          onMouseOver = {()=>this.props.updateHighlight('SOCIAL_MEDIA')}
          style ={ this.props.isHighlighted ? {opacity: 1} : {opacity: 0.5}}>

          <div className = "social-media-content-container">
            <div className = "social-media-filters">
              <div className = "label-control-header">
                <div className = "corner-label">FILTERS</div>
                <button className = "add-new-button">+</button>
              </div>
            </div>

            <div className = "social-media-pinned-tweets">
              <div className = "label-control-header">
                <div className = "corner-label">PINNED TWEETS</div>
              </div>
              <div className = "new-pinned-tweet-entry">
                <input className = "pinned-tweet-input" onChange = {this.handleTweetContentChange} placeholder = "content"></input>
                <input className = "pinned-tweet-input" onChange = {this.handleTweetSentimentChange} placeholder = "sentiment"></input>
                <button className = "new-pinned-tweet-submit" onClick = {this.onCreatePinnedTweet}>enter</button>
              </div>

              <div className = "pinned-tweets-content">
                //here will populate a list from the redux store
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default SocialMedia;
