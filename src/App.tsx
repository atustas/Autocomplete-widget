// src/App.tsx

import React, { useState, ChangeEvent } from 'react';
import './App.css';

const provinces = [
  "Ontario", 
  "Quebec", 
  "British Columbia", 
  "Alberta", 
  "Manitoba", 
  "New Brunswick", 
  "Newfoundland and Labrador", 
  "Northwest Territories", 
  "Nova Scotia", 
  "Nunavut", 
  "Prince Edward Island", 
  "Saskatchewan", 
  "Yukon"
];


const cities = [
  "Toronto", 
  "Ottawa", 
  "Mississauga", 
  "Montreal", 
  "Quebec City", 
  "Laval", 
  "Vancouver", 
  "Victoria", 
  "Surrey", 
  "Calgary", 
  "Edmonton", 
  "Red Deer", 
  "Winnipeg", 
  "Halifax", 
  "Charlottetown", 
  "Whitehorse"
];


const App: React.FC = () => {
  const [provinceInput, setProvinceInput] = useState<string>('');
  const [cityInput, setCityInput] = useState<string>('');
  const [filteredProvinces, setFilteredProvinces] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const handleProvinceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProvinceInput(value);
    if (value) {
      setFilteredProvinces(provinces.filter(province => province.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setFilteredProvinces([]);
    }
  };

  const handleCityInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value);
    if (value) {
      setFilteredCities(cities.filter(city => city.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setFilteredCities([]);
    }
  };

  const handleProvinceSelect = (province: string) => {
    setProvinceInput(province);
    setFilteredProvinces([]);
  };

  const handleCitySelect = (city: string) => {
    setCityInput(city);
    setFilteredCities([]);
  };

  return (
    <div className="App">
      <h1>Select Your Location</h1>
      <div className="input-row">
        <label className="label">Province:</label>
        <div className="input-container">
          <input
            type="text"
            value={provinceInput}
            onChange={handleProvinceInputChange}
            placeholder="Type to search..."
            className="input-field"
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
      </div>
      <div className="input-row">
        <label className="label">City:</label>
        <div className="input-container">
          <input
            type="text"
            value={cityInput}
            onChange={handleCityInputChange}
            placeholder="Type to search..."
            className="input-field"
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
    </div>
  );
};

export default App;
