import React from 'react';

const Settings = ({ eventFrequency, setEventFrequency }) => (
  <div className="settings">
    <h3>Settings</h3>
    <label htmlFor="event-frequency">Event Frequency:</label>
    <input
      type="range"
      id="event-frequency"
      name="event-frequency"
      min="1"
      max="10"
      value={eventFrequency}
      onChange={(e) => setEventFrequency(e.target.value)}
    />
  </div>
);

export default Settings;
