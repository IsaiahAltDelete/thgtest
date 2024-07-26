import React from 'react';

const Log = ({ events }) => (
  <div className="log">
    {events.map((event, index) => (
      <div key={index} className={`event ${event.type}`}>{event.message}</div>
    ))}
  </div>
);

export default Log;
