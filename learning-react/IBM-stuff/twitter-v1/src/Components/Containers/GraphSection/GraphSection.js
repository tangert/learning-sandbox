import React, { Component } from 'react';
import './GraphSection.css';
import GraphHeader from './../../Presentational/Graph/GraphHeader/GraphHeader';
import StockGraph from './../../Presentational/Graph/StockGraph/StockGraph';

class GraphSection extends Component {

  componentDidMount(){
    setInterval(function(){
      // console.log(this.props.graph_data);
    }.bind(this),1000);
  }
  render(){
    return(
      <div className = "Graph-Section">

        <GraphHeader/>
        <div className = "graph-wrapper">
          <StockGraph graph_data = {this.props.graph_data}/>
        </div>

        <div className= "More-Viz">
        </div>

      </div>
    )
  }
}

export default GraphSection;
