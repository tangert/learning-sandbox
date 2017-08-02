import React, { PropTypes } from 'react'
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import './CustomRange.css'

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

class CustomRange extends React.Component {
  constructor(props){
    super(props);
    this.formatTime = this.formatTime.bind(this);
  }

  formatTime(time) {
    if(time < 1) {
      return this.props.timeValue*60 + "s";
    } else {
      return this.props.timeValue + "m";
    }
  }

  render () {
    return(
      <div className = "slider-container">
        <div className = "label">
          <h1 className="main-value">{this.props.title}: <span className = "val-detail">{this.props.value}</span></h1>
            <div className ="flux">
              <div className = "flux-title">Flux: </div>
              <Slider className = "slider" min={0} marks={marks} step={5} onChange={this.props.onFluxChange} defaultValue={0} />
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
              <Range
                className = "range-time"
                min={0.1}
                max={5}
                step={0.1}
                defaultValue={0.1}
                value={this.props.timeValue}
                onChange={this.props.onTimeChange}
                onAfterChange={this.props.onAfterTimeChange}
                trackStyle={{ backgroundColor: 'rgba(255,255,255,0.5)', height: 5 }}
                railStyle={{ backgroundColor: 'rgba(255,255,255,0.1)', height: 5 }}
                handleStyle={[{ backgroundColor: 'rgba(255,255,255,0.9)', width: 10, height: 10 }]}
                tipFormatter={value => `${value}m`}
              />
        </div>
      </div>
    );
  }
}

export default CustomRange;
