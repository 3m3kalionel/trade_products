import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoLocationSharp } from "react-icons/io5";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import "./LocationSearch.css";

const LocationSearch = ({ handleSelectedAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleChange = address => {
    setSelectedAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log("Success", latLng);
        setSelectedAddress(address);
        handleSelectedAddress(address, latLng);
      })
      .catch(error => console.error("Error", error));
  };

  return (
    <div className="canvas">
      <PlacesAutocomplete
        value={selectedAddress}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter your address ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, key) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={key}
                    className="input-suggestion"
                    {...getSuggestionItemProps(suggestion, {
                      style,
                    })}
                  >
                    <IconContext.Provider value={{ size: "20px" }}>
                      <IoLocationSharp />
                    </IconContext.Provider>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationSearch;
