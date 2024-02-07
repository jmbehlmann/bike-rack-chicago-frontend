import axios from "axios"
import { useEffect } from 'react'

export function RacksFetch({ searchLocation, onRacksFetch }) {
  const getRacks = async () => {
    console.log("getRacks");
    try {
      const response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
      console.log(response.data);
      const racks = response.data
      onRacksFetch(racks)
    } catch (error) {
      console.error("Error fetching racks:", error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        getRacks();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchLocation, getRacks, onRacksFetch]);

  return (
    <div>
      <h2>Racks Fetch</h2>
      <button onClick={getRacks}>Get Racks</button>
    </div>
  )
}
