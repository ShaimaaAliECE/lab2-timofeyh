class Player {
    id;
    name;
    color;
    wins;
    losses;
    ties;
    
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
    }

    getName() {
        return this.name;
    }

    win = () => {
        this.wins++
        return this.wins
    }

    loss() {
        this.losses++
        return this.losses;
    }

    draw() {
        this.ties++;
        return this.ties;
    }

    setColor(color) {
        this.color = color;
    }

    static nullPlayer = () => {
        return (new Player(-1, true, '#333'));
    }

    setID(id) {
        this.id = id;
    }
}

export {Player};