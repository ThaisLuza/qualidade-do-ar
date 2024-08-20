import React from 'react';
import { pollutantNames } from '../utils/pollutantName';

const AirQualityItem = ({ parameter, value, unit, date }) => {

 const pollutantName = pollutantNames[parameter] || parameter;
  return (
    <li>
      {pollutantName}: {value} {unit} (medido em {new Date(date.local).toLocaleString()})
    </li>
  );
};

const AirQualityGroup = ({ location, data }) => {
  return (
    <div>
      <h2>{location}</h2>
      <ul>
        {data.map((item, index) => (
          <AirQualityItem
            key={index}
            parameter={item.parameter}
            value={item.value}
            unit={item.unit}
            date={item.date}
          />
        ))}
      </ul>
    </div>
  );
};

const AirQualityList = ({ data }) => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.location]) {
      acc[item.location] = [];
    }
    acc[item.location].push(item);
    return acc;
  }, {});

  return (
    <div>
      <h1>Qualidade do Ar</h1>
      {Object.keys(groupedData).map((location) => (
        <AirQualityGroup key={location} location={location} data={groupedData[location]} />
      ))}
    </div>
  );
};

export default AirQualityList;
