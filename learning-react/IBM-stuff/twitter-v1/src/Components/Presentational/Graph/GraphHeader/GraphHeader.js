import React, { Component } from 'react';
import './GraphHeader.css';

class GraphHeader extends Component {
  render(){
    return(
      <div className="Graph-Header">
        <h1 className="title">BAO <span className="Title-Detail">Live Feed</span></h1>
        <p className="Current-Time">11:02:31 AM</p>
      </div>
    )
  }
}

export default GraphHeader;
