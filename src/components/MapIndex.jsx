import axios from "axios";
import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { RacksIndex } from "./RacksIndex";

export  function MapIndex() {
  const [position, setPosition] = useState({ lat: 41.8781, lng: -87.6298 });
  const [zoom, setZoom] = useState(12);
  const [open, setOpen] = useState(false);
  const [racks, setRacks] = useState([]);
  const [selectedRack, setSelectedRack] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");


  const getRacks = async () => {
    console.log("getRacks");
    try {
      const response = await axios.get(`http://localhost:3000/bike_racks.json?location=${searchLocation}`);
      console.log(response.data);
      setRacks(response.data);
    } catch (error) {
      console.error("Error fetching racks:", error);
    }
  };

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
      setZoom(17)
    }
  }, [racks]);


  return (
    <div>
      <p>Enter an Address: <input type="text" value={searchLocation} onChange={(event) => setSearchLocation(event.target.value) }/></p>
      <button onClick={getRacks}>Get Racks</button>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div style={{ height: "80vh", width: "100%" }}>
          <Map zoom={zoom} center={position} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}>
            {racks.map((rack) => (
              <div key={rack.id}>
                <AdvancedMarker
                  position={{
                    lat: parseFloat(rack.latitude),
                    lng: parseFloat(rack.longitude)
                    }}
                  onClick={() => handleMarkerClick(rack)}>
                  <Pin
                    background={"red"}
                    borderColor={"black"}
                    glyphColor={"purple"}
                    // background={"#B3DDF2"}
                    // borderColor={"black"}
                    // glyphColor={"#FF0000"}
                  />
                </AdvancedMarker>

                {selectedRack && selectedRack.id === rack.id && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(rack.latitude),
                      lng: parseFloat(rack.longitude),
                    }}
                    onCloseClick={() => setSelectedRack(null)}
                  >
                    <p>{rack.description}</p>
                  </InfoWindow>
                )}

              </div>
            ))}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
}
