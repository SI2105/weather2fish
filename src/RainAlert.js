import React, { useEffect } from "react";
import "./assets/RainAlert.css";

function RainAlert({ weatherData, onClose }) {
  const getRainAlert = () => {
    if (!weatherData || !weatherData.list) return { type: "none" };

    // Initialize an object to hold the highest level of rain alert found
    let highestAlert = { type: "none", volume: 0 };

    // Check the forecast for rain predictions and categorize them
    weatherData.list.forEach((forecast) => {
      const rainVolume =
        forecast.rain && forecast.rain["3h"] ? forecast.rain["3h"] : 0;

      if (rainVolume > highestAlert.volume) {
        if (rainVolume > 1.5 && rainVolume <= 2.5) {
          highestAlert = { type: "light", volume: rainVolume };
        } else if (rainVolume > 2.5 && rainVolume <= 7.5) {
          highestAlert = { type: "moderate", volume: rainVolume };
        } else if (rainVolume > 7.5 && rainVolume <= 15) {
          highestAlert = { type: "heavy", volume: rainVolume };
        } else if (rainVolume > 15) {
          highestAlert = { type: "extreme", volume: rainVolume };
        }
      }
    });

    return highestAlert;
    
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); // 10 seconds 

    return () => clearTimeout(timer);
  }, [onClose]);

  const renderAlert = () => {
    const rainAlert = getRainAlert();
    switch (rainAlert.type) {
      case "light":
        return (
          <div className="rain-alert light">
            Alert: There is a chance of light rain.
          </div>
        );
      case "moderate":
        return (
          <div className="rain-alert moderate">
            Alert: There is a moderate amount of rain expected.
          </div>
        );
      case "heavy":
        return (
          <div className="rain-alert heavy">
            Alert: Heavy rain is expected. Please take care.
          </div>
        );
      case "extreme":
        return (
          <div className="rain-alert extreme">
            Alert: Extreme amount of rain expected. It's safest to stay indoors.
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderAlert()}</>;
}

export default RainAlert;

