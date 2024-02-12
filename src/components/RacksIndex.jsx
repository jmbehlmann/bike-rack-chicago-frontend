import { useState } from 'react';

export function RacksIndex({ racks }) {
  const [alertShown, setAlertShown] = useState(false);

  if (racks.length === 0 && !alertShown) {
    alert("Please try a different location.");
    setAlertShown(true); // Set the state to indicate that the alert has been shown
  }

  return (
    <div>
      {racks && racks.map((rack) => (
        <div className="card p-2" key={rack.id}>
          <h5>{rack.name}</h5>
          <p>{rack.description}</p>
          <p>quantity: {rack.quantity}</p>
          {/* <p>style: {rack.style}</p> */}
          <p>latitude: {rack.latitude} longitude: {rack.longitude}</p>

          <a href={`https://www.google.com/maps/dir/?api=1&destination=${rack.latitude},${rack.longitude}&travelmode=bicycling`}>directions</a>
        </div>
      ))}

    </div>
  )
}
