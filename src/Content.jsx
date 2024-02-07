import { useState } from "react"
import { RacksIndex } from "./components/RacksIndex.jsx"
import { MapIndex } from "./components/MapIndex.jsx"
import { MapReact } from "./components/MapReact.jsx"
import { useJsApiLoader } from "@react-google-maps/api";

export function Content() {
  const [libraries] = useState(['places'])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  return (
    <main>
      <h3>Bike Rack Chicago</h3>
      {/* <MapIndex/> */}
      <MapReact isMapLoaded={isLoaded}/>
      {/* <RacksIndex/> */}
    </main>
  )
}
