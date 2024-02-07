export function RacksIndex({ racks }) {
  return (
    <div>
      <p>Racks Index</p>

      {racks && racks.map((rack) => (
        <div key={rack.id}>
          <h4>location: {rack.name}</h4>
          <p>description: {rack.description}</p>
          <p>quantity: {rack.quantity}</p>
          <p>style: {rack.style}</p>
          <p>latitude: {rack.latitude}</p>
          <p>longitude: {rack.longitude}</p>
        </div>
      ))}

    </div>
  )
}
