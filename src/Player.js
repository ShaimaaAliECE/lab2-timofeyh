class Player {
    name;
    color;
    wins;
    losses;
    ties;
    
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
    }

    win() {
        this.wins++;
    }

    loss() {
        this.losses++;
    }

    draw() {
        this.ties++;
    }

    setColor(color) {
        this.color = color;
    }
}