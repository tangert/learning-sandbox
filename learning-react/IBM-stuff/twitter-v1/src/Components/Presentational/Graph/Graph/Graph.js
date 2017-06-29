import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import './Graph.css';

class Graph extends Component {
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
                    color: 'rgba(255,255,255,0.2)',
                    fontSize: '14px',
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
            dashStyle: "dot",
            type: "spline",
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
      setInterval(function(){
        try {
          //Stock data
          const graph_data = this.props.graph_data;
          const last_graph_point = graph_data.length-1;
          const stock_x = graph_data[last_graph_point].timeStamp;
          const stock_y =  graph_data[last_graph_point].point;

          //Tweet data
          const tweet_data = this.props.tweet_data;
          const tweet_x = tweet_data[0].time;
          const tweet_y = tweet_data[0].sentiment;

          const shiftFlagStock =  chart.series[0].data.length > 50;
          const shiftFlagTweet =  chart.series[1].data.length > 50;

          const stock_point = [stock_x,stock_y];
          const tweet_point = [tweet_x,tweet_y];

          const tweetColor = this.props.tweet_data[0].sentiment < 50 ? "rgb(255, 97, 76)" : "rgb(137, 182, 255)";
          const stockColor = this.props.graph_data[last_graph_point].point < 50 ? "rgb(255, 97, 76)" : "rgb(137, 182, 255)";

          //Object options, (bool) Redraw, (bool) Shift
          chart.series[0].addPoint(stock_point, false, shiftFlagStock);
          chart.series[0].color = stockColor;

          chart.series[1].addPoint(tweet_point, false, shiftFlagTweet);
          chart.series[1].color = tweetColor;

          chart.redraw();
        }  catch(e) {
          console.log(e);
          console.log("Wait for your fucking data");
        }
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

export default Graph;
