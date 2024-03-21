import React, { useState, useEffect } from 'react';
import './assets/css/WeatherAlerts.css';
import axios from 'axios';
import { ALERT_API_KEY } from './config'; //Import API key from config file

const WeatherAlerts = ({ lat, lon }) => {
  const [alerts, setAlerts] = useState([]); // State to store weather alerts
  const [loading, setLoading] = useState(true); //State to track loading state

  useEffect(() => {
    //Function to fetch weather alerts data
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching new data
      try {
        //try and fetch data using api key along with the lat and lon of the location the user searched.
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${getCurrentDate()}/${getCurrentDate()}?key=${ALERT_API_KEY}`);
        const data = response.data;

        //Checks if there are any alerts within the response
        if (data.alerts && data.alerts.length > 0) {
          setAlerts(data.alerts); // If alerts found sets the alerts
        } else {
          setAlerts([]); 
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchData(); // Call fetchData function when component mounts or when lat or lon change
  }, [lat, lon]); // Fetch data whenever lat or lon change

  //Function to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };

  return (
    <div className='alerts'>
      <h2>Weather Warnings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div >
          {/* Returns alerts if any are found*/}
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div className='single_alert' key={index}>
                <p className='point'><strong>!</strong></p>
                <p>{alert.event}: {alert.description}</p>
              </div>
            ))
          ) : (
            <p>No weather alerts for today.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherAlerts;
