import './assets/Overview.css'
export default function Overview({weatherData, city ,handleSubmit, handleInputChange}) {
  const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' }); 
  //Creates Intl.DisplayNames object that will be used for country code to full country name conversion.
    return (
      <div className="Overview">

        {weatherData ? ( /* Checks wether the Data has arrived */
        <div className='result' >
          <div className="names">
            <h2>{weatherData.name}</h2>
            <h2>{regionNamesInEnglish.of(weatherData.sys.country)}</h2> 
          </div>
            
          <div className="icons-date">
            <h2 className='date'>{new Date().toDateString()}</h2>
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
        /* Otherwise display loading screen */
        
        <p>Loading weather data...</p>

      )}
      </div>
    );
  } 