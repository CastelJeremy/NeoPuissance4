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

    start() {
        this.board = new BoardModel();
        this.state = 1;
        this.turn =
            this.turn === this.playerOne ? this.playerTwo : this.playerOne;

        this.emit('updateBoard', {
            matrix: this.board.getMatrix(),
            playerOneColor: this.playerOne.getColor(),
            playerTwoColor: this.playerTwo.getColor(),
        });
    }

    play(columnId) {
        if (!this.board.isColumnFull(columnId) && this.state === 1) {
            const rowId = this.board.addPlayer(
                this.turn === this.playerOne ? 1 : 2,
                columnId
            );

            this.emit('playerPlayed', {
                columnId: columnId,
                rowId: rowId,
                color: this.turn.getColor(),
            });
        }
    }

    checkBoard() {
        if (this.board.isConnected(this.turn === this.playerOne ? 1 : 2)) {
            this.state = 2;
            this.emit('stateWin', this.turn === this.playerOne ? 1 : 2);
        } else if (this.board.isFull()) {
            this.state = 3;
            this.emit('stateDraw');
        } else {
            this.turn =
                this.turn === this.playerOne ? this.playerTwo : this.playerOne;
        }
    }
}

export default GameModel;
