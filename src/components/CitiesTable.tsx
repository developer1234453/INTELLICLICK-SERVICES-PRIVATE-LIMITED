

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import { City } from '../types';
import './CitiesTable.css';

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?start=${(page - 1) * 10}&rows=10&disjunctive.cou_name_en&sort=name`);
        setCities(prev => [...prev, ...response.data.records]);
      } catch (error) {
        console.error("Error fetching cities data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [page]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCities = cities.filter(city =>
    city.fields.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cities-table">
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading cities data...</p>}
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.recordid}>
              <td><a href={`/weather/${city.fields.name}`}>{city.fields.name}</a></td>
              <td>{city.fields.cou_name_en}</td>
              <td>{city.fields.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(prev => prev + 1)} disabled={loading}>
        Load More
      </button>
    </div>
  );
};

export default CitiesTable;
