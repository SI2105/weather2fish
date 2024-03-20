import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function TrackerBarChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data.length === 0) return; // Don't render the chart if there's no data

    const ctx = chartRef.current.getContext('2d');

    // Calculate total fish count for each unique name
    const nameCounts = {};
    data.forEach(item => {
      if (nameCounts[item.name]) {
        nameCounts[item.name] += parseInt(item.fishCount);
      } else {
        nameCounts[item.name] = parseInt(item.fishCount);
      }
    });

    // Extract unique names and corresponding total fish counts
    const uniqueNames = Object.keys(nameCounts);
    const fishCounts = uniqueNames.map(name => nameCounts[name]);

    // Create the bar chart
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: uniqueNames,
        datasets: [{
          label: 'Total Fish Count',
          data: fishCounts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color with opacity
          borderColor: 'rgba(54, 162, 235, 1)', // Blue color
          borderWidth: 1
        }]
      },
      options: {
        layout: {
          padding: {
            left: 20, // Adjust the padding as needed
            right: 20, // Adjust the padding as needed
            top: 20, // Adjust the padding as needed
            bottom: 20 // Adjust the padding as needed
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Fish Count',
              color: 'white' // Set the title color to white
            },
            ticks: {
              color: 'white' // Set the ticks color to white
            }
          },
          x: {
            title: {
              display: true,
              text: 'Fish Name',
              color: 'white' // Set the title color to white
            },
            ticks: {
              color: 'white' // Set the ticks color to white
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white' // Set the legend label color to white
            }
          }
        }
      }
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]); // Re-render the chart whenever the data changes

  return (
    <div style={{ border: '2px solid white', padding: '10px', maxWidth: '1200px', margin: '25px auto', marginTop: '50px' }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default TrackerBarChart;
