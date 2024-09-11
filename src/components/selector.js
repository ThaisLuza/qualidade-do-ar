import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CitySelector = ({setCity}) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://api.openaq.org/v2/cities', {
          params: {
            country: 'BR'
          }
        });
        setCities(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setCity(event.target.value);
    
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-label">Cidade</InputLabel>
      <Select
        labelId="city-label"
        value={selectedCity}
        onChange={handleCityChange}
      >
        {cities.map((city) => (
          <MenuItem key={city.city} value={city.city}>
            {city.city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector;
