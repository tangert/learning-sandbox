import React, { Component } from 'react';
import './GraphSection.css';
import GraphHeader from './../../Presentational/Graph/GraphHeader/GraphHeader';
import Graph from './../../Presentational/Graph/Graph/Graph';

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
        try{
              const last = this.props.graph_data.length-1;
              const currentPoint = this.props.graph_data[last].point;
              const priceDelta = currentPoint - this.props.graph_data[last-1].point;
              const percentDelta = priceDelta/currentPoint;
              this.setState({
                currentStock: currentPoint,
                priceDelta: priceDelta,
                percentDelta: percentDelta
              });
            }
        catch(e){
            if(e){
              console.log(e);
              console.log("You need to wait for your data bro.");
            }
        }
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
          <Graph className= "stock-graph" graph_data = {this.props.graph_data} tweet_data = {this.props.tweet_data}/>
        </div>

        <div className= "market-info">
          <div className = "market left">
            <ul>
            <li>Open</li>
            <li>High</li>
            <li>Low</li>
            </ul>
          </div>
          <div className = "market right">
            <ul>
            <li>Mkt Cap</li>
            <li>P/E Ratio</li>
            <li>Div Yield</li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

GraphSection.defaultProps = {
  //placeholder
  graph_data: [{point: 23, timeStamp: Date()}],
};

export default GraphSection;
