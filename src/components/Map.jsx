import GoogleMapReact from "google-map-react";

export function Map() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  // Define the location on the map
  const defaultCenter = {
    lat: 41.8781, // default latitude
    lng: -87.6298, // default longitude
  };

  const defaultZoom = 12; // Set the default zoom level

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <h2>Map</h2>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
      >
        {/* You can add markers or other components here */}
      </GoogleMapReact>
    </div>
  );
}
