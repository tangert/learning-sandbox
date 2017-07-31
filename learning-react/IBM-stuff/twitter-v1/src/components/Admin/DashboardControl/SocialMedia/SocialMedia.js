import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import FlipMove from 'react-flip-move'
import PinnedTweet from './PinnedTweet/PinnedTweet'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import './SocialMedia.css'

const socket = io("http://localhost:3001");

class SocialMedia extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTweetContent: "",
      currentTweetSentiment: 0,
      tags: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);

    this.onCreatePinnedTweet = this.onCreatePinnedTweet.bind(this);
    this.onEditPinnedTweet = this.onEditPinnedTweet.bind(this);
    this.onDeletePinnedTweet = this.onDeletePinnedTweet.bind(this);

    this.handleTweetContentChange = this.handleTweetContentChange.bind(this);
    this.handleTweetSentimentChange = this.handleTweetSentimentChange.bind(this);
  }

  handleChange(tags) {
    console.log(tags);
    //this is where you send all of the current tags to the redux store.
    socket.emit('filter-change', tags);
    this.setState({tags})
  }

  clearAllFilters(){
    this.handleChange([]);
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
    let new_tweet = {
      content: this.state.currentTweetContent,
      sentiment: this.state.currentTweetSentiment,
    };

    socket.emit('pinned-tweet-create', new_tweet);
  }

  onEditPinnedTweet(payload){

  }

  onDeletePinnedTweet(id){
    socket.emit('pinned-tweet-delete', id);
  }

  renderPinnedTweets(){
    return this.props.pinned_tweets.map( (data) => {
      return (
          <PinnedTweet
            onDeletePinnedTweet = {this.onDeletePinnedTweet}
            id = {data.id}
            key= {data.id}
            handle= {data.handle}
            time= {data.time}
            image = {data.image}
            content={data.content}
            sentiment={data.sentiment}
            color = {data.color.cssColor}>
          </PinnedTweet>
        );
    });
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
                <button onClick = {this.clearAllFilters} className = "clear-all-button">CLEAR</button>
              </div>

              <TagsInput
                value={this.props.filters}
                onChange={this.handleChange}
                inputProps = {{className: 'react-tagsinput-input',
  placeholder: 'Add a filter' }}
                />
            </div>

            <div className = "social-media-pinned-tweets">
              <div className = "label-control-header">
                <div className = "corner-label">PINNED TWEETS</div>
                <button className = "clear-all-button">CLEAR</button>
              </div>
              <div className = "new-pinned-tweet-entry">
                <input className = "pinned-tweet-input" onChange = {this.handleTweetContentChange} placeholder = "content"></input>
                <input className = "pinned-tweet-input" onChange = {this.handleTweetSentimentChange} placeholder = "sentiment"></input>
                <button className = "new-pinned-tweet-submit" onClick = {this.onCreatePinnedTweet}>enter</button>
              </div>

              <div className = "pinned-tweets-content">
                <FlipMove duration={750} easing="ease-in-out" style={{overflow: 'auto', maxHeight: 800}}>
                  {this.renderPinnedTweets()}
                </FlipMove>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default SocialMedia;
