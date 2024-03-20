import { useState, useEffect, useCallback } from 'react';
import './assets/App.css';
import Header from './Header';
import Overview from './Overview';
import Hourly from './Hourly';
import Weekly from './Weekly';
import Map from './Map';
import WeatherAlerts from './WeatherAlerts';
import POIPage from './POIPage/POIPage';
import RainAlert from './RainAlert';
import axios from 'axios';
import { API_KEY } from './config';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  const [city, setCity] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');


  const [gradientColors, setGradientColors] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [radius, setRadius] = useState(10000);
  const [showNotification, setShowNotification] = useState(true);


  const [weatherData, setWeatherData] = useState(null);
  const [portData, setPortData] = useState(null);
  const [fishingData, setFishingData] = useState(null); 
  const [weeklyData, setWeeklyData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchData = useCallback(async () =>{
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}` //Replace API_KEY with your API KEY
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json()
      const{coord} = data;
      setLat(coord.lat);
      setLon(coord.lon);
      setWeatherData(data);  
      setShowNotification(true);
      
      const sunrise =new Date(data.sys.sunrise * 1000 + data.timezone * 1000);
      const sunset = new Date(data.sys.sunset * 1000 + data.timezone * 1000);
      const current_time = new Date(data.dt * 1000 + data.timezone * 1000);
      calculateGradientColors(data.weather[0].id.toString(),sunrise,sunset,current_time);
      
    }
    catch(error){
      console.error(error);

    }
  }, [city])

  const closeNotification = () => {
    setShowNotification(false);
  };

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
  const getFishingPoints = async (radius) => {
    const response = await axios.get(`https://overpass-api.de/api/interpreter?data=[out:json];nwr[fishing](around:${radius},${weatherData.coord.lat},${weatherData.coord.lon});out qt center;`);  
    const data = response.data

    for (var i = 0; i < data.elements.length; i++){
      if(data.elements[i].center){
        data.elements[i].lat = data.elements[i].center.lat
        data.elements[i].lon = data.elements[i].center.lon
      }

    }
    setFishingData(data)
  
    console.log(data)
    return data
  }
  useEffect(()=>{
    
    if(weatherData){
      getPorts(radius);
      getFishingPoints(radius);
    }
  }, [weatherData])

  useEffect(() => {
    fetchData(); // Fetch data for default city 'London'
    fetchWeeklyData(); // Fetch weekly data for default city 'London'
    fetchForecast(); // Fetch forecast data for default city 'London'
  }, []);



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  }, []);





  // Fetches weekly weather data from OpenWeather API and updates the state of weeklyData
  const fetchWeeklyData = useCallback(async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeeklyData(data.list);
      console.log(weeklyData)
    } catch (error) {
      console.error(error);
    }
  }, [city]);

  const fetchForecast = useCallback(async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setForecastData(data);
      console.log(data)
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
    fetchForecast();
  };

  const handleRadius = async (e) =>{
    getPorts(radius);
    getFishingPoints(radius);
  };

  const calculateGradientColors = (weatherId, sunrise, sunset, currentDateTime) => {
    let gradientStartColor, gradientMidColor, gradientEndColor;

    switch(true){ //changing background gradient based on weather conditions/sunset/sunrise
      //Checking if it has been less than and hour after sunrise
      case currentDateTime.getTime() === sunrise.getTime() || (currentDateTime.getTime() > sunrise.getTime() && currentDateTime.getTime() - sunrise.getTime() < 3600000):
        gradientStartColor = '#795cb9';
        gradientMidColor = '#d28c93';
        gradientEndColor= '#faac84';
        break;
      //checking if it has been less than an hour after sunset
      case currentDateTime.getTime() === sunset.getTime() || (currentDateTime.getTime() > sunset.getTime() && currentDateTime.getTime() - sunset.getTime() < 3600000):
        gradientStartColor = '#fbcf67';
        gradientMidColor = '#e85f24';
        gradientEndColor= '#a53533';
        break;
      // weatherid: 2=Thunderstorms 781=Tornado 771=squall 762=ash
      case weatherId.startsWith('2') || weatherId === '781' || weatherId === '771' || weatherId === '762':
        gradientStartColor = '#413b3f';
        gradientMidColor = '#6e5a56'
        gradientEndColor= '#927166';
        break;
      // 751=sand 761=dust 731=dust whirls
      case weatherId === '751' || weatherId === '761' || weatherId === '731':
        gradientStartColor = '#a9703e';
        gradientMidColor = '#c88748'
        gradientEndColor= '#d3a36a';
        break;
      // 6= snow 711=smoke
      case weatherId.startsWith('6') || weatherId === '711':
        gradientStartColor = '#878c93';
        gradientMidColor = '#a7aeb2';
        gradientEndColor= '#ebeeef';
        break;
      // 800 = clear skies
      case weatherId === '800':
        gradientStartColor = '#53a7f8';
        gradientMidColor = '#aad4f6';
        gradientEndColor= '#b9f1fc';
        break;
      // 8 = clouds
      case weatherId.startsWith('8'):
        gradientStartColor = '#6599b3';
        gradientMidColor = '#87aabf';
        gradientEndColor= '#eef5f8';
        break;
      // 721=Haze 701=Mist 741=Fog
      case weatherId === '721' || weatherId === '701'|| weatherId === '741':
        gradientStartColor = '#c4b5ce';
        gradientMidColor = '#9b81ad';
        gradientEndColor= '#9e9fbd';
        break;
      // 3=rain 5=drizzle
      case weatherId.startsWith('3')||weatherId.startsWith('5'):
        gradientStartColor = '#c4d7e6';
        gradientMidColor = '#66a5ad';
        gradientEndColor= '#274a5d';
        break;
      // Incase api call failed at getting weather id
      default:
        gradientStartColor = '#87CEEB';
        gradientMidColor = '#BDC3C7';
        gradientEndColor= '#34495E';
        break;
    }
    const gradient = `linear-gradient(to bottom, ${gradientStartColor}, ${gradientMidColor}, ${gradientEndColor})`;
    setGradientColors(gradient);

  };
  

  return (
    <BrowserRouter>
      <div className='App' style={{ height:'100%', background: gradientColors}}>
        <div className='item1'>
        <Header city={city} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <p className='notification-container'>{showNotification && (<RainAlert weatherData={forecastData} onClose={closeNotification}/>)}</p>
              <div className='item2'>
                <WeatherAlerts key={`${lat}-${lon}`} lat={lat} lon={lon} /> 
              </div>
              <div className='item3'>
                <Overview weatherData={weatherData} city={city} handleSubmit={handleSubmit} handleInputChange={handleInputChange} Gradient={gradientColors}/>
              </div>
              <div className='item4'>
                <Hourly lat={lat} lon={lon} windowWidth={windowWidth}/>
              </div>
              <div className='item5'>
                <Weekly weeklyData={weeklyData}/>
              </div>
              <div className='item6'>
                <Map weatherData={weatherData} portData={portData} fishingData={fishingData} radius={radius}/>
            </div>
            </>
          }/>

          <Route path='/catch-tracker' element={
            <Map weatherData={weatherData} portData={portData} city={city}/>}
          />

          <Route path='/poiMap' element={
            <div className='item8'>
              <POIPage weatherData={weatherData} portData={portData} fishingData={fishingData} radius={radius} setRadius={setRadius} handleRadius={handleRadius}/>
            </div>

          }/>

        </Routes>


      </div>
    </BrowserRouter>

  );

}

export default App;
