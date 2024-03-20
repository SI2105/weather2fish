import React from 'react';
import './assets/css/Weekly.css';

// This component renders the weekly weather data. API is fetched in App.js and passed down here as a prop whenever the user searches for a city.
export default function Weekly({ weeklyData }) {
  // Calculate to return the fish activity for a given day based on its temperature
  const calculateFishActivity = (day) => {
    const temperature = Math.round(day.temp.day);
    const windSpeed = day.wind_speed;
    const humidity = day.humidity;
    const weatherCondition = day.weather[0].main;
    let fishActivity;

    if (temperature >= 20) {
      fishActivity = "High";
    } else if (temperature >= 10 && temperature < 20) {
      fishActivity = "Medium";
    } else {
      fishActivity = "Low";
    }
    if (windSpeed > 5) {
      fishActivity = "Low";
    }
    if (humidity > 70) {
      fishActivity = "Low";
    }
    if (weatherCondition === "Rain" || weatherCondition === "Thunderstorm") {
      fishActivity = "Low";
    }
    return <p className="daily-fish-activity">Fish Activity: <b className={`${fishActivity.toLowerCase()}-activity`}>{fishActivity}</b></p>;
  }

  // Responsible for rendering a single day
  const getDailyWeather = (day) => {
    // Formats and organizes the date data returned by the API call into variables to use later
    const date = new Date(day.dt * 1000);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    // Gets the weather icon for that day
    const weatherIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

    return (
      <div className="daily-weather" key={day.dt}>
        <div className="flex-item daily-date">
          <h2>{`${dayOfWeek}`.toUpperCase()}</h2>
          <p>{`${dayOfMonth}/${month}`}</p>
        </div>
        <img src={weatherIcon} alt={day.weather[0].description} />
        <b className="flex-item daily-avg-temperature">{Math.round(day.temp.day)}°C</b>
        <p className="flex-item daily-high">High: {Math.round(day.temp.max)}°C</p>
        <p className="flex-item daily-small">Low: {Math.round(day.temp.min)}°C</p>
        {calculateFishActivity(day)}
      </div>
    );
  };

  // Loops through all days specified by the API call (if it exists) and renders them by calling getDailyWeather() for each day
  return (
    <>
      {weeklyData ? (
        <div className="weekly-container">
          <h2 className="weekly-header">Weekly Forecast</h2>
          <div className="weekly-data">
            {weeklyData ? (
              weeklyData.map((day) => {
                return getDailyWeather(day);
              })
            ) : (
              <p>Loading weekly weather forecasts...</p>
            )}
          </div>
        </div>
    ) : (
      <p>Loading weekly weather data</p>
    )}
  </>
  );
}
