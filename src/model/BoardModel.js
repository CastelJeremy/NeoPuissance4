class BoardModel {
    constructor() {
        this.matrix = new Array(6);

        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = new Array(7);
            this.matrix[i].fill(0, 0, 7);
        }
    }

    getMatrix() {
        return this.matrix;
    }

    isColumnFull(columnId) {
        for (let i = 0; i < this.matrix.length; i++)
            if (this.matrix[i][columnId] === 0)
                return false;

        return true;
    }

    isFull() {
        for (let i = 0; i < this.matrix.length; i++)
            if (!this.isColumnFull(i))
                return false;

        return true;
    }

    addPlayer(playerId, columnId) {
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i][columnId] === 0) {
                this.matrix[i][columnId] = playerId;
                break;
            }
        }
    }
}

export default BoardModel;