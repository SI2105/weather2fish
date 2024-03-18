
import POI from "./POI";

function POIContainer({weatherData, poiData, poi_type, changeMap}){
    if(poiData && poiData.elements && poiData.elements.length > 5){
      poiData.elements = poiData.elements.slice(0,5)
      console.log(poiData)
    }
    
    return(
        <div className="poiContainer">
          <h2>{poi_type}</h2>
          {poiData && poiData.elements && (
            poiData.elements.map((poi, i) => (
              <POI poi={poi} weatherData={weatherData} key={i} changeMap={changeMap} />)
            )
          )
          }

          {
            poiData && poiData.elements.length === 0 && (
              <h2>No {poi_type} found at this radius and location</h2>
            )
          }

          {
            !poiData && (<h3>Loading Data ...</h3>)
          }
        </div>
    )

}

export default POIContainer;