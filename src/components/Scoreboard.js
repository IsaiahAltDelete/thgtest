import React from 'react';

const Scoreboard = ({ tributes }) => {
  const aliveTributes = tributes.filter(t => t.isAlive);
  const mostKills = Math.max(...tributes.map(t => t.kills));
  const tributeWithMostKills = tributes.find(t => t.kills === mostKills && mostKills > 0);
  const mostActions = Math.max(...tributes.map(t => t.actions));
  const tributeWithMostActions = tributes.find(t => t.actions === mostActions);

  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <div>Tributes Left: <span>{aliveTributes.length}</span></div>
      <div>Most Kills: <span>{mostKills > 0 ? mostKills : '0'}</span> (<span>{tributeWithMostKills ? tributeWithMostKills.name : 'N/A'}</span>)</div>
      <div>Fan Favorite: <span>{tributeWithMostActions ? tributeWithMostActions.name : 'N/A'}</span></div>
    </div>
  );
};

export default Scoreboard;
