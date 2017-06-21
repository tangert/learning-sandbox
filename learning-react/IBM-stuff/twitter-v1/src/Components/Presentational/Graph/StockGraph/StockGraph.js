import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
// import Highstock from 'react-highstock';
import './StockGraph.css';


class StockGraph extends Component {
  constructor(props){
    super(props);
    this.state = {
      config: {
        rangeSelector: {
          selected: 1
        },
        title: {
          text: ""
        },
        series: [{
          tooltip: {
            valueDecimals: 2
          }
        }],
        chart: {
          type: 'area',
          backgroundColor: "transparent",
          borderColor: "#111111",
          renderTo: 'chart',
          height: "parentHeight",
        },
        colors: ["rgb(255, 97, 76)"],
        credits: false,
        yAxis: {
          gridLineColor: "rgba(255,255,255,0.1)",
          gridLineDashStyle: "longdash",
          title: {
            enabled: false
          },
          tickAmount: 8
        },
        xAxis: {
          lineColor: "transparent",
          tickColor: "transparent",
          title: {
            enabled: false
          },
          series: [{
              name: 'BAO Stock Data',
          }]
        }
      }
    }
  }
  componentDidMount() {
    console.log(this.props.graph_data);
    var counter = 0;
    var chart = this.refs.chart.getChart();
    const data = this.props.graph_data;
    setInterval(function(){
      console.log(this.props.graph_data);
      counter+=10;
      chart.series[0].addPoint({x: counter, y: this.props.graph_data[this.props.graph_data.length-1]});
    }.bind(this),2000);
  }

  render(){
    return (
      <div id = "chartId" >
        <ReactHighcharts ref="chart" config = {this.state.config} isPureConfig="true" domProps = {{id: 'chartId'}}></ReactHighcharts>
      </div>
    );
  }
}

export default StockGraph;
