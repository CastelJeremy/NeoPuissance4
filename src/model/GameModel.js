import EventEmitter from '../EventEmitter.js';
import BoardModel from './BoardModel.js';
import PlayerModel from './PlayerModel.js';

class GameModel extends EventEmitter {
    constructor() {
        super();
        this.board = null;
        this.playerOne = new PlayerModel('#5ADBFF');
        this.playerTwo = new PlayerModel('#FF312E');
        this.state = 0;
        this.turn = null;
    }

    getBoard() {
        return this.board;
    }

    getPlayerOne() {
        return this.playerOne;
    }

    setPlayerOne(playerOne) {
        this.playerOne = playerOne;
    }

    getPlayerTwo() {
        return this.playerTwo;
    }

    setPlayerTwo(playerTwo) {
        this.playerTwo = playerTwo;
    }

    getTurn() {
        return this.turn;
    }

    isConnected(playerId) {
        const matrix = this.board.getMatrix();

        for (let j = 0; j < matrix[0].length - 3; j++)
            for (let i = 0; i < matrix.length; i++)
                if (matrix[i][j] == playerId && matrix[i][j + 1] == playerId && matrix[i][j + 2] == playerId && matrix[i][j + 3] == playerId)
                    return true;

        for (let i = 0; i < matrix.length - 3; i++)
            for (let j = 0; j < matrix[i].length; j++)
                if (matrix[i][j] == playerId && matrix[i + 1][j] == playerId && matrix[i + 2][j] == playerId && matrix[i + 3][j] == playerId)
                    return true;

        for (let i = 3; i < matrix.length; i++)
            for (let j = 0; j < matrix[i].length - 3; j++)
                if (matrix[i][j] == playerId && matrix[i - 1][j + 1] == playerId && matrix[i - 2][j + 2] == playerId && matrix[i - 3][j + 3] == playerId)
                    return true;

        for (let i = 3; i < matrix.length; i++)
            for (let j = 3; j < matrix[i].length; j++)
                if (matrix[i][j] == playerId && matrix[i - 1][j - 1] == playerId && matrix[i - 2][j - 2] == playerId && matrix[i - 3][j - 3] == playerId)
                    return true;

        return false;
    }

    start() {
        this.board = new BoardModel();
        this.state = 1;
        this.turn = (this.turn === this.playerOne) ? this.playerTwo : this.playerOne;
        this.emit('updateBoard', { matrix: this.board.getMatrix(), playerOneColor: this.playerOne.getColor(), playerTwoColor: this.playerTwo.getColor() });
    }

    play(columnId) {
        if (!this.board.isColumnFull(columnId) && this.state === 1) {
            const rowId = this.board.addPlayer(this.turn === this.playerOne ? 1 : 2, columnId);
            this.emit('playerPlayed', { columnId: columnId, rowId: rowId, color: this.turn.getColor() });
            
            if (this.isConnected(this.turn === this.playerOne ? 1 : 2)) {
                this.state = 2;
                this.emit('stateWin', this.turn === this.playerOne ? 1 : 2);
            } else if (this.board.isFull()) {
                this.state = 3;
                this.emit('stateDraw');
            } else {
                this.turn = (this.turn === this.playerOne ? this.playerTwo : this.playerOne);
            }
        }
    }
}

export default GameModel;