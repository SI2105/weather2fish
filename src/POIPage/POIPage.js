import './POIPage.css'
import Map from "../Map";
import POIContainer from "./POIContainer";
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
function POIPage({weatherData, portData, fishingData, radius, setRadius, handleRadius}) {
  //Page used to display the map of the current City selected with Ports and Fishing points.
  // Each POIcontainer displays information about at given point of interest(Ports or Fishing Points)

  let RadiusEnable = weatherData && weatherData.coord
  const handleInputChange = (e) => {
      setRadius(e.target.value)
    
    
    console.log(radius)
  };

    return (
      <div className="POIPage">
        <div className='radiussection'>
        <p for="radius">Choose a Radius : {radius/1000} KM</p>

        <input type="range" min="10000" max="100000" value={radius} class="radius_slider" id="radius" onChange={handleInputChange} onMouseUp={handleRadius} disabled={!RadiusEnable} />
        
        </div>
        
        <Map weatherData={weatherData} portData={portData} fishingData={fishingData} radius={radius}/>
        <POIContainer weatherData={weatherData} poiData={portData} poi_type={"Ports"} />
          
        <POIContainer weatherData={weatherData} poiData={fishingData} poi_type={"Fishing Points"} />
        </div>
    );
  }
  
  export default POIPage;  