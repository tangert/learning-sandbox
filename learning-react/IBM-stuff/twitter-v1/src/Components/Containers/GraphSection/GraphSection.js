import React, { Component } from 'react';
import './GraphSection.css';
import GraphHeader from './../../Presentational/Graph/GraphHeader/GraphHeader';
import StockGraph from './../../Presentational/Graph/StockGraph/StockGraph';

class GraphSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      graph_data: props.graph_data
    }
  }

  render(){
    return(
      <div className = "Graph-Section">

        <GraphHeader/>
        <div className = "graph-wrapper">
          <StockGraph data = {this.state.graph_data}/>
        </div>

        <div className= "More-Viz">
        </div>

      </div>
    )
  }
}

export default GraphSection;
