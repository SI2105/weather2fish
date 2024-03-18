import React, { useState, useEffect } from 'react';
import './assets/WeatherAlerts.css';
import axios from 'axios';

const WeatherAlerts = ({ lat, lon }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching new data
      try {
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${getCurrentDate()}/${getCurrentDate()}?key=ZBECCYSCSMHJCDWQWD2D9YTXG`);
        const data = response.data;
        console.log("Weather warning",data);
        if (data.alerts && data.alerts.length > 0) {
          setAlerts(data.alerts);
        } else {
          setAlerts([]); // Reset alerts if no alerts are found
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon]); // Fetch data whenever lat or lon change

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
      <h2>Weather Alerts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div >
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div className='single_alert' key={index}>
                <p className='point'><strong>!</strong></p>
                <p>{alert.event}: {alert.headline}</p>
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
