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
        tooltip: {
          shared: true,
          crosshairs: true
        },
        chart: {
          backgroundColor: "transparent",
          borderColor: "#111111",
          renderTo: 'chart',
        },
        credits: false,
        xAxis: {
            labels: {
                align: 'center',
                style: {
                    color: 'rgba(255,255,255,0.2)',
                    fontSize: '14px'
                },
                y: 30,
            },
            lineColor: 'rgba(255,255,255,0.2)',
            minRange: 10 * 2000,
            tickLength: 10,
            tickInterval: 10000,
            type: 'datetime',
        },

        yAxis: {
            gridLineColor: "rgba(255,255,255,0.2)",
            gridLineDashStyle: "longdash",
            gridLineWidth: 1,
            labels: {
                style: {
                    color: 'rgba(255,255,255,0.7)',
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
            animation: false,
            zIndex: 2,
            lineWidth: 5
        }],
        responsive: {
            rules: [{
                condition: {
                    minWidth: 800
                },
                chartOptions: {
                    subtitle: {
                        text: null
                    },
                    navigator: {
                        enabled: false
                    }
                }
            }]
        }
      }
    }
  }
  componentDidMount() {
      var chart = this.refs.chart.getChart();
      var shiftFlagStock;

      // setTimeout(function(){
      //   if(this.props.isReceivingData){
      //     for(var i = 0; i < this.props.graph_data.length; i++) {
      //       console.log("ADDING", this.props.graph_data.length);
      //       shiftFlagStock = chart.series[0].data.length > 75;
      //       let x = this.props.graph_data[i].time;
      //       let y = this.props.graph_data[i].stock;
      //       let stock_point = [x,y];
      //       chart.series[0].addPoint(stock_point, false, shiftFlagStock);
      //     }
      //   }
      // }.bind(this),1000);

      setInterval(function(){
        try {
            if(this.props.isReceivingData) {
              const graph_data = this.props.graph_data;
              const last_graph_point = graph_data.length-1;
              const stock_x = graph_data[last_graph_point].time;
              const stock_y =  graph_data[last_graph_point].stock;

              const timeFlag = this.props.graph_data[last_graph_point].time - this.props.graph_data[last_graph_point-1].time;
              const shiftFlagStock =  chart.series[0].data.length > 100;

              const stock_point = [stock_x,stock_y];
              const stockColor = this.props.graph_data[last_graph_point].stock < 50 ? "rgb(255, 97, 76)" : "rgb(137, 182, 255)";

              //Object options, (bool) Redraw, (bool) Shift
              chart.series[0].addPoint(stock_point, false, shiftFlagStock);
              chart.series[0].color = stockColor;
              chart.series[0].options.color = stockColor;
              chart.series[0].update(chart.series[0].options);
          }
        }  catch(e) {
          console.log(e);
          console.log("Wait for your fucking data");
        }
      }.bind(this), this.props.isReceivingData ? this.props.last_request_body.stockTimeRelease * 60 * 1000 : 1000);
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
