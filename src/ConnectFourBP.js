class ConnectFourBP {
    players = [];
    rows = 6;
    cols = 7;
    grid = [];
    simple = true;
    winner;

    constructor(players, rows, cols, simple) {
        this.players = players;
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.simple = simple;
        this.winner = null;
    }
}

export {ConnectFourBP};