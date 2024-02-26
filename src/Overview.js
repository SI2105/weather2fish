export default function Overview({weatherData, city ,handleSubmit, handleInputChange}) {
    return (
      <div className="Overview">
        

        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter city Name' value={city} onChange={handleInputChange}/>
        <button type='submit'>Get Weather</button>
    </form>
    {weatherData ? (
        <>
        <h2>{weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp} C°</p>
        <p><img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt=''></img></p>
        <p>Feels like: {weatherData.main.feels_like} C°</p>
        <p>Humidity: {weatherData.main.humidity} %</p>
        <p>Pressure: {weatherData.main.pressure} hPa</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        <p>Wind Degree: {weatherData.wind.deg}°</p>
        <p>Date: {new Date().toDateString()}</p>
        
        </>
      ): (
        
        <p>Loading weather data...</p>

      )}
      </div>
    );
  } 