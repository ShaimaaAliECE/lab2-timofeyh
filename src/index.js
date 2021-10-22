import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Player } from './Player';
import { ConnectFour } from './ConnectFour';
import './index.css';

const App = () =>  {
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(7);
  const [simple, setSimple] = useState(true);
  const [players, setPlayers] = useState([new Player(0, 'Player1', 'red'), new Player(1, 'Player2', 'yellow')]);
  const [gameOver, setGameOver] = useState(-2);
  const [newPlayer, setNewPlayer] = useState({});

  useEffect(() => {
    const addScore = (p, index, won) => {
      let out  =[...p];
      for (let i = 0; i < out.length; i++) {
        let player = {...out[i]};
        if (won) {
          if (i === index) player.wins++;
          else player.losses++;
        } else player.ties++;
        out[i] = player;
      }
      return out;
    }
    if (gameOver > 0) {
      setPlayers((p) => addScore(p, gameOver-1, true));
    } else if (gameOver === -1) setPlayers((p) => addScore(p, gameOver-1, false));
    else if (gameOver === -3) setGameOver(0);
  },[gameOver]);

  useEffect(() => {
    if (!playersNormalized(players)) {
       setPlayers(p => resetIDs(p));
    }
  },[players]);

  let listPlayers = (list) => {
    if (list.length === 0) return;
    let out = list.map(
      p => 
        <label 
          key={p.id} 
          className="player"
        >
          {p.name} W/D/L: <br></br> {p.wins}/{p.ties}/{p.losses}
          <button 
            className="playerToken" 
            style={{backgroundColor: p.color}}
            onClick={() => setPlayers(player => player = removePlayer(p.id, player))}
          > - </button>
        </label>
      );
    return out;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayers(player => ([...addPlayer(newPlayer.name, newPlayer.color, player)]))
    setNewPlayer({name: '', color: ''})
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;
    setNewPlayer(vals => ({...vals, [name] : val}))
  }

  let renderScreen = () => {
    let out;
    if (gameOver === -1 || gameOver > 0) {
      console.log(gameOver)
      console.log(players[gameOver-1])
      out = (
        <>
            <ConnectFour rows={rows} cols={cols} simple={simple} players={players} gameOver={() => null} reset={gameOver}/>
          <span
            className="winscreen" 
          >
            <text className="winText">{gameOverMessage(gameOver, players)}</text>
            <button 
              className="winBtn"
              onClick={() => setGameOver(-3)}
            >
            Play Again
            </button>
            <button 
              className="winBtn"
              onClick={() => setGameOver(-2)}
            >
            Main Menu
            </button>
          </span>
        </>
      );
    } else if (gameOver === -2) {
      out = (
          <div className="welcomeScreen">
            <label className="titleText">Connect Four</label>
            <label className="currentSize">{'('+cols+' x '+rows+')'}</label>
            <button 
              className="playBtn"
              onClick={() => setGameOver(c => c = 0)}
            > Play </button>
            <button 
              className="modeBtn"
              onClick={() => setSimple(s => (!s))}
              style={{backgroundColor: toggleSimpleCss(simple)}}
            > Simple </button>
            <span className="changeGrid">
              <button 
                className="updwnBtn"
                onClick={() => setCols(c => (c-1))}
              > - </button>
              <button className="gridBtn">←Cols→</button>
              <button 
                className="updwnBtn"
                onClick={() => setCols(c => (c+1))}
              > + </button>
              <button 
                className="updwnBtn"
                onClick={() => setRows(r => (r-1))}
              > - </button>
              <button className="gridBtn">↑ Rows ↓</button>
              <button 
                className="updwnBtn"
                onClick={() => setRows(r => (r+1))}
              > + </button>
            </span>
            <form className="addPlayer" onSubmit={handleSubmit}>
              <input 
                className="inputs" 
                type="text" 
                name="name"
                value={newPlayer.name || ""}
                onChange={handleChange}
              />
              <input 
                className="inputs"
                name="color"
                type="text"
                style={{color:newPlayer.color || ""}}
                value={newPlayer.color}
                onChange={handleChange}
              />
              <button 
                type="submit"
                className="playersBtn"
              > + </button>
            </form>
            <div className="playerList">
              {listPlayers(players)}
            </div>
          </div>
      );
    } else if (gameOver === 0) {
      if (players.length >= 2)  out = <ConnectFour rows={rows} cols={cols} simple={simple} players={players} gameOver={(p) => setGameOver(g=> g = p)}/>;
      else (setGameOver(-2));
    } 
    return (
      <div className="container">
        {out}
      </div>
    );
  }

  return renderScreen();
} 

const playersNormalized = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id !== i) return false;
  }
  return true;
};

const resetIDs = (list) => {
  let out = [...list];
  for (let i = 0; i < out.length; i++) {
    out[i] = new Player(i, out[i].name, out[i].color)
  }
  return out;
}

const gameOverMessage = (num, list) => {
  if (num > 0) return "Winner: " + list[num-1].name;
  if (num === -1) return "Draw";
}

const toggleSimpleCss = (isOn) => {
  if (isOn) return 'green';
  else return 'cornflowerblue';
};

const removePlayer = (id, list) => {
  let out = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].id !== id) out.push({...list[i]});
  }
  return out;
};

const addPlayer = (pName, pColor, list) => {
  return [...list, new Player(list.length, String(pName), String(pColor))];
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
