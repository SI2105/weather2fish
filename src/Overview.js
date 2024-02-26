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
          <div className='top'>
            <h2>{weatherData.name}</h2>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt=''></img>
        
          </div>

            <div className='bottom'>
              <h2>{weatherData.main.temp} C°</h2>
              <h2>{weatherData.weather[0].main}</h2>
            </div>
        </div>
      ): (
        
        <p>Loading weather data...</p>

      )}
      </div>
    );
  } 