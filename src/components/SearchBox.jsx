import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

export function SearchBox({isLoaded, onSearchLocationChange, onRacksFetch}) {
  const [autocomplete, setAutocomplete] = useState(null);

  const bounds = {
    north: 42.1,
    south: 41.2,
    east: -87.5,
    west: -87.9,
  }

const options = {
    strictBounds: true,
};

  const onLoad = (auto) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged =  () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const location = place.formatted_address || place.name;
      onSearchLocationChange(location);
    }
  };

  return (
    <div>
      {isLoaded && (

        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          bounds={bounds}
          options={options}
          >
          <input
            className='form-control p-21'
            type="text"
            placeholder="Enter a location"
          />
        </Autocomplete>

      )}

    </div>
  )
}
