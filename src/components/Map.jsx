import axios from 'axios';
import { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';


export function Map({isLoaded, searchLocation, racks}) {
  const [position, setPosition] = useState({ lat: 41.8781, lng: -87.6298 });
  const [zoom, setZoom] = useState(12);
  // const [racks, setRacks] = useState([]);
  const [selectedRack, setSelectedRack] = useState(null);
  // const [searchLocation, setSearchLocation] = useState('');
  // const [autocomplete, setAutocomplete] = useState(null);


  // const onLoad = (auto) => {
  //   setAutocomplete(auto);
  // };

  // const onPlaceChanged = () => {
  //   if (autocomplete) {
  //     const place = autocomplete.getPlace();
  //     setSearchLocation(place.formatted_address || place.name);
  //   }
  // };


  // const getRacks = async () => {
  //   console.log('getRacks');
  //   try {
  //     const response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
  //     console.log(response.data);
  //     setRacks(response.data);
  //   } catch (error) {
  //     console.error('Error fetching racks:', error);
  //   }
  // };

  const handleMarkerClick = (rack) => {
    setSelectedRack(rack);
  };


  useEffect(() => {
    // Update position whenever racks change
    if (racks.length > 0) {
      const firstRack = racks[0];
      setPosition({
        lat: parseFloat(firstRack.latitude),
        lng: parseFloat(firstRack.longitude),
      });
      setZoom(16.5)
    }
  }, [racks]);


  return (
    <div>
      {/* <p>Enter an Address: <input type="text" value={searchLocation} onChange={(event) => setSearchLocation(event.target.value) }/></p> */}


      {isLoaded && (
        <div>
          {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input className='search-box'
              type="text"
              placeholder="Enter a location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </Autocomplete> */}

          {/* <button onClick={getRacks}>Get Racks</button> */}

          <GoogleMap
            mapContainerStyle={{ height: '80vh', width: '100%' }}
            center={position}
            zoom={zoom}
          >
            {racks && racks.map((rack) => (
              <Marker
                key={rack.id}
                position={{
                  lat: parseFloat(rack.latitude),
                  lng: parseFloat(rack.longitude),
                }}
                onClick={() => handleMarkerClick(rack)}
              />
            ))}
            {selectedRack && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedRack.latitude),
                  lng: parseFloat(selectedRack.longitude),
                }}
                onCloseClick={() => setSelectedRack(null)}
              >
                <div>
                  <h3>{selectedRack.name}</h3>
                  <p>{selectedRack.description}</p>
                  <p># racks: {selectedRack.quantity}</p>
                  <p>
                    coordinates: {selectedRack.latitude}, {selectedRack.longitude}
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
}
