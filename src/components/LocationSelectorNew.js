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

            <div className=''>
                <label className='block'>country</label>
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
            </div>
            <div className=''>
                <label className='block'>State</label>
                <Controller
                    name="State"
                    control={control}
                    render={({ field }) => (
                        <select
                            value={field.value}
                            onChange={(e) => handleStateChange(e.target.value, field.onChange)}

                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select State</option>
                            {states.map((State, index) => (
                                <option key={index} value={State.name}>{State.name}</option>
                            ))}
                        </select>
                    )}
                />
            </div>
            <div className=''>
                <label className='block'>City</label>
                <Controller
                    name="City"
                    control={control}
                    render={({ field }) => (
                        <select
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select City</option>
                            {cities.map((City, index) => (
                                <option key={index} value={City}>{City}</option>
                            ))}
                        </select>
                    )}
                />
            </div>
        </>
    );
};

export default LocationSelector;
