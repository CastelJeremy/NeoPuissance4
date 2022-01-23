import PlayerModel from './PlayerModel.js';

class Bot extends PlayerModel {
    constructor(color) {
        super(color);
    }

    play(board) {
        let columnId = 0;

        do {
            columnId = Math.floor(Math.random() * 7);
        } while (board.isColumnFull(columnId));

        return columnId;
    }
}

export default Bot;
