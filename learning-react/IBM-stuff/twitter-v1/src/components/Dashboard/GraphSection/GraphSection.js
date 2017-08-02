import React, { Component } from 'react';
import Overdrive from 'react-overdrive';
import GraphHeader from './GraphHeader/GraphHeader';
import StockGraph from './Graph/StockGraph';
import SentGraph from './Graph/SentGraph';
import MarketListItem from './MarketListItem/MarketListItem';
import './GraphSection.css';

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
      if(this.props.isReceivingData) {
        try{
              const last = this.props.graph_data.length-1;
              const currentPoint = this.props.graph_data[last].stock;
              const priceDelta = currentPoint - this.props.graph_data[last-1].stock;
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
      }
      }.bind(this),1500);
  }

  render(){
    const points = this.props.graph_data.map((datum) => {
      return datum.stock;
    });

    return(
      <div className = "Graph-Section">
        <GraphHeader
            currentStock = {this.state.currentStock}
            priceDelta = {this.state.priceDelta}
            percentDelta = {this.state.percentDelta}
        />

        <div className = "graph-wrapper">
          <StockGraph className= "stock-graph"
            graph_data = {this.props.graph_data}
            tweet_data = {this.props.tweet_data}
            isReceivingData = {this.props.isReceivingData}
            last_request_body = {this.props.last_request_body}
            />
        </div>

        <div className= "market-info">
            <MarketListItem type = 'OPEN' data = {points} title = 'Open'/>
            <MarketListItem type = 'HIGH' data = {points} title = 'High'/>
            <MarketListItem type = 'LOW' data = {points} title = 'Low'/>
            <MarketListItem type = 'MKT_CAP' data = {points} title = 'Mkt Cap'/>
            <MarketListItem type = 'PE_RATIO' data = {points} title = 'P/E Ratio'/>
            <MarketListItem type = 'DIV_YIELD' data = {points} title = 'Div Yield'/>
        </div>

        <div className = "under-graph">
          <div className = "under-graph-viz">
            <div className = "sent-graph-wrapper">
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default GraphSection;
