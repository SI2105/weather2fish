import React, { useState, useEffect } from 'react';
import TrackerItem from './TrackerItem';
import TrackerLineGraph from './TrackerLineGraph';
import TrackerBarChart from './TrackerBarChart'; // Import the TrackerBarGraph component
import './TrackerList'
function TrackerList() {
  const [track, setTrack] = useState(() => {
    try {
      const storedTrack = localStorage.getItem('trackerData');
      return storedTrack ? JSON.parse(storedTrack) : [];
    } catch (error) {
      console.error('Error fetching data from local storage:', error);
      return [];
    }
  });
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [fishCount, setFishCount] = useState('');
  const [datesArray, setDatesArray] = useState([]); // State to hold all dates
  const [fishCountsArray, setFishCountsArray] = useState([]); // State to hold all fish counts
  const [uniqueNames, setUniqueNames] = useState([]); // State to hold unique names

  useEffect(() => {
    try {
      const storedTrack = localStorage.getItem('trackerData');
      if (storedTrack) {
        const parsedData = JSON.parse(storedTrack);
        setTrack(parsedData);
        const parsedDates = parsedData.map(item => item.date);
        setDatesArray(parsedDates);
        const parsedFishCounts = parsedData.map(item => item.fishCount);
        setFishCountsArray(parsedFishCounts);
        const parsedUniqueNames = [...new Set(parsedData.map(item => item.name))];
        setUniqueNames(parsedUniqueNames);
      }
    } catch (error) {
      console.error('Error fetching data from local storage:', error);
    }
  }, []); // Load stored data when component mounts

  useEffect(() => {
    try {
      console.log("Storing data to local storage");
      localStorage.setItem('trackerData', JSON.stringify(track));
    } catch (error) {
      console.error('Error storing data to local storage:', error);
    }
  }, [track]); // Save data to local storage whenever track state changes

  function addTrack() {
    // Check if the input fields are not empty
    if (!date || !name || !fishCount) {
      console.error('Please fill in all fields');
      return;
    }

    // Check if the fish count is greater than or equal to 0
    if (parseInt(fishCount) < 0) {
      console.error('Fish count must be greater than or equal to 0');
      return;
    }

    // Capitalize the first letter of the name
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const newTrack = {
      id: Date.now(),
      date,
      name: capitalizedName, // Use the capitalized name
      fishCount,
    };

    setTrack([...track, newTrack]);
    setDatesArray([...datesArray, date]);
    setFishCountsArray([...fishCountsArray, fishCount]);

    // Add the name to uniqueNames if it's not already present
    if (!uniqueNames.includes(capitalizedName)) {
      setUniqueNames([...uniqueNames, capitalizedName]);
    }

    setDate('');
    setName('');
    setFishCount('');
  }

  function deleteTrack(id) {
    setTrack(track.filter(item => item.id !== id));

    // Remove the date and fish count from their respective arrays when track is deleted
    const updatedDatesArray = datesArray.filter(date => track.some(item => item.date === date));
    const updatedFishCountsArray = fishCountsArray.filter((count, index) => track[index] && track[index].date === datesArray[index]);
    
    setDatesArray(updatedDatesArray);
    setFishCountsArray(updatedFishCountsArray);
  }

  return (
    <div>
      <div className="tracker-list">
        <div>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={fishCount}
            onChange={e => setFishCount(e.target.value)}
            placeholder="Fish Count"
          />
          <button onClick={addTrack}>Add</button>
        </div>
        {track
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((item, index) => (
            <TrackerItem
              key={item.id}
              track={item}
              fishCount={fishCountsArray[index]}
              deleteTrack={deleteTrack}
            />
          ))}
      </div>
      {/* Render the TrackerBarChart component */}
      {track.length > 0 && (
        <TrackerBarChart data={track} />
      )}
    <div> </div>

      {/* Render the TrackerLineGraph component only when datesArray and fishCountsArray are not empty */}
      {datesArray.length > 0 && fishCountsArray.length > 0 && (
        <TrackerLineGraph data={{ dates: datesArray, fishCounts: fishCountsArray }} />
      )}
      <div> </div>

    </div>
  );
}

export default TrackerList;
