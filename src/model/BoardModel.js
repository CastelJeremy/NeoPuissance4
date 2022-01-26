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

    setMatrix(matrix) {
        this.matrix = matrix;
    }

    isColumnFull(columnId) {
        for (let i = 0; i < this.matrix.length; i++)
            if (this.matrix[i][columnId] === 0) return false;

        return true;
    }

    isFull() {
        for (let i = 0; i < this.matrix[0].length; i++)
            if (!this.isColumnFull(i)) return false;

        return true;
    }

    isConnected(playerId) {
        for (let j = 0; j < this.matrix[0].length - 3; j++)
            for (let i = 0; i < this.matrix.length; i++)
                if (
                    this.matrix[i][j] == playerId &&
                    this.matrix[i][j + 1] == playerId &&
                    this.matrix[i][j + 2] == playerId &&
                    this.matrix[i][j + 3] == playerId
                )
                    return true;

        for (let i = 0; i < this.matrix.length - 3; i++)
            for (let j = 0; j < this.matrix[i].length; j++)
                if (
                    this.matrix[i][j] == playerId &&
                    this.matrix[i + 1][j] == playerId &&
                    this.matrix[i + 2][j] == playerId &&
                    this.matrix[i + 3][j] == playerId
                )
                    return true;

        for (let i = 3; i < this.matrix.length; i++)
            for (let j = 0; j < this.matrix[i].length - 3; j++)
                if (
                    this.matrix[i][j] == playerId &&
                    this.matrix[i - 1][j + 1] == playerId &&
                    this.matrix[i - 2][j + 2] == playerId &&
                    this.matrix[i - 3][j + 3] == playerId
                )
                    return true;

        for (let i = 3; i < this.matrix.length; i++)
            for (let j = 3; j < this.matrix[i].length; j++)
                if (
                    this.matrix[i][j] == playerId &&
                    this.matrix[i - 1][j - 1] == playerId &&
                    this.matrix[i - 2][j - 2] == playerId &&
                    this.matrix[i - 3][j - 3] == playerId
                )
                    return true;

        return false;
    }

    addPlayer(playerId, columnId) {
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i][columnId] === 0) {
                this.matrix[i][columnId] = playerId;
                return i;
            }
        }
    }

    clone() {
        const clone = new BoardModel();
        const matrixClone = new Array(6);

        for (let i = 0; i < this.matrix.length; i++) {
            matrixClone[i] = new Array(7);

            for (let j = 0; j < this.matrix[i].length; j++) {
                matrixClone[i][j] = this.matrix[i][j];
            }
        }

        clone.setMatrix(matrixClone);

        return clone;
    }
}

export default BoardModel;
