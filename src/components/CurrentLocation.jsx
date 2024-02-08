import { useState, useEffect } from 'react';

export function CurrentLocation({ onSearchCoordinatesChange }) {
  const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });


  const getCurrentLocation = () => {
    console.log("getCurrentLocation")
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onSearchCoordinatesChange(currentLocation)
        console.log(currentLocation)
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }






  return (
    <div>
      <h2>My Current Location</h2>
      <button onClick={getCurrentLocation}>Near You</button>
      {/* {currentLocation.latitude && currentLocation.longitude ? (
        <p>
          Latitude: {currentLocation.latitude}, Longitude: {currentLocation.longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  )
}
