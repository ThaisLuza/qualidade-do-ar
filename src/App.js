import React, { useState, useEffect } from "react";
import axios from "axios";
import AirQualityList from "./components/list";
import CitySelector from "./components/selector";
const apiKey =
  "78eb2dd59fbd6be155fd4746cac3bc42e10292779795638ecd3c3d6d4ed1e9ae";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Guarulhos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/v2/measurements', {
          headers: {
            'x-api-key': apiKey, 
          },
          params: {
            limit: 1000,
            country: 'BR'
          },
        });
  
        setData(response.data.results);
      } catch (err) {
        console.log('err', err);
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
      <CitySelector setCity={setCity} />
      <AirQualityList data={data} />
    </div>
  );
}

export default App;
