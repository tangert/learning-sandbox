import React, { PropTypes } from 'react'
import './SocialMedia.css'

class SocialMedia extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  handleClick(e) {
    this.setState({open: !this.state.open});
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
          <div className = "social-media-filters">
            <div className = "label-control-header">
              <div className = "corner-label">FILTERS</div>
              <button className = "add-new-button">+</button>
            </div>
          </div>

          <div className = "social-media-pinned-tweets">
            <div className = "label-control-header">
              <div className = "corner-label">PINNED TWEETS</div>
              <button className = "add-new-button"
                href="#"
                ref="target"
                onClick={this.handleClick.bind(this)}
                >+</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default SocialMedia;
