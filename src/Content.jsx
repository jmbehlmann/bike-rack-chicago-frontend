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
      <div className="container-xxl">
        <h3>Bike Rack Chicago</h3>
          <div className="row p-2" >
            <div className="col-sm-8">

              <SearchBox isLoaded={isLoaded} onSearchLocationChange={handleSearchLocationChange}/>
            </div>

            <div className="col-sm-4">
              <RacksFetch searchLocation={searchLocation} onRacksFetch={handleRacksIndex}/>
            </div>
          </div>

        <div className="row">
          <div className="col-lg-8 order-lg-2">
            <Map isLoaded={isLoaded} searchLocation={searchLocation} racks={racks}/>
          </div>

          {racks &&
            <div className="col-lg-4 order-lg-1 ">
              <div className="racks-index-container" style={{ height: "80vh", overflowY: "auto", border: "1px solid #ccc"  }}>
                <RacksIndex racks={racks}/>
              </div>
            </div>
          }

        </div>
      </div>
    </main>
  )
}
