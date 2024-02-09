import { useState, useEffect } from 'react';

export function CurrentLocation({ onSearchCoordinatesChange }) {
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentLocation = async () => {
    setIsLoading(true)
    console.log("getCurrentLocation")
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onSearchCoordinatesChange(currentLocation)
        console.log(currentLocation)
      })
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }

  return (
    <div className='row py-2'>
      <div className='col-sm-8 d-flex align-items-center'>
        <h5>... or find racks near your current location</h5>
      </div>
      <div className='col-sm-4'>
        <button
          type="button"
          className="btn btn-primary w-100"
          // style={{
          //   backgroundColor: "#0075BB",
          //   borderColor: "#005B99",
          //   color: "white"}}
          onClick={getCurrentLocation}>{isLoading ? 'Getting Your Location...' : "Near You"} </button>
      </div>

    </div>
  )
}
