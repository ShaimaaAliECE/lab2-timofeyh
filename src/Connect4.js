import { Cell } from "./Cell";
class Connect4 {
    turn;
    players = [];
    cols;
    rows;
    grid = [];
    simple;

    constructor(players, simple=true, rows = 6, cols = 7) {
        this.turn = 0;
        this.players = [...players];
        this.rows = rows;
        this.cols = cols;
        this.simple = simple;
    }

    createGrid(rows, cols) {
        let out = [];
        for (let c = 0; c < cols; c++) {
            out.push([]);
            for (let r = 0; r < rows; r++) {
                out[c].push(new Cell(r,c));
            }
        }
    }

    exists(pos) {
        let posExists = true;
        if (pos.r < 0 || pos.c < 0 || pos.r >= this.rows || pos.c >= this.cols) posExists = false;
        return posExists;
    }

    cellClick(r, c) {
        let newGrid = [...this.grid];
        if (this.simple) {
            newGrid[c][r].set(this.currentPlayer())
        } else {
            newGrid = this.cellDrop(c, newGrid);
        }
        this.turn ++;
        this.grid = [...newGrid];
        return this;
    }

    cellDrop(c, grid) {
        let newGrid = [...grid];
        let num;
        let num = 0;
        for (let r = 0; r <= c.length; r++) {
            if (c[r].isOpen()) {
                num = c[r];
                num = r;
            } else break;
        }
        newGrid[c][num].set(this.currentPlayer());
        return newGrid;
    }

    currentPlayer() {
        return this.turn % this.players.length;
    }
}
export {Connect4};