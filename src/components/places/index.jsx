import { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Loader } from "../loader";

export default function LocationInput({
  name,
  onChange,
  value = "",
  touched,
  onBlur,
  label,
  type,
  placeholder,
  className,
  infoContent,
  errorContent,
  autoComplete,
  disabled,
  onSelect,
  isRequired,
}) {
  const [address, setAddress] = useState(value);
  useEffect(() => {
    setAddress(value);
  }, [value]);

  const handleChangeAddress = (newAddress) => {
    setAddress(newAddress);
  };
  const handleSelectAddress = (newAddress) => {
    setAddress(newAddress);

    geocodeByAddress(newAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        onSelect({ address: newAddress, lat: latLng.lat, lng: latLng.lng });
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-black text-sm dark:text-white">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>
      <PlacesAutocomplete
        value={address}
        onChange={handleChangeAddress}
        onSelect={handleSelectAddress}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="flex flex-col gap-1">
            <div
              className={`${className} ${
                errorContent && touched ? "border-error" : "border-[#D6D6D6] dark:border-gray-900"
              } w-full h-full bg-pageBodyBg dark:bg-gray-900 p-2 rounded-lg`}
            >
              <input
                {...getInputProps({
                  placeholder: "Search places ...",
                  className:
                    "w-full h-8 bg-pageBodyBg dark:bg-gray-900 placeholder:text-[#C4C4C4] dark:placeholder:text-gray-200 dark:text-gray-200 placeholder:text-xs focus:outline-none",
                })}
                onBlur={onBlur}
              />
            </div>
            {suggestions.length > 0 && (
              <div className="relative">
                <div
                  className={`${
                    suggestions.length > 0 &&
                    "absolute top-0 py-0.5 border border-[#D6D6D6] rounded-lg bg-white z-[1000]"
                  }`}
                >
                  {loading && <Loader className={"absolute top-0"} />}
                  {suggestions.map((suggestion) => {
                    return (
                      <p
                        {...getSuggestionItemProps(suggestion)}
                        className={`${
                          suggestion.active ? "bg-[#D6D6D6]" : ""
                        } px-2 py-1 hover:bg-[#D6D6D6] cursor-pointer`}
                        key={suggestion.placeId}
                      >
                        <span>{suggestion.description}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="h-1 mb-2">
              {errorContent && touched && (
                <p className=" text-error text-xs">{errorContent}</p>
              )}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
