import './assets/Overview.css'
export default function Overview({weatherData, city ,handleSubmit, handleInputChange}) {
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    return (
      <div className="Overview">

        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter city Name' value={city} onChange={handleInputChange}/>
        <button type='submit'>Get Weather</button>
    </form>
    {weatherData ? (
        <div className='result' >
          <div className="names">
            <h2>{weatherData.name}</h2>
            <h2>{regionNamesInEnglish.of(weatherData.sys.country)}</h2>
          </div>
            
          <div className="icons">
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='' ></img>
          </div>

            <div className="temp">
              <h2 className='maintemp'>{weatherData.main.temp} C°</h2>
            </div>
            <div className="descriptionsect">
              <h2 className='description'>{weatherData.weather[0].main}</h2>
            </div>
        </div>
      ): (
        
        <p>Loading weather data...</p>

      )}
      </div>
    );
  } 