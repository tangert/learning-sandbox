import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
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
          // type: 'spline',
          backgroundColor: "transparent",
          borderColor: "#111111",
          renderTo: 'chart',
        },
        colors: ["rgb(255, 97, 76)"],
        credits: false,
        xAxis: {
            labels: {
                align: 'center',
                style: {
                    color: '#999',
                    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                    fontSize: '16px'
                },
                y: 30,
            },
            lineColor: 'rgba(255,255,255,0.2)',
            minRange: 10 * 1000,
            tickLength: 20,
            tickInterval: 10000,
            type: 'datetime',
        },
        yAxis: {
            gridLineWidth: 0,
            labels: {
                style: {
                    color: '#999',
                    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                    fontSize: '16px',
                },
                x: -15,
                y: 5
            },
            lineColor: 'rgba(255,255,255,0.2)',
            lineWidth: 1,
            min: 0,
            max: 100,
            tickColor: '#757575',
            tickLength: 10,
            tickWidth: 1,
            title: {
                text: null
            }
        },
        series: [{
            name: 'BAO Stock Data',
        },
        {
            name: 'BAO Twitter Sentiment',
        }]
      }
    }
  }
  componentDidMount() {
    console.log(this.props.graph_data);
    var chart = this.refs.chart.getChart();
    const data = this.props.graph_data;

    setInterval(function(){
      console.log(this.props.graph_data);
      const data = this.props.graph_data;
      const last = data.length-1;

      const x = data[last].timeStamp;
      const y =  data[last].point;

      const shiftFlag =  chart.series[0].data.length > 10;
      const point = [x,y];
      chart.series[0].addPoint(point, false, shiftFlag);

      //this allows the x axis to move
      chart.xAxis[0].setExtremes(x - 10000, x, false);
      chart.redraw();
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
