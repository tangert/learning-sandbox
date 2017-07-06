import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const mock_data = {
  "left": [
    {
      "event": "Phishing email",
      "description": "We gonna do it."
    },
    {
      "event": "Packet stuff",
      "description": "Oh no."
    },
    {
      "event": "Call FBI",
      "description": "We gonna do it."
    },
    {
      "event": "Call FBI",
      "description": "We gonna do it."
    }
  ],

  "right": [
    {
      "event": "WOOOOOOO",
      "description": "We gonna do it."
    },
    {
      "event": "HEY HEY HEY",
      "description": "Oh no."
    },
    {
      "event": "Call FBI",
      "description": "We gonna do it."
    },
    {
      "event": "Call FBI",
      "description": "We gonna do it."
    }
  ]
};

class Node extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = "node">
        <div className = "event">{this.props.event}</div>
        <div className = "description">{this.props.description}</div>
      </div>
    );
  }
}

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.renderNodes = this.renderNodes.bind(this);
  }

  renderNodes(side) {
    let data;
    switch(side){
      case "right":
        data = mock_data.right;
        break;
      case "left":
        data = mock_data.left;
        break;
      default:
      console.log("need data");
    };

    console.log(data);
    console.log("DATA ABOUT TO RENDER: " + data.length);

    return data.map((data) => {
      return <Node event = {data.event} description = {data.description} />
    });
  }

  render(){
    return(
      <div className = "timeline">
        <div className = "timeline-background"></div>
        <div className = "node-container">
          <div className = "left"> { this.renderNodes("left") } </div>
          <div className = "boom"> BOOM </div>
          <div className = "right"> { this.renderNodes("right") } </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
  }

  componenetDidMount(){
    console.log("mounted");
  }

  render() {
    return (
      <div className="App">
        <div className = "header">Oxbow Challenge</div>
        <Timeline/>
      </div>
    );
  }
}

export default App;
