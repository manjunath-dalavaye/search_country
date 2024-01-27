import React, { useState, useEffect } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [countries, searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredCountries.map(country => (
          <div key={country.cca2} style={{ margin: '10px', textAlign: 'center' }}>
            <img
              src={country.flags.png}
              alt={country.name.common}
              style={{ width: '100px', height: 'auto', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
