import { RacksIndex } from "./components/RacksIndex.jsx"
import { MapIndex } from "./components/MapIndex.jsx"
import { MapReact } from "./components/MapReact.jsx"

export function Content() {
  return (
    <main>
      <h3>Bike Rack Chicago</h3>
      {/* <MapIndex/> */}
      <MapReact/>
      {/* <RacksIndex/> */}
    </main>
  )
}
