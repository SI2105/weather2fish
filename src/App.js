import { useState, useEffect, useCallback } from 'react';
import './assets/App.css';
import Header from './Header';
import Overview from './Overview';
import Hourly from './Hourly';
import Weekly from './Weekly';
import Map from './Map';

import { API_KEY } from './config';
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const fetchData = useCallback(async () =>{
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}` //Replace API_KEY with your API KEY
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json()
      setWeatherData(data);     
    }
    catch(error){
      console.error(error);

    }
  }, [city])

  // Fetches weekly weather data from OpenWeather API and updates the state of weeklyData
  const fetchWeeklyData = useCallback(async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeeklyData(data.list);
    } catch (error) {
      console.error(error);
    }
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    fetchData();
    fetchWeeklyData();
  };
  
  return (
    <div className='App'>
    <Header city={city} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
    <Overview weatherData={weatherData} city={city} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
    <Hourly/>
    <Weekly weeklyData={weeklyData}/>
    <Map weatherData={weatherData}/>
    </div>
    
  );
}

export default App;
