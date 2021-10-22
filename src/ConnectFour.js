import React, { useEffect, useState } from "react";
import { ConnectFourBP } from "./ConnectFourBP";
import { Cell } from "./Cell";
import { Player } from "./Player";

export const ConnectFour = (props) => {
    const [connect4, setConnect4] = useState(new ConnectFourBP(props.players, props.rows, props.cols, props.simple));
    const [cell, setCell] = useState(null);
    const [turn, setTurn] = useState(0);

    useEffect(() => {
        const createGrid = (rows, cols) => {
            let out = [];
            let id = 0;
            for (let r = 0; r < rows; r++) {
                out.push([]);
                for (let c = 0; c < cols; c++) {
                    out[r].push(new Cell(id, r, c));
                    id++;
                }
            }
            return out;
        };
        setConnect4(c => ({
            ...c,
            grid: createGrid(c.rows, c.cols)
        }))
    },[props.rows, props.cols]);

    useEffect(() => {
        if (connect4.winner !== null) {
            if (connect4.winner.id >= 0) {
                props.gameOver(connect4.winner.id + 1);
                return;
            }
        }
        if (turn >= props.rows*props.cols) {
            props.gameOver(Player.nullPlayer().id);
            return;
        }   
        if (cell) {
            if (!connect4.grid[cell.row][cell.col].isOpen()) return;

            let newGrid =  [...placeCell(cell.row, cell.col, connect4.grid, props.players, turn)];
            setConnect4(c => ({
                ...c,
                grid: newGrid,
                winner: checkWin(cell.row, cell.col, currentPlayer(props.players, turn), newGrid, props.simple)
            }))
            setTurn(turn + 1);
        }
    }, [cell, connect4, props.players, turn, props.simple, props]);

    let board = () => {
        if (connect4.grid.length === 0) return;
        let out = connect4.grid.map(
            rows =>
            rows.map(
                btn =>
                <button 
                    key={btn.id}
                    className="cell" 
                    disabled={!cellEnabled(btn.row, btn.col, connect4.grid, props.simple)}
                    style={{backgroundColor: btn.getColor()}}
                    onClick={() => 
                        setCell(chooseCell(connect4.grid, btn.row, btn.col, props.simple))
                    }    
                >
                </button>
            )
        );
        return out;
    };

    let roster = () => {
        if (props.players.length === 0) return;
        let out = connect4.players.map(
            player =>
                <label 
                  key={player.id} 
                  className="player"
                  style={{borderColor: highlightPlayer(player, props.players, turn)}}
                >
                  {player.name}
                  <div className="playerToken" style={{backgroundColor: player.color}}></div>
                </label>
        );
        return out;
    }

    return (
        <>
            <div className="grid" style={{gridTemplateColumns:styleColumns(connect4.cols)}}>
                {board()}
            </div>
            <div className="players" style={{gridTemplateColumns:playerRoster(props.players.length)}}>
                {roster()}
            </div>
        </>
    );
}

 const chooseCell = (grid, r, c, simple) => {
    if (simple) {
        return grid[r][c];
    } else {
        let dir = {r:1, c:0};
        let row = checkCellLine(dir, 0, c, Player.nullPlayer(), grid);
        return grid[row][c];
    }
};

const cellEnabled = (r, c, grid, simple) => {
    if (simple) {
        return (grid[r][c].isOpen());
    } else {
        return (grid[0][c].isOpen());
    }
};

const checkCellLine = (dir, r, c, player, grid) => {
    if (exists(r, c, grid)) {
        if (grid[r][c].getId() === player.id) {
            return 1 + checkCellLine(dir, r + dir.r, c + dir.c, player, grid);
        } 
    }
    return -1;
}

const checkWin = (r, c, player, grid, simple) => {
    let newWinner = null;
    let lines = [];
    lines.push(checkCellLine({r: 1, c: 0}, r, c, player, grid) + checkCellLine({r: -1, c: 0}, r, c, player, grid) +1);
    lines.push(checkCellLine({r: 0, c: 1}, r, c, player, grid) + checkCellLine({r: 0, c: -1}, r, c, player, grid) +1);
    if (!simple) {
        lines.push(checkCellLine({r: 1, c: 1}, r, c, player, grid) + checkCellLine({r: -1, c: -1}, r, c, player, grid) +1);
        lines.push(checkCellLine({r: 1, c: -1}, r, c, player, grid) + checkCellLine({r: -1, c: 1}, r, c, player, grid) +1);
    }
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] >= 4) {
            newWinner = player;
            return newWinner;
        }
    }
    return newWinner;
};

const exists = (r, c, grid) => {

    return (r >= 0 && c >= 0 && r < grid.length && c < grid[r].length);
}

const placeCell = (r, c, grid, players, turn) => {
    grid[r][c].setPlayer(currentPlayer(players, turn));
    return grid;
}

const currentPlayer = (players, turn) => {
    return players[turn % players.length];
}

const styleColumns = (cols) => {
    let out = '';
    for (let i = 0; i < cols; i++) {
        out = out + 'auto ';
    }
    return out;
};

const playerRoster = (noPlayer) => {
    let num = noPlayer;
    if (num > 5) num = 5;

    let vals = [];
    for (let i = 1; i <= num; i++) {
        vals.push({remainder:noPlayer&i, rows:Math.ceil(noPlayer/i)});
    }
    let rows = vals[num-1];
    for (let i = num-1; i >= 0; i--) {
        let rem = rows.remainder;
        if (vals[i].rows === rows.rows && vals[i].remainder <= rem) {
            rows = {...vals[i]};
            num = i + 1;
        } else break;
    }
    return styleColumns(num);
}

const highlightPlayer = (player, players, turn) => {
    if (player.id === currentPlayer(players, turn).id) return 'gold';
    else return 'blue';
};