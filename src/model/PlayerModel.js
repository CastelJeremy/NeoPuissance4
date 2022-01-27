import EventEmitter from '../EventEmitter.js';

class PlayerModel extends EventEmitter {
    constructor(color) {
        super();
        this.color = color;
        this.score = 0;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
        this.emit('colorUpdate');
    }

    getScore() {
        return this.score;
    }

    addScore() {
        this.score++;
    }
}

export default PlayerModel;
