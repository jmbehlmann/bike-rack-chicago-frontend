import React from 'react';
import { usePlacesAutocomplete } from '@react-google-maps/api';

function AutocompleteComponent({ onSelect }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce: 300,
    onSelect,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter your address"
      />
      {/* Suggestions List */}
      {status === 'OK' && (
        <ul>
          {data.map((suggestion) => (
            <li key={suggestion.id} onClick={() => onSelect(suggestion)}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteComponent;
