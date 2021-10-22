import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Player } from './Player';
import { ConnectFour } from './ConnectFour';
import './index.css';

const App = () =>  {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(12);
  const [simple, setSimple] =useState(false);
  const [players, setPlayers] = useState([]);
  const [gameOver, setGameOver] = useState(-2);
  const [name, setName] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    if (gameOver > 0) {
      setPlayers(p => [...p, {...p[gameOver-1]}]);
    }
  },[gameOver]);

  useEffect(() => {
    if (!playersNormalized(players)) {
       setPlayers(p => [...resetIDs(p)]);
    }
    return (console.log(players));
  },[players]);

  const playersNormalized = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id !== i) return false;
    }
    return true;
  };

  const togglePopUp = (num) => {
    if (num === 0) return false;
    return true;
  }

  const resetIDs = (list) => {
    let out = [...list];
    for (let i = 0; i < out.length; i++) {
      out[i].id = i;
    }
    return out;
  }

  const gameOverMessage = (num) => {
    if (num > 0) return "Winner: " + players[num-1].name;
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
    let out = [...list, new Player(list.length, pName, pColor)];
    console.log(pName);
    console.log(pColor);
    console.log(out);
    
    return out;
  } 

  const listPlayers = (list) => {
    if (list.length === 0) return;
    let out = list.map(
      p => 
        <label 
          key={p.id} 
          className="player"
        >
          {p.name}
          <button 
            className="playerToken" 
            style={{backgroundColor: p.color}}
            onClick={() => setPlayers(player => removePlayer(p.id, player))}
          > - </button>
        </label>
      );
    return out;
  };

  let renderScreen = () => {
    let out;
    if (gameOver >= -1) {
      out = (
        <>
            <ConnectFour rows={rows} cols={cols} simple={simple} players={players} gameOver={(player) => setGameOver(player)}/>
          <div
            className="winscreen" 
            hidden={togglePopUp(gameOver)}
          >
            <label>{gameOverMessage(gameOver)}</label>
            <button className="player"></button>
          </div>
        </>
      );
    } else if (gameOver === -2) {
      out = (
          <div className="welcomeScreen">
            <label className="titleText">Connect Four</label>
            <label className="currentSize">{'('+cols+' x '+rows+')'}</label>
            <button 
              className="playBtn"
              onClick={() => setGameOver((c) => {c = 0})}
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
            <form className="addPlayer">
              <input 
                className="inputs" 
                type="text" 
                onChange={(e) => setName(n => n = ''+e.target.value+'')}
              />
              <input 
                className="inputs"
                type="text"
                style={{color:color}}
                onChange={(e) => setColor(color => color = ''+e.target.value+'')}
              />
              <button 
                className="playersBtn"
                onClick={() => setPlayers(p =>[...addPlayer(name, color, p)])}
              > + </button>
            </form>
            <div className="addPlayer">
            {listPlayers(players)}
            </div>
          </div>
      );
    } else {
      out = (<ConnectFour rows={rows} cols={cols} simple={simple} players={players} gameOver={(player) => setGameOver(player)}/>);
    }
    return (
      <div className="container">
        {out}
      </div>
    );
  }

  return renderScreen();
} 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
