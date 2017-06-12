import React, { Component } from 'react';
import './StockGraph.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  makeWidthFlexible,
  LineSeries,
  LineMarkSeries,
  VerticalBarSeries,
  DiscreteColorLegend,
  Crosshair
} from 'react-vis';

class StockGraph extends Component {
  render(){
    return(
      <div className="Stock-Graph">
        <XYPlot
        width={500}
        height={300}>
        <HorizontalGridLines strokeStyle="dashed"/>
          <LineMarkSeries
            color="white"
            opacity="0.2"
            fill="none"
            strokeStyle="solid"
            data={[
              {x: 1, y: 10},
              {x: 2, y: 5},
              {x: 3, y: 15},
              {x: 4, y: 20},
              {x: 5, y: 22},
            ]}
          />
        <XAxis />
        <YAxis />
      </XYPlot>
      </div>
    )
  }
}

export default StockGraph;
