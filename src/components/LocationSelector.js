import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { locationData } from '../data/locationData';

const LocationSelector = ({ control, errors }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountryChange = (country, onChange) => {
    const selectedCountry = locationData.countries.find(c => c.name === country);
    if (selectedCountry) {
      setStates(selectedCountry.states);
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
    }
    onChange(country);
  };

  const handleStateChange = (state, onChange) => {
    const selectedState = states.find(s => s.name === state);
    if (selectedState) {
      setCities(selectedState.cities);
    } else {
      setCities([]);
    }
    onChange(state);
  };

  return (
    <>
      <div className="">
        <label className="block text-gray-700">Country</label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <select
              value={field.value}
              onChange={(e) => handleCountryChange(e.target.value, field.onChange)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Country</option>
              {locationData.countries.map((country, index) => (
                <option key={index} value={country.name}>{country.name}</option>
              ))}
            </select>
          )}
        />
        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
      </div>
        <div className="">
          <label className="block text-gray-700">State</label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <select
                value={field.value}
                onChange={(e) => handleStateChange(e.target.value, field.onChange)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state.name}>{state.name}</option>
                ))}
              </select>
            )}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <select
                value={field.value}
                onChange={field.onChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            )}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
        </div>
    </>
  );
};

export default LocationSelector;
