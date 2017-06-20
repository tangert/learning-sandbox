import React, { Component } from 'react';
import './GraphHeader.css';

/*
<div className = "detail current-stock">{this.props.currentStock}</div>
<div className = "detail separator">|</div>
<div className = "detail price-delta">{this.props.priceDelta}</div>
<div className = "detail percent-delta">{this.props.percentDelta}%</div>
*/

class GraphHeader extends Component {
  render(){
    return(
      <div className="Graph-Header">
        <div className="top">
          <h1 className="stock-title">BAO
            <span className="title-detail"> Live Feed</span>
          </h1>
          <p className="current-time">11:02:31 AM</p>
        </div>

        <div className="bottom">
          <div className = "detail current-stock">16.32</div>
          <div className = "detail separator">|</div>
          <div className = "detail price-delta">133.68</div>
          <div className = "detail percent-delta">89.91%</div>
        </div>
      </div>
    )
  }
}

export default GraphHeader;
