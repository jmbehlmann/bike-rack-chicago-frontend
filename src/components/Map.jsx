import { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

export function Map({isLoaded, racks}) {
  const [position, setPosition] = useState({ lat: 41.8781, lng: -87.6298 });
  const [map, setMap] = useState(null);
  const [selectedRack, setSelectedRack] = useState(null);
  // const [zoom, setZoom] = useState(12);


  const handleMarkerClick = (rack) => {
    setSelectedRack(rack);
  };

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    if (map && racks.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      racks.forEach((rack) => {
        bounds.extend({
          lat: parseFloat(rack.latitude),
          lng: parseFloat(rack.longitude),
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, racks]);

  return (
    <div>
      {isLoaded && (
        <div>
          <GoogleMap
            mapContainerStyle={{ height: '75vh', width: '100%' }}
            center={position}
            zoom={12}
            onLoad={onLoad}
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
