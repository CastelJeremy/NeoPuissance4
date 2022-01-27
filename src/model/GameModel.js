import EventEmitter from '../EventEmitter.js';
import BoardModel from './BoardModel.js';
import PlayerModel from './PlayerModel.js';
import BotModel from './BotModel.js';

class GameModel extends EventEmitter {
    constructor() {
        super();
        this.board = null;
        this.playerOne = new PlayerModel('#0094FF');
        this.playerTwo = new PlayerModel('#FF312E');
        this.state = 0;
        this.turn = null;
        this.startingTurn = 'one';
        this.difficulty = 'easy';

        this.playerOne.on('colorUpdate', () =>
            this.emit('updateBoard', {
                matrix: this.board.getMatrix(),
                playerOneColor: this.playerOne.getColor(),
                playerTwoColor: this.playerTwo.getColor(),
            })
        );
        this.playerTwo.on('colorUpdate', () =>
            this.emit('updateBoard', {
                matrix: this.board.getMatrix(),
                playerOneColor: this.playerOne.getColor(),
                playerTwoColor: this.playerTwo.getColor(),
            })
        );
    }

    getBoard() {
        return this.board;
    }

    getPlayerOne() {
        return this.playerOne;
    }

    getPlayerTwo() {
        return this.playerTwo;
    }

    getTurn() {
        return this.turn;
    }

    getStartingTurn() {
        return this.startingTurn;
    }

    setStartingTurn(startingTurn) {
        this.startingTurn = startingTurn;
        this.emit('starterUpdate', this.startingTurn);
    }

    getDifficulty() {
        return this.difficulty;
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;

        if (this.playerTwo instanceof BotModel)
            this.playerTwo.setDifficulty(difficulty);
    }

    toggleBot() {
        const oldPlayerTwo = this.playerTwo;

        if (this.playerTwo instanceof BotModel) {
            this.playerTwo = new PlayerModel(oldPlayerTwo.getColor());
        } else {
            this.playerTwo = new BotModel(
                oldPlayerTwo.getColor(),
                this.difficulty
            );
        }

        if (this.turn === oldPlayerTwo) this.turn = this.playerTwo;

        this.playerTwo.on('colorUpdate', () =>
            this.emit('updateBoard', {
                matrix: this.board.getMatrix(),
                playerOneColor: this.playerOne.getColor(),
                playerTwoColor: this.playerTwo.getColor(),
            })
        );

        this.emit('scoreUpdate');

        if (this.turn instanceof BotModel)
            this.play(this.turn.play(this.board));
    }

    start() {
        this.board = new BoardModel();
        this.state = 1;

        this.turn =
            this.startingTurn === 'one' ? this.playerOne : this.playerTwo;

        this.setStartingTurn(this.startingTurn === 'one' ? 'two' : 'one');

        this.emit('updateBoard', {
            matrix: this.board.getMatrix(),
            playerOneColor: this.playerOne.getColor(),
            playerTwoColor: this.playerTwo.getColor(),
        });

        if (this.turn instanceof BotModel)
            this.play(this.turn.play(this.board));
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
            this.turn.addScore();
            this.emit('scoreUpdate');
            this.emit('stateWin', this.turn === this.playerOne ? 1 : 2);
        } else if (this.board.isFull()) {
            this.state = 3;
            this.emit('stateDraw');
        } else {
            this.turn =
                this.turn === this.playerOne ? this.playerTwo : this.playerOne;

            if (this.turn instanceof BotModel)
                this.play(this.turn.play(this.board));
        }
    }
}

export default GameModel;
