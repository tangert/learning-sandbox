import React, { PropTypes } from 'react'
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import './CustomRange.css'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);
const Handle = Slider.Handle;

const flux_marks = {
  0: 'Flat',
  25: "25%",
  50: '50%',
  75: "75%",
  100: 'Max flux'
};

const time_marks = {
  0: '5s',
  25: '15s',
  50: '30s',
  75: '45s',
  100: '1m'
}

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

class CustomRange extends React.Component {
  constructor(props){
    super(props);
    this.formatTime = this.formatTime.bind(this);
  }

  formatTime(time) {
    if(time > 45) {
      return Math.floor(this.props.timeValue/60) + "m";
    } else {
      return this.props.timeValue + "s";
    }
  }

  render () {
    return(
      <div className = "slider-container">
        <div className = "label">
          <h1 className="main-value">{this.props.title}: <span className = "val-detail">{this.props.value}</span></h1>
            <div className ="flux">
              <div className = "flux-title">Flux: </div>
              <Slider className = "slider" min={0} marks={flux_marks} step={10} onChange={this.props.onFluxChange} defaultValue={0} />
            </div>
        </div>

        <Range
          className = "range stock"
          min={0}
          step={1}
          max={100}
          defaultValue={0}
          value={this.props.value}
          onChange={this.props.onValueChange}
          onAfterChange={this.props.onRangeChange}
          trackStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 10 }}
          railStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 10 }}
          handleStyle={[{ backgroundColor: 'rgba(255,255,255,0.9)', width: 20, height: 20 }]}
          tipFormatter={value => `${value}%`}
        />

        <div className = "range-time-container">
          <div className = "time-release-label">Release: {this.formatTime(this.props.timeValue)}</div>
            <Slider className = "slider" min={0} marks={time_marks} step={25} onChange={this.props.onTimeChange} defaultValue={0} />
        </div>
      </div>
    );
  }
}

export default CustomRange;
