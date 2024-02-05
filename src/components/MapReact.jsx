import GoogleMapReact  from "google-map-react";

const Marker = ({ text }) => <div>{text}</div>;


export function MapReact() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  // Define the location on the map
  const defaultCenter = {
    lat: 41.8781, // default latitude
    lng: -87.6298, // default longitude
  };

  const defaultZoom = 12; // Set the default zoom level

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <h2>MapReact</h2>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
      >
      <Marker
        lat={41.8781}
        lng={-87.6298}
        text="My Marker"
      />
      </GoogleMapReact>
    </div>
  );
}
