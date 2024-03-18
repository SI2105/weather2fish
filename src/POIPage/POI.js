import { useMemo } from "react";

function POI({poi,weatherData,city}){
    function calculate_distance(lat1,lat2,lon1,lon2){ //Calculates distance between two lat and lon pairs.

        const R = 6371; // Radius of the earth in km.
        const dLat = degtorad(lat2 - lat1); 
        const dLon = degtorad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(degtorad(lat1)) * Math.cos(degtorad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km

   
        return Math.round((distance*100)/100); // Rounded to 2 decimal places.
    }

    function degtorad(deg) {
        return deg * (Math.PI / 180);
      }

    const distance = useMemo(() => calculate_distance(weatherData.coord.lat,poi.lat,weatherData.coord.lon,poi.lon),[weatherData,poi,city]);
    // calculate distances wrapped in useMemo to ensure it is only recomputed if weatherData, and therefore the city changes
    
    return(
        <div className="poi">
            {poi.tags.name ? <h2>{poi.tags.name}</h2>: (<h2>Unamed Location</h2>)}
            <h2>{distance} KM</h2>
        </div>
    )

}

export default POI;