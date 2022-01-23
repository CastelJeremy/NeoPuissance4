import EventEmitter from "../EventEmitter.js";

class PlayerModel extends EventEmitter {
    constructor(color) {
        super();
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
        this.emit('colorUpdate');
    }

    play() {}
}

export default PlayerModel;
