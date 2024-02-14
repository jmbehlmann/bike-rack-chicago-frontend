import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

export function Map({isLoaded, racks, mapSize}) {
  const [position, setPosition] = useState({ lat: 41.8781, lng: -87.6298 });
  const [map, setMap] = useState(null);
  const [selectedRack, setSelectedRack] = useState(null);
  // const [mapSize, setMapSize] = useState({ height: '76vh', width: '100%' })

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

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null)
  // }, [])


  return (
    <div>
      {isLoaded && (
        <div>
          <GoogleMap
            mapContainerStyle={mapSize}
            center={position}
            zoom={12}
            onLoad={onLoad}
            // onUnmount={onUnmount}
          >
            {racks && racks.map((rack) => (
              <Marker
                key={rack.id}
                position={{
                  lat: parseFloat(rack.latitude),
                  lng: parseFloat(rack.longitude),
                }}
                animation={2}
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
                  <h5>{selectedRack.name}</h5>
                  <p>{selectedRack.description}</p>
                  <p># racks: {selectedRack.quantity}</p>
                  <p>
                    coordinates: {selectedRack.latitude}, {selectedRack.longitude}
                  </p>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${selectedRack.latitude},${selectedRack.longitude}&travelmode=bicycling`}>directions</a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
}
