import React from 'react'; //Importing react for JSX use

function TrackerItem({ track, deleteTrack }) {
  return (
    <div className="tracker-item"> {/* Container for each individual tracker item */}
      <p>Date: {track.date}</p>
      <p>Name: {track.name}</p>
      <p>Fish Count: {track.fishCount}</p>
      <button onClick={() => deleteTrack(track.id)}>Delete</button> {/* Button to delete the track */}
    </div>
  );
}

export default TrackerItem; // Exporting the TrackerItem component
