import React, { Component } from 'react';
import AnimatedNumber from 'react-animated-number';
import './GraphHeader.css';

class Clock extends React.Component {
  constructor(props){
    super(props);
    const initialTime = new Date().toLocaleTimeString();
    this.state = {
      time: initialTime
    }
  }

  componentDidMount(){
    setInterval(function(){
      const newTime = new Date().toLocaleTimeString();
      this.setState({time: newTime});
    }.bind(this), 1000);
  }

  render() {
    return (
      <div className="current-time">
        {this.state.time}
      </div>
    );
  }
}

class GraphHeader extends Component {
  render(){
    return(
      <div className="Graph-Header">
        <div className="top">
          <h1 className="stock-title">BAO
            <span className="title-detail"> Live Feed</span>
          </h1>
          <Clock/>
        </div>

        <div className="bottom">
            <div className = "detail current-stock">
                <AnimatedNumber
                  component="text"
                  value={this.props.currentStock}
                  stepPrecision={0}
                  duration={300}
                  />
            </div>

            <div className = "detail separator">|</div>

            <div className = "detail price-delta">
              <AnimatedNumber
                component="text"
                value={this.props.priceDelta}
                stepPrecision={0}
                duration={300}
                />
            </div>

            <div className = "detail percent-delta">
              <AnimatedNumber
                component="text"
                value={this.props.percentDelta}
                stepPrecision={0}
                duration={300}
                />%
            </div>
        </div>
      </div>
    )
  }
}

export default GraphHeader;
