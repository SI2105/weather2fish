
import POI from "./POI";

function POIContainer({weatherData, poiData}){
    
    return(
        <div className="poiContainer">
          {poiData && poiData.elements && (
            poiData.elements.filter((poi, i)=> (poi.tags.name)).map((poi, i) => (
              <POI poi={poi} weatherData={weatherData} key={i} />)
            )
          )}
        </div>
    )

}

export default POIContainer;