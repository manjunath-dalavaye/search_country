import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store all countries
  const [countries, setCountries] = useState([]);
  
  // State to store filtered countries based on search term
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  // State to store the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect to fetch countries from the API on initial render
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // useEffect to filter countries based on the search term
  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [countries, searchTerm]);

  return (
    <div className="app">
      {/* Input for searching countries */}
      <input
        type="text"
        id="searchInput"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Container for displaying country cards */}
      <div className="countries-container">
        {/* Map through filteredCountries and display a card for each country */}
        {filteredCountries.map(country => (
          <div key={country.cca2} className="country-card">
            {/* Display country flag */}
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="flag-image"
            />
            
            {/* Display country name */}
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
