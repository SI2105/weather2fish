import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import './assets/css/Map.css'
import 'leaflet/dist/leaflet.css'
import { Icon } from "leaflet";


function ChangeMap({center,zoom}) {
  // Changes maps view to the center lat and lon pair.

  const map = useMap();
  useEffect(()=>{
    map.setView(center,zoom); //Use Effect here ensure the map is centered when center pair or the map changes

  }, [center,zoom,map])
  
  return null;
}


function Map({weatherData,portData,fishingData,radius}) {
    
  // Below are the custome marker icons for each type off marker.
  let zoom = 13 - (((radius - 10000) * (13 - 8)) / (100000 - 10000));
  zoom = Math.round(zoom*100)/100

  //City Marker
  const customIcon = new Icon({
    iconUrl: require('./assets/images/marker.png'),
    iconSize: [25,40]
  })

  //Port Marker
  const portIcon = new Icon({
    iconUrl: require('./assets/images/port-sign.png'),
    iconSize: [40,40]
  })

  //Fishing Spot Marker
  const fishingIcon = new Icon({
    iconUrl: require('./assets/images/fishing.png'),
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

            {//When the weatherdata and port data is present, the markers for each port is placed, with a popup of the port name.
            weatherData && portData && portData.elements && (
              portData.elements.filter((port, i)=> (port.tags.name) ).map((port, i)=>(
                  <Marker key = {i} position={[port.lat, port.lon]} icon={portIcon}>
                <Popup>
                  {port.tags.name} <br /> 
                </Popup>
                </Marker>
              ))
            )
            }

            {//When the weatherdata and fishing data is present, the markers for each fishing point is placed, with a popup of the name of each fishing point.
            weatherData && fishingData && fishingData.elements && (
              fishingData.elements.filter((fishing, i)=> (fishing.tags.name) ).map((fishing, i)=>(
                  <Marker key = {i} position={[fishing.lat, fishing.lon]} icon={fishingIcon}>
                <Popup>
                  {fishing.tags.name} <br /> 
                </Popup>
                </Marker>
              ))
            )
            }



            { // If weatherData and the coordinates for it, we pass the said coordinates to the ChangeMap method above
            weatherData && weatherData.coord && radius && <ChangeMap center={[weatherData.coord.lat, weatherData.coord.lon ]} zoom={zoom}></ChangeMap>
            }

            
            
        </MapContainer>

      </div>
    );
  }

  
  export default Map;  