import axios from "axios"
import { useState } from "react"

export function RacksFetch({ searchLocation, onRacksFetch }) {
  // const [racks, setRacks] = useState([])
  // const [searchLocation, setSearchLocation] = useState("")

  const getRacks = async () => {
    console.log("getRacks");
    try {
      const response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
      console.log(response.data);
      // setRacks(response.data);
      const racks = response.data
      onRacksFetch(racks)
    } catch (error) {
      console.error("Error fetching racks:", error);
    }
  };

  return (
    <div>
      <h2>Racks Fetch</h2>
      <button onClick={getRacks}>Get Racks</button>
    </div>
  )
}
