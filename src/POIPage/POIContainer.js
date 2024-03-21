
import POI from "./POI"; //Importing POI component

function POIContainer({weatherData, poiData, poi_type, changeMap}){
  // Checking if poiData exists and has elements and limiting elements to 5 if more than 5 exist
    if(poiData && poiData.elements && poiData.elements.length > 5){
      poiData.elements = poiData.elements.slice(0,5)
      console.log(poiData)
    }
    
    return(
        <div className="poiContainer">
          <h2>{poi_type}</h2>
          {/* Checking if poiData exists and has elements */}
          {poiData && poiData.elements && ( 
            poiData.elements.map((poi, i) => ( 
              <POI poi={poi} weatherData={weatherData} key={i} changeMap={changeMap} />)
            )
          )
          }

          {
            poiData && poiData.elements.length === 0 && (
              <h2 className="no_ports">No {poi_type} found at this radius and location</h2>
            )
          }

          {/* Displaying a loading message if POI data is not yet available */}
          {
            !poiData && (<h3>Loading Data ...</h3>)
          }
        </div>
    )

}

export default POIContainer;