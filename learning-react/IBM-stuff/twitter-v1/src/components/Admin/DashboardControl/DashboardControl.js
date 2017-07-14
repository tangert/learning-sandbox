import React, { Component, PropTypes } from 'react'
import Presets from './Presets/Presets'
import LiveInjection from './LiveInjection/LiveInjection'
import SocialMedia from './SocialMedia/SocialMedia'
import './DashboardControl.css'

class DashboardControl extends Component {
  constructor(props){
    super(props);

    this.state = {
      social_media_highlighted: false,
      presets_highlighted: false,
      live_injection_highlighted: false
    };

    this.updateHighlight = this.updateHighlight.bind(this);
  }

  //This updates the appropriate section when hovered over.
  updateHighlight = (section) => {
    if(section == 'PRESETS') {
      if(!this.state.presets_highlighted){
        this.setState({
          presets_highlighted: true,
          live_injection_highlighted: false,
          social_media_highlighted: false
        });
      }
    } else if (section == 'LIVE_INJECTION') {
      if(!this.state.live_injection_highlighted){
        this.setState({
          live_injection_highlighted: true,
          presets_highlighted: false,
          social_media_highlighted: false
        });
      }
    } else if (section == 'SOCIAL_MEDIA') {
      if(!this.state.social_media_highlighted){
        this.setState({
          social_media_highlighted: true,
          presets_highlighted: false,
          live_injection_highlighted: false
        });
      }
    }
  }

  render () {
    return(
      <div className = "content-container">

        <SocialMedia updateHighlight = {this.updateHighlight}
                     isHighlighted = {this.state.social_media_highlighted}/>

        <Presets updateHighlight = {this.updateHighlight}
                 isHighlighted = {this.state.presets_highlighted} />

        <LiveInjection updateHighlight = {this.updateHighlight}
                       isHighlighted = {this.state.live_injection_highlighted}/>
      </div>
    );
  }
}

export default DashboardControl;
