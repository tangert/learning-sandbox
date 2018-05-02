import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import './StockGraph.css';

import io from 'socket.io-client'
const socket = io("http://localhost:3001");
const blue = "rgb(137, 182, 255)";
const red = "rgb(255, 97, 76)";

class StockGraph extends Component {
  constructor(props){
    super(props);
    this.state = {
      config: {
        rangeSelector: {
          selected: 1
        },
        global: {
            useUTC: false
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
          height: "55%",
          borderColor: "#111111",
          renderTo: 'chart',
          style: {
            fontFamily: 'Maven Pro'
          }
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
            tickLength: null,
            tickInterval: null,
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
            lineWidth: 7.5,
            pointInterval: 25000,
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
    };
    this.createInterval = this.createInterval.bind(this);
  }

  createInterval(interval, time, chart) {
    return
  }

  componentDidMount() {
      var chart = this.refs.chart.getChart();
      var shiftFlagStock;
      var interval;
      let stockColor;

      setTimeout(function(){
        interval = setInterval(function(){
            try {
              if(this.props.isReceivingData) {
                console.log("CURRENT DATA LENGTH: ", chart.series[0].data.length);
                console.log("PERCENT DELTA ", this.props.percent_delta);
                const graph_data = this.props.graph_data;
                const last_graph_point = graph_data.length-1;
                const stock_x = graph_data[last_graph_point].time;
                const stock_y =  graph_data[last_graph_point].stock;

                const shiftFlagStock =  chart.series[0].data.length > 250;
                const stock_point = [stock_x,stock_y];
                this.props.percent_delta < 0 ? stockColor = red : stockColor = blue;

                //Object options, (bool) Redraw, (bool) Shift
                chart.series[0].addPoint(stock_point, false, shiftFlagStock);
                chart.series[0].color = stockColor;
                chart.series[0].options.color = stockColor;
                chart.series[0].pointInterval = this.props.isReceivingData ? this.props.last_request_body.stockTimeRelease * 1000 : 1000; // one day
                chart.series[0].update(chart.series[0].options);
              }
          } catch(e) {}
        }.bind(this), this.props.isReceivingData ? this.props.last_request_body.stockTimeRelease * 1000 : 1000);
      }.bind(this), 2000);

      //listen for changes to traffic generation to update the graph
      socket.on('quick-update-graph', function(data){
        if(this.props.isReceivingData) {
          console.log("CURRENT DATA LENGTH: ", chart.series[0].data.length);
          const graph_data = this.props.graph_data;
          const last_graph_point = graph_data.length-1;
          const stock_x = graph_data[last_graph_point].time;
          const stock_y =  graph_data[last_graph_point].stock;

          const shiftFlagStock =  chart.series[0].data.length > 250;
          const stock_point = [stock_x,stock_y];
          this.props.percent_delta < 0 ? stockColor = red : stockColor = blue;
          //Object options, (bool) Redraw, (bool) Shift
          chart.series[0].addPoint(stock_point, false, shiftFlagStock);
          chart.series[0].color = stockColor;
          chart.series[0].options.color = stockColor;
          chart.series[0].pointInterval = this.props.isReceivingData ? this.props.last_request_body.stockTimeRelease * 1000 : 1000; // one day
          chart.series[0].update(chart.series[0].options);
        }
      }.bind(this));

      socket.on('update-graph', function(data){
        let time = data;
        console.log("TIME: ", time);
        clearInterval(interval);

        interval = setInterval(function(){
          try {
          if(this.props.isReceivingData) {
            console.log("CURRENT DATA LENGTH: ", chart.series[0].data.length);
            console.log("PERCENT DELTA ", this.props.percent_delta);
            const graph_data = this.props.graph_data;
            const last_graph_point = graph_data.length-1;
            const stock_x = graph_data[last_graph_point].time;
            const stock_y =  graph_data[last_graph_point].stock;

            const shiftFlagStock =  chart.series[0].data.length > 250;
            const stock_point = [stock_x,stock_y];

            this.props.percent_delta < 0 ? stockColor = red : stockColor = blue;

            //Object options, (bool) Redraw, (bool) Shift
            chart.series[0].addPoint(stock_point, false, shiftFlagStock);
            chart.series[0].color = stockColor;
            chart.series[0].options.color = stockColor;
            chart.series[0].pointInterval = this.props.isReceivingData ? this.props.last_request_body.stockTimeRelease * 1000 : 1000; // one day
            chart.series[0].update(chart.series[0].options);
          }
        } catch(e) {}
      }.bind(this),time);

      }.bind(this));
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
