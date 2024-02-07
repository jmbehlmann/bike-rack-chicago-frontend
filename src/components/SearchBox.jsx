import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';


export function SearchBox({isLoaded, onSearchLocationChange}) {
  const [autocomplete, setAutocomplete] = useState(null);
  // const [searchLocation, setSearchLocation] = useState('');

  const onLoad = (auto) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const location = place.formatted_address || place.name;
      onSearchLocationChange(location);
    }
  };

  return (
    <div>
      <p>Searchbox</p>
      {isLoaded && (

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input className='search-box'
            type="text"
            placeholder="Enter a location"
            // value={searchLocation}
            // onChange={(e) => setSearchLocation(e.target.value)}
          />
        </Autocomplete>

      )}

    </div>
  )
}
