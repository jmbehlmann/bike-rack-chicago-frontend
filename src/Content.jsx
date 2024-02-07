import { useState } from "react"
import { RacksFetch } from "./components/RacksFetch.jsx"
import { RacksIndex } from "./components/RacksIndex.jsx"
import { SearchBox } from "./components/SearchBox.jsx"
import { Map } from "./components/Map.jsx"
import { useJsApiLoader } from "@react-google-maps/api";

export function Content() {
  const [libraries] = useState(['places'])
  const [searchLocation, setSearchLocation] = useState("")
  const [racks, setRacks] = useState("")

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const handleSearchLocationChange = (newLocation) => {
    setSearchLocation(newLocation);
  };

  const handleRacksIndex = (returnedRacks) => {
    setRacks(returnedRacks)
  }


  return (
    <main>
      <h3>Bike Rack Chicago</h3>
      <SearchBox isLoaded={isLoaded} onSearchLocationChange={handleSearchLocationChange}/>
      <RacksFetch searchLocation={searchLocation} onRacksFetch={handleRacksIndex}/>
      <Map isLoaded={isLoaded} searchLocation={searchLocation} racks={racks}/>
      <RacksIndex racks={racks}/>
    </main>
  )
}
