import React, { Component } from 'react';
import './GraphSection.css';
import GraphHeader from './../../Presentational/Graph/GraphHeader/GraphHeader';
import StockGraph from './../../Presentational/Graph/StockGraph/StockGraph';

class GraphSection extends Component {

  componentDidMount() {
  }

  render(){
    return(
      <div className = "Graph-Section">

        <GraphHeader/>
        <div className = "graph-wrapper">
          <StockGraph width = {400} height = {400}/>
        </div>

        <div className= "More-Viz">
        </div>

      </div>
    )
  }
}

export default GraphSection;
