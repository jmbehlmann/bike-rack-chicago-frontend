import axios from "axios"
import { useEffect, useRef, useState } from 'react'
import '../index.css'

export function RacksFetch({ searchLocation, searchCoordinates, onRacksFetch }) {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Get Racks")
  const stopGetRacksRef = useRef(false);

  useEffect(() => {
    let interval;

    if (searchLocation && isLoading) {
      interval = setInterval(() => {
        setButtonText((prevText) => {
          switch (prevText) {
            case 'Getting Racks':
              return 'Getting Racks.';
            case 'Getting Racks.':
              return 'Getting Racks..';
            case 'Getting Racks..':
              return 'Getting Racks...';
            default:
              return 'Getting Racks';
          }
        });
      },333);
    } else {
      clearInterval(interval);
      setButtonText('Get Racks')
    }
    return () => clearInterval(interval);
  }, [isLoading]);


  // axios request for rails server

  // const getRacks = async () => {
  //   try {
  //     let response;

  //     if (searchLocation) {
  //       response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
  //     } else if (searchCoordinates) {
  //       response = await axios.get(`http://localhost:3000/bike_racks.json?latitude=${searchCoordinates.latitude}&longitude=${searchCoordinates.longitude}`);
  //     } else {
  //       console.error("Either searchLocation or searchCoordinates should be provided.");
  //       return;
  //     }

  //     console.log(response.data);
  //     const racks = response.data;
  //     onRacksFetch(racks);
  //   } catch (error) {
  //     console.error("Error fetching racks:", error);
  //   }
  // };

  // axios request for heroku server

  const getRacks = async () => {
    try {
      setIsLoading(true);
      let response;
      if (searchLocation) {
        response = await axios.get(`https://shielded-sea-28254-f47942d33ba0.herokuapp.com/bike_racks.json?location=${searchLocation}`);
      } else if (searchCoordinates) {
        response = await axios.get(`https://shielded-sea-28254-f47942d33ba0.herokuapp.com/bike_racks.json?latitude=${searchCoordinates.latitude}&longitude=${searchCoordinates.longitude}`);
      } else {
      throw new Error("Please provide a valid location to fetch bike racks. You can enter a specific location or allow access to your current location.");
      }

      // console.log(response.data);
      const racks = response.data;
      onRacksFetch(racks);
      setIsLoading(false);
    } catch (error) {
      // console.error("Error fetching racks:", error);
      alert(error.message);
      setIsLoading(false);
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
      >{buttonText}</button>
    </div>
  )
}

