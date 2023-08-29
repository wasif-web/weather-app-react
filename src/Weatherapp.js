// WeatherApp.js
import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import './WeatherApp.css';

const API_KEY = 'a8b18125b63f75b7edb90430d2e108a0'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeather(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setError('City not found. Please enter a valid city name.');
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  const getWeatherIcon = (weatherMain) => {
    // Your icon mapping logic here
  };

  return (
    <div className="weather-app">
      <nav className="navbar">
        <h1>Weather App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button onClick={fetchWeather}>
            <FiSearch />
          </button>
        </div>
      </nav>
      <div className="content">
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>
              {weather.weather[0].description} <i className={`fas ${getWeatherIcon(weather.weather[0].main)}`}></i>
            </p>
            <p>Temperature: {weather.main.temp}°C <i className="fas fa-thermometer-half"></i></p>
            <p>
              Humidity: {weather.main.humidity}% <i className="fas fa-tint"></i>
            </p>
            <p>
              Wind Speed: {weather.wind.speed} km/h <i className="fas fa-wind"></i>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
