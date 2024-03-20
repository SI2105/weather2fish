import React from 'react';

function TrackerItem({ track, deleteTrack }) {
  return (
    <div className="tracker-item">
      <p>Date: {track.date}</p>
      <p>Name: {track.name}</p>
      <p>Fish Count: {track.fishCount}</p>
      <button onClick={() => deleteTrack(track.id)}>Delete</button>
    </div>
  );
}

export default TrackerItem;
