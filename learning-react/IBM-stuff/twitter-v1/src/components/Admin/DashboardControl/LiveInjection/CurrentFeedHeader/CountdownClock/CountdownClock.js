import React, { Compoenent, PropTypes } from 'react'
import './CountdownClock.css'

class CountdownClock extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeLeft: 0
    };
  }

  render () {
    return(
      <div className = "countdown-clock-container">{this.state.timeLeft}</div>
    )
  }
}

export default CountdownClock;
