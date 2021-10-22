import { Player } from "./Player";

class Cell {
    id;
    player;
    row;
    col;

    constructor(id, row, col) {
        this.id = id;
        this.player = Player.nullPlayer();
        this.row = row;
        this.col = col;
    }

    adjacentCells = () => {
        let cells = [];
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                if (r === 0 && c === 0) continue;
                cells.push({row: this.row + r, col: this.col + c})
            }
        }
        return cells;
    }

    isOpen = () => {
        return this.player.name === true;
    }

    setPlayer = (player) =>  {
        this.player = {...player};
    }

    getColor = () => {
        return this.player.color;
    }

    getId = () => {
        return this.player.id;
    }

    getPlayer() {
        return this.player;
    }
}

export {Cell}; 