import './assets/Overview.css'
export default function Overview({weatherData, city ,handleSubmit, handleInputChange}) {
    return (
      <div className="Overview">
        

        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter city Name' value={city} onChange={handleInputChange}/>
        <button type='submit'>Get Weather</button>
    </form>
    {weatherData ? (
        <div className='result' >
          <div>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.main.temp} C°</p>
          </div>

            <div>
              <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt=''></img>
              <p>{weatherData.weather[0].main}</p>
            </div>
        </div>
      ): (
        
        <p>Loading weather data...</p>

      )}
      </div>
    );
  } 