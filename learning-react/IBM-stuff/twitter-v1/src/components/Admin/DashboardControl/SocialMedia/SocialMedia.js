import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import ReactFileReader from 'react-file-reader'
import Papa from 'papaparse'
import FlipMove from 'react-flip-move'
import PinnedTweet from './PinnedTweet/PinnedTweet'
import TagsInput from 'react-tagsinput'

import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

import 'react-tagsinput/react-tagsinput.css'
import './SocialMedia.css'

const socket = io("http://localhost:3001");
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);
const Handle = Slider.Handle;

const marks = {
  0: 'Flat',
  50: '50%',
  100: 'Max flux'
};

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="middle"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class SocialMedia extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTweetContent: "",
      currentTweetSentiment: 0,
      tags: [],
      files: []
    };

    this.handleFiles = this.handleFiles.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);

    this.onCreatePinnedTweet = this.onCreatePinnedTweet.bind(this);
    this.onEditPinnedTweet = this.onEditPinnedTweet.bind(this);
    this.onDeletePinnedTweet = this.onDeletePinnedTweet.bind(this);
    this.onClearAllPinnedTweets = this.onClearAllPinnedTweets.bind(this);

    this.handleTweetContentChange = this.handleTweetContentChange.bind(this);
    this.handleTweetSentimentChange = this.handleTweetSentimentChange.bind(this);
  }

  handleFiles(files) {
    console.log(files);
    this.setState({
      files
    });

    if (files[0] != undefined) {
      Papa.parse(files[0], {
        download: true,
        dynamicTyping: true,
        complete: function(results, file) {
          console.log("Parsing complete:", results, file);
          axios.post('/api/upload-tweets', results.data );
        }
      });
    }
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

  handleTweetSentimentChange = (value) => {
    console.log("CHANGING");
    this.setState({
      currentTweetSentiment: value
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

    if (new_tweet.content != "" && new_tweet.sentiment != "") {
      socket.emit('pinned-tweet-create', new_tweet);
    }
  }

  onEditPinnedTweet(payload){

  }

  onDeletePinnedTweet(id){
    socket.emit('pinned-tweet-delete', id);
  }

  onClearAllPinnedTweets(){
    socket.emit('pinned-tweets-clear', {});
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

            <div className = "social-media-upload">
              <div className = "label-control-header">
                <div className = "corner-label">TWEET DATA UPLOAD</div>
                  <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className='upload-tweets-button'>UPLOAD</button>
                  </ReactFileReader>
              </div>
            </div>

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
                <button onClick = {this.onClearAllPinnedTweets} className = "clear-all-button">CLEAR</button>
              </div>
              <div className = "new-pinned-tweet-entry">
                <input className = "pinned-tweet-input" onChange = {this.handleTweetContentChange}></input>

                <div className = "pinned-tweet-sentiment-range">
                  <Range
                    className = "range stock"
                    min={5}
                    max={100}
                    defaultValue={5}
                    value={this.state.currentTweetSentiment}
                    onChange={this.handleTweetSentimentChange}
                    trackStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 10 }}
                    railStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 10 }}
                    handleStyle={[{ backgroundColor: 'rgba(255,255,255,0.9)', width: 20, height: 20 }]}
                    tipFormatter={value => `${value}%`}
                  />
                <div className = "current-tweet-sentiment">{this.state.currentTweetSentiment}</div>
                </div>

                <button className = "new-pinned-tweet-submit" onClick = {this.onCreatePinnedTweet}>SUBMIT</button>
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
