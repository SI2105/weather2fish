import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import './assets/Map.css'
import 'leaflet/dist/leaflet.css'
import { Icon } from "leaflet";

import POIContainer from "./POIContainer";

function ChangeMap({center}) {
  // Changes maps view to the center lat and lon pair.
  const map = useMap();
  useEffect(()=>{
    map.setView(center,12); //Use Effect here ensure the map is centered when center pair or the map changes

  }, [center,map])
  
  return null;
}


function Map({weatherData,portData,fishingData}) {
  
    
  // Below are the custome marker icons for each type off marker.

  //City Marker
  const customIcon = new Icon({
    iconUrl: require('./assets/marker.png'),
    iconSize: [25,40]
  })

  //Port Marker
  const portIcon = new Icon({
    iconUrl: require('./assets/port-sign.png'),
    iconSize: [40,40]
  })

  //Fishing Spot Marker
  const fishingIcon = new Icon({
    iconUrl: require('./assets/fishing.png'),
    iconSize: [32,32]
  })

    return (
      
      <div className="map">
        <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true}> 
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* TileLayer contains the map tiles for OpenStreetmap */}
            
            { // Creates Marker if weatherData and correspoding coordinates are available.
            //Displays Marker on the chosen city with a Popup that displays the temperature.
            weatherData && weatherData.coord && (<Marker position={[weatherData.coord.lat, weatherData.coord.lon ]} icon={customIcon}>
                <Popup>
                Temperature : {weatherData.main.temp} C° <br /> 
                </Popup>
            
            
            </Marker>)}

            {weatherData && portData && portData.elements && (
              portData.elements.filter((port, i)=> (port.tags.name) ).map((port, i)=>(
                  <Marker key = {i} position={[port.lat, port.lon]} icon={portIcon}>
                <Popup>
                  {port.tags.name} <br /> 
                </Popup>
                </Marker>
              ))
            )
            }

            {weatherData && fishingData && fishingData.elements && (
              fishingData.elements.filter((fishing, i)=> (fishing.tags.name) ).map((fishing, i)=>(
                  <Marker key = {i} position={[fishing.lat, fishing.lon]} icon={fishingIcon}>
                <Popup>
                  {fishing.tags.name} <br /> 
                </Popup>
                </Marker>
              ))
            )
            }



            {weatherData && weatherData.coord && <ChangeMap center={[weatherData.coord.lat, weatherData.coord.lon ]}></ChangeMap>}

            
            
        </MapContainer>

        <POIContainer weatherData={weatherData} poiData={portData}/>
        
        <POIContainer weatherData={weatherData} poiData={fishingData}/>
        

      </div>
    );
  }

  
  export default Map;  