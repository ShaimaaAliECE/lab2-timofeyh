class Cell {
    value;
    row;
    col;

    constructor(row, col) {
        this.value = null;
        this.row = row;
        this.col = col;
    }

    adjacentCells() {
        let cells = [];
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                if (r == 0 && c == 0) continue;
                cells.push({row: this.row + r, col: this.col + c})
            }
        }
        return cells;
    }

    isOpen() {
        return this.value === null;
    }

    set(value) {
        this.value = value;
    }
}

export {Cell};