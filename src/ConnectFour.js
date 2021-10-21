import React from 'react';
import './index.css';
import { Connect4 } from './connect4';

class Connect4Game extends React.Component {
  players;
  constructor(props) {
    super(props);
    this.players = [
        new Player('Player1', 'red'),
        new Player('Player2', 'yellow')
    ];
    this.state = {
        connect4 : new Connect4(this.players)
    }
  }

  jsxGrid(grid) {
    
  }
  
  render() {
    return(
        <div></div>
    );
  }
} 