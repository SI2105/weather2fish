import { useState, useEffect, useCallback } from 'react';
import './assets/App.css';
import Header from './Header';
import Overview from './Overview';
import Hourly from './Hourly';
import Weekly from './Weekly';
import Map from './Map';
import axios from 'axios';

import { API_KEY } from './config';
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [portData, setPortData] = useState(null);
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
      console.error(error);

    }
  }, [city])

  const getPorts = async (radius) => {
    const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];nwr[harbour](around:${radius},${weatherData.coord.lat},${weatherData.coord.lon});out center;`);  
    const data = response.data

    for (var i = 0; i < data.elements.length; i++){
      if(data.elements[i].center){
        data.elements[i].lat = data.elements[i].center.lat
        data.elements[i].lon = data.elements[i].center.lon
      }

    }
    setPortData(data)
  
    console.log(data)
    return data
  }

  useEffect(()=>{
    let radius = 100000
    if(weatherData){
      getPorts(radius);
    }
  }, [weatherData])

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    fetchData();
  };
  
  return (
    <div className='App'>
    <Header city={city} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
    <Overview weatherData={weatherData} city={city} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
    <Hourly/>
    <Weekly weatherData={weatherData} city={city}/>
    <Map weatherData={weatherData} portData={portData}/>
    </div>
    
  );
}

export default App;
