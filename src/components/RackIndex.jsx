import axios from "axios"
import { useState } from "react"

export function RackIndex() {
  const [racks, setRacks] = useState([])

  const getRacks = async () => {
    console.log("getRacks");
    try {
      const response = await axios.get("http://localhost:3000/bike_racks.json");
      console.log(response.data);
      setRacks(response.data);
    } catch (error) {
      console.error("Error fetching racks:", error);
    }
  };

  return (
    <div>
      <h2>Rack Index</h2>
      <button onClick={getRacks}>Get Racks</button>
      {racks.map((rack) => (
        <div key={rack.id}>
          <h3>Name/Neighborhood: {rack.name}</h3>
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
