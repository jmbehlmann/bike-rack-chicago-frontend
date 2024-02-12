import { useState, useEffect } from 'react';

export function CurrentLocation({ onSearchCoordinatesChange }) {
  const [isLoading, setIsLoading] = useState(false)
  const [buttonText, setButtonText ] = useState('Near You')

  useEffect(() => {
    let interval;

    if (isLoading) {
      // Start the loading ellipsis animation
      interval = setInterval(() => {
        setButtonText((prevText) => {
          switch (prevText) {
            case 'Getting Your Location':
              return 'Getting Your Location.';
            case 'Getting Your Location.':
              return 'Getting Your Location..';
            case 'Getting Your Location..':
              return 'Getting Your Location...';
            default:
              return 'Getting Your Location';
          }
        });
      }, 500); // Adjust the interval duration as needed
    } else {
      // Clear the interval when loading is complete or an error occurs
      clearInterval(interval);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [isLoading]);


  const getCurrentLocation = async () => {
    setIsLoading(true)
    // console.log("getCurrentLocation")
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onSearchCoordinatesChange(currentLocation)
        // console.log(currentLocation)
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
          onClick={getCurrentLocation}>{buttonText}</button>
      </div>

    </div>
  )
}
