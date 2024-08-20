import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AirQualityList from './components/list';
import CitySelector from './components/selector';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('data', data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.openaq.org/v2/measurements', {
          params: {
            country: 'BR'
          }
        });
        setData(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <CitySelector   />
      <AirQualityList data={data}/>
    </div>
  );
}

export default App;
