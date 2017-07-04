import React, { Component } from 'react';
import './GraphSection.css';
import GraphHeader from './../../presentational/Graph/GraphHeader/GraphHeader';
import Graph from './../../presentational/Graph/Graph/Graph';

class GraphSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentStock: 0,
      priceDelta: 0,
      percentDelta: 0,
      low: 0,
      high: 0
    }
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

    const points = this.props.graph_data.map((datum) => {
      return datum.point;
    });

    return(
      <div className = "Graph-Section">
        <GraphHeader
            currentStock = {this.state.currentStock}
            priceDelta = {this.state.priceDelta}
            percentDelta = {this.state.percentDelta}
        />
        <div className = "graph-wrapper">
          <Graph className= "stock-graph"
            graph_data = {this.props.graph_data}
            tweet_data = {this.props.tweet_data}
            isReceivingData = {this.props.isReceivingData}/>
        </div>

        <div className= "market-info">
              <div className = "market-list-item">
                        Open:
                        <span className = "stock-detail-val">
                          { points.length > 0 ? points[0] : 0 }
                        </span>
              </div>

              <div className = "market-list-item">
                        High:
                        <span className = "stock-detail-val">
                          { Math.max(...points) }
                        </span>
              </div>

              <div className = "market-list-item">
                        Low:
                        <span className = "stock-detail-val">
                          { Math.min(...points) }
                        </span>
              </div>

              <div className = "market-list-item">
                        Mkt Cap:
                        <span className = "stock-detail-val">
                        { points.length > 0 ? points[points.length-1] * 1500000 : 2000000 }
                        </span>
              </div>

              <div className = "market-list-item">
                        P/E Ratio:
                        <span className = "stock-detail-val">
                        { points.length > 0 ? (points[points.length-1] / 2.00).toFixed(2) : 0 }
                      </span>
              </div>

              <div className = "market-list-item">
                        Div Yield:
                        <span className = "stock-detail-val">
                          { points.length > 0 ? ((2.00 / points[points.length-1])*100).toFixed(2) : 0 }
                          %
                        </span>
              </div>
        </div>
      </div>
    )
  }
}

GraphSection.defaultProps = {
  graph_data: [{point: 23, timeStamp: Date()}],
};

export default GraphSection;
