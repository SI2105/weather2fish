import logo from './logo.svg';
import { useState, useEffect, useCallback } from 'react';
import './assets/App.css';
import Header from './Header';
import Overview from './Overview';
import Hourly from './Hourly';
import Precipitation from './Precipitation';
import Wind from './Wind';
import Humidity from './Humidity';
import { API_KEY } from './config';
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const fetchData = useCallback(async () =>{
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}` //Replace API_KEY with your API KEY
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json()
      setWeatherData(data);
      console.log(data);
      
    }
    catch(error){

    }
  }, [city])

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    fetchData();
  };
  
  return (
    <>
    <Header/>
    <Overview weatherData={weatherData} city={city} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
    <Hourly/>
    <Precipitation/>
    <Wind/>
    <Humidity />
    
      </>
    
  );
}

export default App;
