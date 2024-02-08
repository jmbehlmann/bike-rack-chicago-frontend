import { useState, useEffect } from 'react';

export function CurrentLocation({ onSearchCoordinatesChange }) {


  const getCurrentLocation = async () => {
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
    <div className='row p-2 mt-2'>
      <div className='col-lg-8'>
        <h4>... or find racks near your current location</h4>
      </div>
      <div className='col-lg-4'>
        <button type="button" className="btn btn-primary w-100" onClick={getCurrentLocation}>Near You</button>
      </div>

    </div>
  )
}
