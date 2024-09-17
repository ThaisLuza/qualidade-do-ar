import React, { useState } from "react";
import axios from "axios";
import styles from './AirQualityApp.module.css';

const apiKey = "78eb2dd59fbd6be155fd4746cac3bc42e10292779795638ecd3c3d6d4ed1e9ae";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Para navegação entre os dados

  const parameterMapping = {
    pm25: "Partículas Finas (PM2.5)",
    pm10: "Partículas Grossas (PM10)",
    o3: "Ozônio (O3)",
    no2: "Dióxido de Nitrogênio (NO2)",
    so2: "Dióxido de Enxofre (SO2)",
    co: "Monóxido de Carbono (CO)",
    no: "Monóxido de Nitrogênio"
  };

  const fetchData = async () => {
    setLoading(true);
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
      setCurrentIndex(Math.floor(Math.random() * response.data.results.length)); // Define o índice aleatório
    } catch (err) {
      console.log('err', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextData = () => {
    if (data.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length); // Avança o índice
    }
  };

  const randomIndex = Math.floor(Math.random() * data.length);

  return (
    <div className={styles.appContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Qualidade do ar</h1>
          <button
            className={styles.refreshBtn}
            onClick={fetchData}
          >
            🔄 Carregar Dados
          </button>
          <button
            className={styles.refreshBtn}
            onClick={handleNextData}
          >
            ▶️ Próximo
          </button>
        </div>
        
        <div className={styles.location}>
          {loading ? 'Carregando localização...' : data.length ? data[currentIndex]?.location : ''}
        </div>
        
        <div className={styles.airQualityCircle}>
          <div className={styles.aqiValue}>
            <span className={styles.parameter}>
              {loading ? 'Carregando...' : data.length ? parameterMapping[data[randomIndex]?.parameter] || data[randomIndex]?.parameter : 'Parâmetro'}
            </span>
            <span className={styles.value}>
              {loading ? 'Carregando...' : data.length ? data[randomIndex]?.value : '0'}
            </span>
          </div>
          {loading && <div className={styles.loader}></div>}
        </div>
        
        <div className={styles.status}>
          {data.length ? 'Qualidade do ar carregada' : 'Definindo qualidade do ar...'}
        </div>
        
        <div className={styles.footer}>
          <p>Segure o botão para mais detalhes</p>
        </div>
      </div>
    </div>
  );
}

export default App;
