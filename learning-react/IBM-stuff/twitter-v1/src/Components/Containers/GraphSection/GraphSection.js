import React, { Component } from 'react';
import './GraphSection.css';
import GraphHeader from './../../Presentational/Graph/GraphHeader/GraphHeader';
import StockGraph from './../../Presentational/Graph/StockGraph/StockGraph';

class GraphSection extends Component {
  render(){
    return(
      <div className = "Graph-Section">
        <div className = "Graph-Wrapper">
          <GraphHeader/>
          <StockGraph/>
        </div>

        <div className= "More-Viz">
        </div>

      </div>
    )
  }
}

export default GraphSection;
