import axios from "axios"
import { useEffect, useRef } from 'react'
import '../index.css'

export function RacksFetch({ searchLocation, searchCoordinates, onRacksFetch }) {

  const stopGetRacksRef = useRef(false);

  const getRacks = async () => {
    try {
      let response;

      if (searchLocation) {
        response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
      } else if (searchCoordinates) {
        response = await axios.get(`http://localhost:3000/bike_racks.json?latitude=${searchCoordinates.latitude}&longitude=${searchCoordinates.longitude}`);
      } else {
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

    if (searchCoordinates && !stopGetRacksRef.current) {
      getRacks();
      stopGetRacksRef.current = true
    }

    // // uncomment to run getRacks on selecting an autocomplete suggestion

    // if (searchLocation && !stopGetRacksRef.current) {
    //   getRacks();
    //   stopGetRacksRef.current = true
    // }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };

  }, [searchLocation, searchCoordinates, getRacks, onRacksFetch]);



  return (
    <div>
      {/* <h2>Racks Fetch</h2> */}
      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={getRacks}
      >Get Racks</button>
    </div>
  )
}

