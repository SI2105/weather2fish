import React, { useState, useEffect, useCallback } from 'react';
import { API_KEY } from './config';
import './assets/Weekly.css';

function Weekly({weatherData, city }) {
    const [weeklyData, setWeeklyData] = useState(null);
  
    const fetchWeeklyData = useCallback(async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=5&appid=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeeklyData(data.list);
      } catch (error) {
        console.error(error);
      }
    }, [city]);
  
    useEffect(() => {
      fetchWeeklyData();
    }, [fetchWeeklyData]);

    const calculateFishActivity = (day) => {
      const activities = ["Low", "Medium", "High"];
      console.log(day.temp.day)
      let randomActivity = Math.floor(Math.random() * activities.length)
      let activity;
      if (randomActivity == 0){
        activity = <p className="daily-fish-activity">Fish Activity: <b className="red-activity">{activities[randomActivity]}</b></p>
      } else if (randomActivity == 1){
        activity = <p className="daily-fish-activity">Fish Activity: <b className="orange-activity">{activities[randomActivity]}</b></p>
      } else {
        activity = <p className="daily-fish-activity">Fish Activity: <b className="green-activity">{activities[randomActivity]}</b></p>
      }
      return (
        activity
      )
    }
  
    const getDailyWeather = (day) => {
      
      const date = new Date(day.dt * 1000);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayOfMonth = date.getDate();
      const month = date.getMonth() + 1;
      const weatherIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

      return (
        <div className="daily-weather" key={day.dt}>
          <div className="flex-item daily-date">
              <h2>{`${dayOfWeek}`.toUpperCase()}</h2>
              <p>{`${dayOfMonth}/${month}`}</p>
          </div>
          <img src={weatherIcon} alt={day.weather[0].description} />
          <b className="flex-item daily-avg-temperature">{Math.round(day.temp.day)}°C</b>
          <p className="flex-item daily-small">High: {Math.round(day.temp.max)}°C</p>
          <p className="flex-item daily-small">Low: {Math.round(day.temp.min)}°C</p>
          {calculateFishActivity()}
        </div>
      );
    };

    if (!weatherData) {
      return <p>Loading weekly weather forcasts..</p>;
    } else {
      return (
        <div className="weekly-container">
          <h2 className="weekly-header">Weekly Forcast</h2>
          <div className="weekly-data">
            {weeklyData &&
              weeklyData.map((day) => {
                return getDailyWeather(day);
            })}
          </div>
        </div>
      );
    }
}
  

export default Weekly;