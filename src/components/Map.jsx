import { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

export function Map({isLoaded, searchLocation, racks}) {
  const [position, setPosition] = useState({ lat: 41.8781, lng: -87.6298 });
  const [zoom, setZoom] = useState(12);
  const [selectedRack, setSelectedRack] = useState(null);

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
      {isLoaded && (
        <div>
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
