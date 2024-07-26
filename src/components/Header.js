import React from 'react';

const Header = ({ day, hour, currentWeather }) => (
  <div className="header">
    <h1>THE HUNGER GAMES</h1>
    <div className="day-counter">
      <span id="day-card">
        <span className="day-night-icon" id="day-night-icon">
          {hour >= 6 && hour < 18 ? '☀️' : '🌙'}
        </span>
        <span className="weather-icon" id="weather-icon">{currentWeather}</span>
        <div>Day: <span id="day">{day}</span></div>
        <div>Time: <span id="time">{hour < 10 ? `0${hour}:00` : `${hour}:00`}</span></div>
      </span>
    </div>
  </div>
);

export default Header;
