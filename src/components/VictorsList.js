import React from 'react';

const VictorsList = ({ victors, toggleVictorsList }) => (
  <div className="victors-list">
    <h3 onClick={toggleVictorsList}>Previous Victors</h3>
    <div className="victors-content">
      {victors.map((victor, index) => (
        <div key={index} className="victor-item">{index + 1} - {victor}</div>
      ))}
    </div>
  </div>
);

export default VictorsList;
