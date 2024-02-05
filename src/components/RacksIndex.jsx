import axios from "axios"
import { useState } from "react"

export function RacksIndex() {
  const [racks, setRacks] = useState([])
  const [searchLocation, setSearchLocation] = useState("")

  const getRacks = async () => {
    console.log("getRacks");
    try {
      const response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
      console.log(response.data);
      setRacks(response.data);
    } catch (error) {
      console.error("Error fetching racks:", error);
    }
  };

  return (
    <div>
      <h2>Rack Index</h2>
      <p>Enter an Address: <input type="text" value={searchLocation} onChange={(event) => setSearchLocation(event.target.value) }/></p>
      <button onClick={getRacks}>Get Racks</button>
      <h3>the 5 bike racks closest to {searchLocation}</h3>
      {racks.map((rack) => (
        <div key={rack.id}>
          <h4>location: {rack.name}</h4>
          <p>description: {rack.description}</p>
          <p>quantity: {rack.quantity}</p>
          <p>style: {rack.style}</p>
          <p>latitude: {rack.latitude}</p>
          <p>longitude: {rack.longitude}</p>
        </div>
      ))}
    </div>
  )
}
