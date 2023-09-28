
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(12);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [countrySearch, setCountrySearch] = useState([]);
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const minRangeValue = "1";
  const maxRangeValue = "250";

  // Le useEffect se joue quand le components est monte
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, [])

  return (
    <div className='countries'>
      <ul className='radio-container'>
        <input
          type="range"
          min={minRangeValue}
          max={maxRangeValue}
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.valueAsNumber)}
        />
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              id={continent}
              checked={continent === selectedRadio}
              name='continentRadio'
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
        <input
          className='searchButton'
          type="text"
          onChange={(e) => setCountrySearch([e.target.value])}
        />
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>Cancel the search</button>
      )}
      <ul>
        {
          data
            .filter((country) => country.continents[0].includes(selectedRadio))
            .filter((country) =>
              country.translations.fra.common
                .match(RegExp(countrySearch.map(term =>
                  `(?=.*${term})`).join(''), 'i'))
            )
            .sort((a, b) => b.population - a.population)
            .slice(0, rangeValue)
            .map((country, index) =>
              <Card key={index} country={country} />
            )
        }
      </ul>
    </div>
  );
};

export default Countries;