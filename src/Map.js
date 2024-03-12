import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import './assets/Map.css'
import 'leaflet/dist/leaflet.css'
import { Icon } from "leaflet";

function ChangeMap({center}) {
  const map = useMap();
  useEffect(()=>{
    map.setView(center);

  }, [center,map])
  
  return null;
}


function Map({weatherData}) {
  
    
    
    
  const customIcon = new Icon({
    iconUrl: require('./assets/marker.png'),
    iconSize: [25,40]
  })

    return (
      <div className="map">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {weatherData && weatherData.coord && (<Marker position={[weatherData.coord.lat, weatherData.coord.lon ]} icon={customIcon}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>)}

            {weatherData && weatherData.coord && <ChangeMap center={[weatherData.coord.lat, weatherData.coord.lon ]}></ChangeMap>}

            
            
        </MapContainer>

      </div>
    );
  }

  
  export default Map;  