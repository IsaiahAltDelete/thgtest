import React, { useState, useEffect } from 'react';
import Header from './Header';
import Controls from './Controls';
import Scoreboard from './Scoreboard';
import VictorsList from './VictorsList';
import Settings from './Settings';
import Log from './Log';
import Tribute from './Tribute';
import '../App.css'; // Update the path to the correct location of App.css

const skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿'];
const genders = ['♂️', '♀️'];
const weapons = ['🗡️', '🏹', '🪓', '🔪', '🔨', '⚔️'];
const districts = Array.from({ length: 12 }, (_, i) => i + 1);
const weatherTypes = ['☀️', '🌧️', '⛈️', '❄️', '🌫️'];

const firstNames = ['Aria', 'Zephyr', 'Nova', 'Caspian', 'Luna', 'Orion', 'Sage', 'Phoenix', 'Lyra', 'Atlas', 'Kai', 'Jade', 'Ezra', 'Rowan', 'Skye', 'Ember', 'Ash', 'Finn', 'Quinn', 'Raven', 'Eden', 'Reed', 'Jett', 'Milo', 'Ivy', 'Faye', 'Blake', 'Coral', 'Dane', 'Wren', 'Leo', 'Mara', 'Avery', 'Asher', 'Harper', 'River', 'Storm', 'Indigo', 'Zara', 'Silas', 'Riley', 'Kendall', 'Jordan', 'Morgan', 'Casey', 'Taylor', 'Reese', 'Alex', 'Skyler', 'Blair', 'Remy', 'Peyton', 'Quincy', 'Rowan', 'Sydney', 'Dylan', 'Logan', 'Parker', 'Rory', 'Sloan', 'Amara', 'Beau', 'Chance', 'Dahlia', 'Elliot', 'Freya', 'Gideon', 'Hazel', 'Isla', 'Jasper', 'Kira', 'Lachlan', 'Maeve', 'Nico', 'Opal', 'Piper', 'Quinn', 'Rafael', 'Sierra', 'Teagan', 'Ulric', 'Vera', 'Wyatt', 'Xander', 'Yara', 'Zane'];

const lastNames = ['Frost', 'Storm', 'Wilde', 'Blackwood', 'Rivers', 'Sky', 'Stone', 'Moon', 'Flame', 'Star', 'Vale', 'Haven', 'Thorne', 'Winter', 'Ember', 'Blaze', 'Shadow', 'Lark', 'Fable', 'Noble', 'Brook', 'Shade', 'Finch', 'Knight', 'Gale', 'Hunter', 'Fox', 'Ash', 'Viper', 'Falcon', 'Moss', 'Reed', 'Bluff', 'Dune', 'Pine', 'Grove', 'Heath', 'Marsh', 'Glade', 'Field', 'Cliff', 'Meadow', 'Ridge', 'Holt', 'Cove', 'Dell', 'Fern', 'Leaf', 'Briar', 'Vale', 'Knightley', 'Black', 'Dusk', 'Hart', 'Whisper', 'Shade', 'Bright', 'Crest', 'Hollow', 'Dawn', 'Evergreen', 'Fable', 'Glimmer', 'Haze', 'Jewel', 'Kite', 'Loom', 'Mist', 'Night', 'Owl', 'Petal', 'Quest', 'Rune', 'Stone', 'Thyme', 'Underwood', 'Vine', 'Warden', 'Xane', 'Yew', 'Zenith'];

const generateUniqueName = (usedNames, usedFirstNames) => {
  let name;
  let firstName;
  do {
    firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    name = `${firstName} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  } while (usedNames.has(name) || usedFirstNames.has(firstName));
  usedNames.add(name);
  usedFirstNames.add(firstName);
  return name;
};

const generatePersonality = () => {
  const personalities = ['aggressive', 'cautious', 'loyal', 'treacherous'];
  return personalities[Math.floor(Math.random() * personalities.length)];
};

const generateTributes = () => {
  const usedNames = new Set();
  const usedFirstNames = new Set();
  let tributes = [];

  districts.forEach(district => {
    const maleName = generateUniqueName(usedNames, usedFirstNames);
    const femaleName = generateUniqueName(usedNames, usedFirstNames);
    tributes.push({
      id: tributes.length + 1,
      name: maleName,
      health: 100,
      hunger: 100,
      isAlive: true,
      isBleeding: false,
      kills: 0,
      district: district,
      emoji: `👨${skinTones[Math.floor(Math.random() * skinTones.length)]}`,
      gender: '♂️',
      age: Math.floor(Math.random() * 8) + 12,
      weapon: null,
      personality: generatePersonality(),
      injuries: [],
      alliances: [],
      actions: 0
    });
    tributes.push({
      id: tributes.length + 1,
      name: femaleName,
      health: 100,
      hunger: 100,
      isAlive: true,
      isBleeding: false,
      kills: 0,
      district: district,
      emoji: `👩${skinTones[Math.floor(Math.random() * skinTones.length)]}`,
      gender: '♀️',
      age: Math.floor(Math.random() * 8) + 12,
      weapon: null,
      personality: generatePersonality(),
      injuries: [],
      alliances: [],
      actions: 0
    });
  });

  return tributes;
};

const getVictorsFromStorage = () => JSON.parse(localStorage.getItem('victors')) || [];

const saveVictorToStorage = (victor) => {
  const victors = getVictorsFromStorage();
  victors.push(victor);
  localStorage.setItem('victors', JSON.stringify(victors));
};

const clearVictorsFromStorage = () => {
  localStorage.removeItem('victors');
};

const App = () => {
  const [tributes, setTributes] = useState(generateTributes());
  const [events, setEvents] = useState([]);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [placementCounter, setPlacementCounter] = useState(24);
  const [currentWeather, setCurrentWeather] = useState('');
  const [victors, setVictors] = useState(getVictorsFromStorage());
  const [eventFrequency, setEventFrequency] = useState(5);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (!gameOver) {
      const newIntervalId = setInterval(() => {
        generateEvent();
        gameLoop();
      }, 2000 / eventFrequency);
      setIntervalId(newIntervalId);
    }
  }, [eventFrequency, gameOver]);

  const startSimulation = () => {
    if (!intervalId) {
      const newIntervalId = setInterval(() => {
        generateEvent();
        gameLoop();
      }, 2000 / eventFrequency);
      setIntervalId(newIntervalId);
    }
  };

  const pauseSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const resumeSimulation = () => {
    if (!intervalId && !gameOver) {
      const newIntervalId = setInterval(() => {
        generateEvent();
        gameLoop();
      }, 2000 / eventFrequency);
      setIntervalId(newIntervalId);
    }
  };

  const restartSimulation = () => {
    setTributes(generateTributes());
    setEvents([]);
    setGameOver(false);
    setDay(1);
    setHour(6);
    setPlacementCounter(24);
    setCurrentWeather('');
    setVictors(getVictorsFromStorage());
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    startSimulation();
  };

  const clearVictors = () => {
    clearVictorsFromStorage();
    setVictors([]);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  const generateEvent = () => {
    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length <= 1) return;

    const eventTypes = [
      { type: 'nothing', weight: 2 },
      { type: 'death', weight: 1 },
      { type: 'fight', weight: hour >= 6 && hour < 18 ? 3 : 1 },
      { type: 'alliance', weight: 2 },
      { type: 'resource', weight: 3 },
      { type: 'heal', weight: 2 },
      { type: 'trap', weight: 1 },
      { type: 'weather', weight: 0.5 },
      { type: 'accident', weight: 1 },
      { type: 'poison', weight: 1 },
      { type: 'starvation', weight: 1 },
      { type: 'wildAnimal', weight: hour >= 6 && hour < 18 ? 1 : 2 },
      { type: 'naturalDisaster', weight: 0.5 },
      { type: 'disease', weight: 1 }
    ];

    const totalWeight = eventTypes.reduce((sum, event) => sum + event.weight, 0);
    let random = Math.random() * totalWeight;

    for (let event of eventTypes) {
      if (random < event.weight) {
        if (event.type === 'nothing') {
          return addEvent('Nothing significant happens this hour.', 'nothing');
        }

        const tribute1 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        let tribute2 = null;
        do {
          tribute2 = aliveTributes[Math.floor(Math.random() * aliveTributes.length)];
        } while (tribute1.id === tribute2.id);

        switch (event.type) {
          case 'death':
            tribute1.isAlive = false;
            tribute1.health = 0;
            tribute1.placement = placementCounter--;
            return addEvent(`${tribute1.name} has died in the arena.`, 'death');
          case 'fight':
            let damage = Math.floor(Math.random() * 30) + 10;
            if (Math.random() < 0.25) {
              damage = tribute2.health;
              addEvent('INSTANT KILL!', 'fight');
            }
            if (tribute1.weapon) {
              damage += 20;
            }
            tribute2.health = Math.max(0, tribute2.health - damage);
            tribute1.actions++;
            tribute2.actions++;
            if (tribute2.health === 0) {
              tribute2.isAlive = false;
              tribute2.placement = placementCounter--;
              tribute1.kills += 1;
            }
            return addEvent(
              `${tribute1.name} attacks ${tribute2.name} with ${tribute1.weapon || 'bare hands'}, dealing ${damage} damage!${tribute2.health === 0 ? ` ${tribute2.name} has died!` : ''}`,
              tribute2.health === 0 ? 'death' : 'fight'
            );
          case 'alliance':
            if (!tribute1.alliances.includes(tribute2.id) && Math.random() < 0.4 && tribute1.district === tribute2.district) {
              tribute1.alliances.push(tribute2.id);
              tribute2.alliances.push(tribute1.id);
              tribute1.actions++;
              tribute2.actions++;
              return addEvent(`${tribute1.name} and ${tribute2.name} form an uneasy alliance.`, 'alliance');
            }
            if (!tribute1.alliances.includes(tribute2.id) && Math.random() < 0.4) {
              tribute1.alliances.push(tribute2.id);
              tribute2.alliances.push(tribute1.id);
              tribute1.actions++;
              tribute2.actions++;
              return addEvent(`${tribute1.name} and ${tribute2.name} form an uneasy alliance.`, 'alliance');
            }
            break;
          case 'resource':
            if (!tribute1.weapon) {
              tribute1.weapon = weapons[Math.floor(Math.random() * weapons.length)];
              tribute1.actions++;
              return addEvent(`${tribute1.name} finds a ${tribute1.weapon}!`, 'resource');
            }
            tribute1.hunger = Math.min(100, tribute1.hunger + 30);
            tribute1.actions++;
            return addEvent(`${tribute1.name} discovers a hidden cache of supplies.`, 'resource');
          case 'heal':
            const healAmount = Math.floor(Math.random() * 30) + 10;
            tribute1.health = Math.min(100, tribute1.health + healAmount);
            tribute1.actions++;
            return addEvent(`${tribute1.name} finds medicine and heals ${healAmount} health.`, 'heal');
          case 'trap':
            const trapDamage = Math.floor(Math.random() * 40) + 10;
            tribute1.health = Math.max(0, tribute1.health - trapDamage);
            tribute1.actions++;
            if (tribute1.health === 0) {
              tribute1.isAlive = false;
              tribute1.placement = placementCounter--;
            }
            return addEvent(`${tribute1.name} falls into a trap, taking ${trapDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'trap');
          case 'weather':
            const weatherEvents = ['A sudden storm hits the arena', 'The temperature drops dramatically', 'A thick fog descends on the arena', 'The arena is engulfed in complete darkness'];
            const weatherDamage = Math.floor(Math.random() * 20) + 5;
            tributes.forEach(t => {
              if (t.isAlive) {
                t.health = Math.max(0, t.health - weatherDamage);
                t.actions++;
                if (t.health === 0) {
                  t.isAlive = false;
                  t.placement = placementCounter--;
                }
              }
            });
            setCurrentWeather(weatherTypes[Math.floor(Math.random() * weatherTypes.length)]);
            return addEvent(`${weatherEvents[Math.floor(Math.random() * weatherEvents.length)]}, affecting all tributes by ${weatherDamage} damage.`, 'weather');
          case 'accident':
            const accidentDamage = Math.floor(Math.random() * 40) + 10;
            tribute1.health = Math.max(0, tribute1.health - accidentDamage);
            tribute1.actions++;
            if (tribute1.health === 0) {
              tribute1.isAlive = false;
              tribute1.placement = placementCounter--;
            }
            return addEvent(`${tribute1.name} has an accident and takes ${accidentDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'accident');
          case 'poison':
            const poisonDamage = Math.floor(Math.random() * 30) + 20;
            tribute1.health = Math.max(0, tribute1.health - poisonDamage);
            tribute1.actions++;
            if (tribute1.health === 0) {
              tribute1.isAlive = false;
              tribute1.placement = placementCounter--;
            }
            return addEvent(`${tribute1.name} is poisoned and takes ${poisonDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'poison');
          case 'starvation':
            tribute1.health = 0;
            tribute1.isAlive = false;
            tribute1.placement = placementCounter--;
            return addEvent(`${tribute1.name} has died of starvation.`, 'death');
          case 'wildAnimal':
            const animalDamage = Math.floor(Math.random() * 40) + 10;
            tribute1.health = Math.max(0, tribute1.health - animalDamage);
            tribute1.actions++;
            if (tribute1.health === 0) {
              tribute1.isAlive = false;
              tribute1.placement = placementCounter--;
            }
            return addEvent(`${tribute1.name} is attacked by a wild animal and takes ${animalDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'wildAnimal');
          case 'naturalDisaster':
            const disasterEvents = ['A massive earthquake shakes the arena', 'A wildfire spreads rapidly', 'A flash flood sweeps through the arena', 'A landslide crushes everything in its path'];
            const disasterDamage = Math.floor(Math.random() * 30) + 20;
            tributes.forEach(t => {
              if (t.isAlive) {
                t.health = Math.max(0, t.health - disasterDamage);
                t.actions++;
                if (t.health === 0) {
                  t.isAlive = false;
                  t.placement = placementCounter--;
                }
              }
            });
            return addEvent(`${disasterEvents[Math.floor(Math.random() * disasterEvents.length)]}, affecting all tributes by ${disasterDamage} damage.`, 'naturalDisaster');
          case 'disease':
            const diseaseDamage = Math.floor(Math.random() * 30) + 10;
            tribute1.health = Math.max(0, tribute1.health - diseaseDamage);
            tribute1.actions++;
            if (tribute1.health === 0) {
              tribute1.isAlive = false;
              tribute1.placement = placementCounter--;
            }
            return addEvent(`${tribute1.name} contracts a disease and takes ${diseaseDamage} damage!${tribute1.health === 0 ? ` ${tribute1.name} has died!` : ''}`, tribute1.health === 0 ? 'death' : 'disease');
        }
      }
      random -= event.weight;
    }
  };

  const gameLoop = () => {
    const updatedTributes = tributes.map(tribute => {
      if (tribute.isAlive) {
        tribute.hunger = Math.max(0, tribute.hunger - 1);
        if (tribute.hunger === 0 && tribute.health < 100) {
          tribute.health = Math.max(0, tribute.health - 10);
          if (tribute.health === 0) {
            tribute.isAlive = false;
            tribute.placement = placementCounter--;
          }
        }
      }
      return tribute;
    });

    setTributes(updatedTributes);
  };

  const addEvent = (message, type) => {
    const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    const newEvent = { message: `${formattedHour} - ${message}`, type };
    setEvents([...events, newEvent]);
  };

  useEffect(() => {
    const aliveTributes = tributes.filter(t => t.isAlive);
    if (aliveTributes.length <= 1) {
      setGameOver(true);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      if (aliveTributes.length === 1) {
        const victor = `${aliveTributes[0].name} from District ${aliveTributes[0].district}`;
        addEvent(`${victor} is the victor of The Hunger Games!`, 'victory');
        saveVictorToStorage(victor);
        setVictors(getVictorsFromStorage());
      } else {
        addEvent("There are no survivors. The arena stands silent.", 'gameOver');
      }
    }
  }, [tributes]);

  useEffect(() => {
    const tick = () => {
      if (!gameOver) {
        setHour(prev => (prev + 1) % 24);
        if (hour === 23) {
          setDay(prev => prev + 1);
        }
      }
    };

    const timerId = setInterval(tick, 1000);
    return () => clearInterval(timerId);
  }, [hour, gameOver]);

  return (
    <div className="container">
      <Header day={day} hour={hour} currentWeather={currentWeather} />
      <div className="main-content">
        <div className="tributes">
          {tributes.map(tribute => (
            <Tribute key={tribute.id} {...tribute} />
          ))}
        </div>
        <div className="side-content">
          <Controls
            startSimulation={startSimulation}
            pauseSimulation={pauseSimulation}
            resumeSimulation={resumeSimulation}
            restartSimulation={restartSimulation}
            clearVictors={clearVictors}
            toggleDarkMode={toggleDarkMode}
          />
          <Scoreboard tributes={tributes} />
          <VictorsList victors={victors} toggleVictorsList={() => {}} />
          <Settings eventFrequency={eventFrequency} setEventFrequency={setEventFrequency} />
        </div>
      </div>
      <Log events={events} />
    </div>
  );
};

export default App;
