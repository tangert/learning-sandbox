import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Admin.css';

const style = {
  width: 500,
  margin: 50
};

function log(value) {
  console.log(value); //eslint-disable-line
}


function percentFormatter(v) {
  return `${v} %`;
}


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }

  render(){
    return(
      <div className = "container">
          <div style={style}>
          <Slider
            defaultValue={30}
            trackStyle={{ backgroundColor: 'rgb(255, 97, 76)', height: 5 }}
            handleStyle={{
              borderColor: 'grey',
              height: 28,
              width: 28,
              marginLeft: -14,
              marginTop: -9,
              backgroundColor: 'white',
            }}
            railStyle={{ backgroundColor: 'rgb(137, 182, 255)', height: 5 }}
          />
        </div>
      </div>
    );
  }
}

export default Admin;
