import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/Hourly.css';
import arrow_icon from './assets/images/arrow_2.png';
import low_icon from './assets/images/low.png';
import medium_icon from './assets/images/medium.png';
import high_icon from './assets/images/high.png';
import { Chart } from 'chart.js/auto'; // Need to install before use -> npm install chart.js
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Need to install before use -> npm install chartjs-plugin-datalabels
import { API_KEY } from './config'; // Import API key from config file

function Hourly({ lat, lon, windowWidth }) {
  // State variables
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState('');
  const [timezoneOffset, setTimeZoneOffset] = useState(0);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!lat || lat === null) return;
    const fetchHourlyForecast = async () => { // Fetch data from OpenWeatherMap API
      try {
        const response = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        ); 

        //Calculate timezone offset as location might not be in the uk.
        const timezoneOffset = response.data.city.timezone;
        const currentTime = new Date().getTime() + timezoneOffset * 1000;

        //Filter forcast for the next 24 hours
        const filteredForcast = response.data.list.filter(
          (entry) => {
            const entryTime = entry.dt * 1000 + timezoneOffset * 1000;
            return entryTime >= currentTime && entryTime <= currentTime + 24 * 60 * 60 * 1000;
          }
        );

        //set state variables
        setHourlyForecast(filteredForcast);
        setTimeZoneOffset(timezoneOffset);

        //create graph
        renderTemperatureGraph(filteredForcast, timezoneOffset);

        setError('');
      } 
      catch (error) {
        //set error if fetching the data fails
        setError('Error fetching hourly forecast');
      }
    };


    // Destroy chart instance before fetching new forcast
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Fetch hourly forcast when lat or lon changes
    fetchHourlyForecast();

  }, [lat, lon, windowWidth]);


  // Function to get wind direction based on the degree
  const getWindDirectionClass = (degree) => {
    if ((degree >= 337.5 && degree <= 360) || (degree >= 0 && degree < 22.5)) {
      return 'north';
    } 
    else if (degree >= 22.5 && degree < 67.5) {
      return 'northeast';
    } 
    else if (degree >= 67.5 && degree < 112.5) {
      return 'east';
    } 
    else if (degree >= 112.5 && degree < 157.5) {
      return 'southeast';
    } 
    else if (degree >= 157.5 && degree < 202.5) {
      return 'south';
    } 
    else if (degree >= 202.5 && degree < 247.5) {
      return 'southwest';
    } 
    else if (degree >= 247.5 && degree < 292.5) {
      return 'west';
    } 
    else if (degree >= 292.5 && degree < 337.5) {
      return 'northwest';
    }
  };

  // Function to calculate rainfall and return corresponding icon
  const calcrainfall = (precipitation) => {
    if (precipitation < 20) {
      return <img className='rain' src={low_icon} alt="Low Precipitation" />;
    } 
    else if (precipitation >= 20 && precipitation < 60) {
      return <img className='rain' src={medium_icon} alt="Medium Precipitation" />;
    } 
    else {
      return <img className='rain' src={high_icon} alt="High Precipitation" />;
    }
  };


  // Function to create temperature graph using chart.js
  const renderTemperatureGraph = (forcast, offset) => {
    // Extracting labels for x-axis (hours) and temperature data for y-axis from forecast data
    const labels = forcast.map((hour) =>
      new Date((hour.dt + offset) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const data = forcast.map((hour) => Math.round(hour.main.temp - 273.15));
    // Finding highest and lowest temperature from the data
    const highestTemp = Math.max(...data);
    const lowestTemp = Math.min(...data);
  
    // Getting canvas context
    const ctx = document.getElementById('precipitation-chart').getContext('2d');
    let chart;

    chart = new Chart(ctx, {
      type: 'line', // Line chart type
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature',
            data: data,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,


          },
        ],
      },
      options: {
        responsive: true, // Make chart responsive
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false,
            min: lowestTemp - 1, // Set minimum value for y-axis
            max: highestTemp + 1, // Set maximum value for y-axis
            stepSize: 2,
          },

          x: {
            display: false,
            grid: {
              offset: true // Example values for dash and gap lengths
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip:{
            display: true,
            callbacks: {
              // Customize tooltip label to display temperature value
              label: function(context){
                let label = context.dataset.label || '';

                if (label){
                  label+= ': ';
                }
                if (context.parsed.y !== null){
                  label += (context.parsed.y);
                  label += '°C' // Add degree symbol for Celsius
                }
                return label;
              }
            }
          },
          datalabels: {
            // Customize data labels to display temperature value
            formatter: (value) => value + '°C',
            color: 'black',
            anchor: 'end',
            align: 'top',
          },
        },
      },
      plugins: [ChartDataLabels],

    });
  
    setChartInstance(chart);
  };

if (!lat || lat === null) {
  return <p> Enter location to view data...</p>;
}

return (

    <div className='hourly-forecast-container'>
      <h2 className='title'>24 Hour Forecast<hr></hr> </h2>
      <div className='Scroll'style={{overflowX: 'scroll', width: '100%',height: '95%'}}>
        <div className='scrollable-box' style={{background: 'white',position: 'relative'}}>


          <div className='hourly-boxes'>
            {hourlyForecast.map((hour, index) => (
              <div className='hourly-box' key={index}>
                <div className='hourly-time'>{new Date((hour.dt + timezoneOffset) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            ))}
          </div>

          <div className='graph'>
            <canvas id="precipitation-chart"></canvas>
          </div>
          
          <div className='hourly-boxes'>
            {hourlyForecast.map((hour, index) => (
              <div className='hourly-box' key={index}>
                <img className='weather-icon' src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Weather Icon" />
              </div>
            ))}
          </div>

    
          <div className='hourly-boxes'>
            {hourlyForecast.map((hour, index) => (
              <div className='hourly-box' key={index}>
                {calcrainfall(hour.pop * 100)}
                <div className='precipitation'>{Math.round(hour.pop * 100)}%</div>
              </div>
            ))}
          </div>
    
          <div className='hourly-boxes'>
            {hourlyForecast.map((hour, index) => (
              <div className='hourly-box' key={index}>
                <img className={`arrow_icon ${getWindDirectionClass(hour.wind.deg)}`} src={arrow_icon} alt="Arrow Icon" />
                <div className='wind'>Wind: {hour.wind.speed} m/s</div>
              </div>
            ))}
          </div>
    
          <div className='hourly-boxes'>
            {hourlyForecast.map((hour, index) => (
              <div className='hourly-box' key={index}>
                <div className='humidity_text'>Humidity: {hour.main.humidity}%</div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </div>
    
 
);
}

export default Hourly;
