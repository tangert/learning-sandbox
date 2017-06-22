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
          // type: 'areaspline',
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
          const graph_data = this.props.graph_data;
          const last_graph_point = graph_data.length-1;
          const x1 = graph_data[last_graph_point].timeStamp;
          const y1 =  graph_data[last_graph_point].point;

          const tweet_data = this.props.tweet_data;
          const x2 = tweet_data[0].time;
          const y2 = tweet_data[0].sentiment;

          const shiftFlag =  chart.series[0].data.length > 100;
          const shiftFlagTweets =  chart.series[1].data.length > 100;

          const point1 = [x1,y1];
          const point2 = [x2,y2];

          //Object options, (bool) Redraw, (bool) Shift
          chart.series[0].addPoint(point1, false, shiftFlag);
          chart.series[1].addPoint(point2, false, shiftFlagTweets);

          chart.redraw();
        } catch(e) {
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
