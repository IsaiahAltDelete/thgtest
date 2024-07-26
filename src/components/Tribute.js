import React from 'react';

const Tribute = ({ id, name, district, gender, age, health, hunger, weapon, alliances, isAlive, placement }) => (
  <div className={`tribute ${isAlive ? '' : 'dead'}`} id={`tribute-${id}`}>
    <div>{name.split(' ')[0]}</div>
    <div>District {district}</div>
    <div>{gender} {age}</div>
    <div className="health-bar">
      <div className="health-bar-fill" style={{ width: `${health}%` }}></div>
    </div>
    <div className="hunger-bar">
      <div className="hunger-bar-fill" style={{ width: `${hunger}%` }}></div>
    </div>
    <div className="weapon">{weapon || '🤲'}</div>
    {!isAlive && <div className="placement">{placement}</div>}
    <div className="alliances">{alliances.length > 0 ? `Allies: ${alliances.join(', ')}` : ''}</div>
  </div>
);

export default Tribute;
