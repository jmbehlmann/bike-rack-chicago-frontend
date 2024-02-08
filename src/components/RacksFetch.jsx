import axios from "axios"
import { useEffect } from 'react'

export function RacksFetch({ searchLocation, searchCoordinates, onRacksFetch }) {

  // const getRacks = async () => {
  //   console.log("getRacks");
  //   try {
  //     const response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
  //     console.log(response.data);
  //     const racks = response.data
  //     onRacksFetch(racks)
  //   } catch (error) {
  //     console.error("Error fetching racks:", error);
  //   }
  // };

  const getRacks = async () => {
  console.log("getRacks");
  console.log(searchLocation)
  console.log(searchCoordinates)
  try {
    let response;

    if (searchLocation) {
      // Use searchLocation
      response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
    } else if (searchCoordinates) {
      // Use searchCoordinates
      response = await axios.get(`http://localhost:3000/bike_racks.json?latitude=${searchCoordinates.latitude}&longitude=${searchCoordinates.longitude}`);
    } else {
      // Handle the case when neither searchLocation nor searchCoordinates is provided
      console.error("Either searchLocation or searchCoordinates should be provided.");
      return;
    }

    console.log(response.data);
    const racks = response.data;
    onRacksFetch(racks);
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
      {/* <h2>Racks Fetch</h2> */}
      <button type="button" className="btn btn-primary w-100"  onClick={getRacks}>Get Racks</button>
    </div>
  )
}
