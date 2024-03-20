import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment'; // Import the Chart.js Moment.js adapter

class TrackerLineGraph extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = null;
    this.chartData = null;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.chartData = this.props.data;
      this.renderChart();
    }
  }

  renderChart() {
    const ctx = this.chartRef.current.getContext('2d');

    if (!this.chartData || this.props.data !== this.chartData) {
      this.chartData = this.props.data;

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.props.data.dates.map(date => moment(date)),
          datasets: [{
            label: 'Fish Counts',
            data: this.props.data.fishCounts,
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'black',
            borderWidth: 1
            
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day', // Adjust as needed
                tooltipFormat: 'll' // Date format for tooltips
              },
              ticks: {
                color: 'black' // Set x-axis interval labels color to white
              },
              title: {
                display: true,
                text: 'Date',
                color: 'black' // Set x-axis label color to white
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: 'black' // Set y-axis interval labels color to white
              },
              title: {
                display: true,
                text: 'Fish Caught',
                color: 'black' // Set y-axis label color to white
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'black' // Set legend label color to white
              }
            }
          }
        }
      });
    }
  }

  render() {
    return (
      <div style={{ border: '2px solid white', padding: '10px', maxWidth: '1200px', margin: '25px auto', marginTop: '50px'}}>
        <canvas ref={this.chartRef} />
      </div>
    );
  }
}

export default TrackerLineGraph;
