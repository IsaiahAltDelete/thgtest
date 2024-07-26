import React from 'react';

const Controls = ({ startSimulation, pauseSimulation, resumeSimulation, restartSimulation, clearVictors, toggleDarkMode }) => (
  <div className="controls">
    <button onClick={startSimulation}>Start</button>
    <button onClick={pauseSimulation}>Pause</button>
    <button onClick={resumeSimulation}>Resume</button>
    <button onClick={restartSimulation}>Restart</button>
    <button onClick={clearVictors}>Clear Victors</button>
    <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
  </div>
);

export default Controls;
