// src/App.tsx

import React, { useState } from 'react';
import './App.css';

// List of provinces and cities in Canada
const provinces = ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Prince Edward Island", "Saskatchewan", "Yukon"];
const cities = ["Toronto", "Ottawa", "Mississauga", "Montreal", "Quebec City", "Laval", "Vancouver", "Victoria", "Surrey", "Calgary", "Edmonton", "Red Deer", "Winnipeg", "Halifax", "Charlottetown", "Whitehorse"];

const App: React.FC = () => {
  const [provinceInput, setProvinceInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [filteredProvinces, setFilteredProvinces] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const handleProvinceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProvinceInput(value);
    setFilteredProvinces(provinces.filter(province => province.toLowerCase().includes(value.toLowerCase())));
  };

  const handleCityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCityInput(value);
    setFilteredCities(cities.filter(city => city.toLowerCase().includes(value.toLowerCase())));
  };

  const handleProvinceSelect = (selectedProvince: string) => {
    setProvinceInput(selectedProvince);
    setFilteredProvinces([]);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCityInput(selectedCity);
    setFilteredCities([]);
  };

  return (
    <div className="App">
      <h1>Select Your Location</h1>
      <div className="input-container">
        <label>Province/Territory:</label>
        <input
          type="text"
          value={provinceInput}
          onChange={handleProvinceInputChange}
          placeholder="Type to search..."
        />
        {filteredProvinces.length > 0 && (
          <ul className="dropdown">
            {filteredProvinces.map((province, index) => (
              <li key={index} onClick={() => handleProvinceSelect(province)}>
                {province}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="input-container">
        <label>City:</label>
        <input
          type="text"
          value={cityInput}
          onChange={handleCityInputChange}
          placeholder="Type to search..."
        />
        {filteredCities.length > 0 && (
          <ul className="dropdown">
            {filteredCities.map((city, index) => (
              <li key={index} onClick={() => handleCitySelect(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
