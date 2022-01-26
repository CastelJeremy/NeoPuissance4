import PlayerModel from './PlayerModel.js';

class Bot extends PlayerModel {
    constructor(color) {
        super(color);
    }

    play(board) {
        let bestPos = 0;
        let bestEval = -Infinity;

        for (
            let columnId = 0;
            columnId < board.getMatrix()[0].length;
            columnId++
        ) {
            if (!board.isColumnFull(columnId)) {
                const clone = board.clone();
                clone.addPlayer(2, columnId);

                const posEval = this.minimax(
                    clone,
                    4,
                    -Infinity,
                    Infinity,
                    true
                );

                if (bestEval < posEval) {
                    bestPos = columnId;
                    bestEval = posEval;
                } else if (bestEval == posEval) {
                    bestPos =
                        Math.floor(Math.random() * 10) >= 3
                            ? bestPos
                            : columnId;
                }
            }
        }

        return bestPos;
    }

    evaluation(board) {
        let score = 0;

        if (board.isConnected(2)) return Infinity;

        if (board.isConnected(1)) return -Infinity;

        for (let i = 0; i < board.getMatrix().length; i++)
            for (let j = 0; j < board.getMatrix()[0].length - 1; j++) {
                if (
                    board.getMatrix()[i][j] == 2 &&
                    board.getMatrix()[i][j + 1] == 2
                )
                    score += 10;

                if (
                    board.getMatrix()[i][j] == 1 &&
                    board.getMatrix()[i][j + 1] == 1
                )
                    score -= 10;
            }

        for (let j = 0; j < board.getMatrix()[0].length; j++)
            for (let i = 0; i < board.getMatrix().length - 1; i++) {
                if (
                    board.getMatrix()[i][j] == 2 &&
                    board.getMatrix()[i + 1][j] == 2
                )
                    score += 10;

                if (
                    board.getMatrix()[i][j] == 1 &&
                    board.getMatrix()[i + 1][j] == 1
                )
                    score -= 10;
            }

        for (let i = 1; i < board.getMatrix().length; i++)
            for (let j = 0; j < board.getMatrix()[i].length - 1; j++) {
                if (
                    board.getMatrix()[i][j] == 2 &&
                    board.getMatrix()[i - 1][j + 1] == 2
                )
                    score += 10;

                if (
                    board.getMatrix()[i][j] == 1 &&
                    board.getMatrix()[i - 1][j + 1] == 1
                )
                    score -= 10;
            }

        for (let i = 1; i < board.getMatrix().length; i++)
            for (let j = 1; j < board.getMatrix()[i].length; j++) {
                if (
                    board.getMatrix()[i][j] == 2 &&
                    board.getMatrix()[i - 1][j - 1] == 2
                )
                    score += 10;

                if (
                    board.getMatrix()[i][j] == 1 &&
                    board.getMatrix()[i - 1][j - 1] == 1
                )
                    score -= 10;
            }

        return score;
    }

    minimax(board, depth, alpha, beta, maximizingPlayer) {
        if (depth == 0 || board.isConnected(1)) return this.evaluation(board);

        if (maximizingPlayer) {
            let maxEval = -Infinity;

            for (let i = 0; i < board.getMatrix()[0].length; i++) {
                if (!board.isColumnFull(i)) {
                    const clone = board.clone();
                    clone.addPlayer(2, i);

                    const posEval = this.minimax(
                        clone,
                        depth - 1,
                        alpha,
                        beta,
                        false
                    );

                    maxEval = Math.max(maxEval, posEval);
                    alpha = Math.max(alpha, posEval);

                    if (beta <= alpha) break;
                }
            }

            return maxEval;
        } else {
            let minEval = Infinity;

            for (let i = 0; i < board.getMatrix()[0].length; i++) {
                if (!board.isColumnFull(i)) {
                    const clone = board.clone();
                    clone.addPlayer(1, i);

                    const posEval = this.minimax(
                        clone,
                        depth - 1,
                        alpha,
                        beta,
                        true
                    );

                    minEval = Math.min(minEval, posEval);
                    beta = Math.min(beta, posEval);

                    if (beta <= alpha) break;
                }
            }

            return minEval;
        }
    }
}

export default Bot;
