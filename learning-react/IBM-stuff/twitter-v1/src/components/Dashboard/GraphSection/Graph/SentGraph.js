import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import './SentGraph.css';

class SentGraph extends Component {
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
          height: "15%"
        },
        credits: false,
        xAxis: {
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
            name: 'BAO Twitter Sentiment Data',
            animation: false,
            lineWidth: 2,
            type: 'areaspline'
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
            if(this.props.isReceivingData) {
              const tweet_data = this.props.tweet_data;
              const tweet_x = tweet_data[0].time;
              const tweet_y = tweet_data[0].sentiment;

              const shiftFlagTweet =  chart.series[0].data.length > 150;
              const tweet_point = [tweet_x,tweet_y];
              const tweetStrokeColor = this.props.tweet_data[0].sentiment < 50 ? "rgb(255, 97, 76)" : "rgb(137, 182, 255)";
              const tweetPointColor = this.props.tweet_data[0].color.cssColor;

              chart.series[0].addPoint(tweet_point, false, shiftFlagTweet);
              chart.series[0].color = tweetPointColor;
              chart.series[0].options.color = tweetPointColor;
              chart.series[0].update(chart.series[0].options);
          }
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

export default SentGraph;
