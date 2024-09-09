

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeather } from '../services/apiService';
import { WeatherData } from '../types';
import './WeatherPage.css';

const WeatherPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const data = await fetchWeather(cityName!);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  if (loading) return <p>Loading weather data...</p>;
  if (!weatherData) return <p>No data available</p>;

  const weatherCondition = weatherData.weather[0].main.toLowerCase();
  document.body.style.backgroundImage = `url(/images/${weatherCondition}.jpg)`;

  return (
    <div className="weather-page">
      <h2>{weatherData.name} Weather</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherPage;
