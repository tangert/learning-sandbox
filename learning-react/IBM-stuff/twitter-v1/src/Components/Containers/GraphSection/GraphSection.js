import React, { Component } from 'react';
import './GraphSection.css';
import GraphHeader from './../../Presentational/Graph/GraphHeader/GraphHeader';
import StockGraph from './../../Presentational/Graph/StockGraph/StockGraph';

class GraphSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentStock: 0,
      priceDelta: 0,
      percentDelta: 0
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    setInterval(function(){
      const last = this.props.graph_data.length-1;
      console.log(this.props.graph_data[last]);
      this.setState({
        currentStock: this.props.graph_data[last].point,
        priceDelta: (Math.round(Math.random()*30 * 100) / 100),
        percentDelta: (Math.round(Math.random()*30 * 100) / 100)
      });
    }.bind(this),1500);
  }

  render(){
    return(
      <div className = "Graph-Section">
        <GraphHeader
            currentStock = {this.state.currentStock}
            priceDelta = {this.state.priceDelta}
            percentDelta = {this.state.percentDelta}
        />
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
