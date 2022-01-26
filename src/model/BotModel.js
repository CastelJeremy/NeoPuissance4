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

        const matrix = board.getMatrix();

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                for (let p = 1; p < 3; p++) {
                    if (
                        j + 3 < matrix[0].length &&
                        (matrix[i][j] == p || matrix[i][j] == 0) &&
                        (matrix[i][j + 1] == p || matrix[i][j + 1] == 0) &&
                        (matrix[i][j + 2] == p || matrix[i][j + 2] == 0) &&
                        (matrix[i][j + 3] == p || matrix[i][j + 3] == 0)
                    )
                        score = score + (p == 1 ? -1 : 1);

                    if (
                        i + 3 < matrix.length &&
                        (matrix[i][j] == p || matrix[i][j] == 0) &&
                        (matrix[i + 1][j] == p || matrix[i + 1][j] == 0) &&
                        (matrix[i + 2][j] == p || matrix[i + 2][j] == 0) &&
                        (matrix[i + 3][j] == p || matrix[i + 3][j] == 0)
                    )
                        score = score + (p == 1 ? -1 : 1);

                    if (
                        i + 3 < matrix.length &&
                        j + 3 < matrix[0].length &&
                        (matrix[i][j] == p || matrix[i][j] == 0) &&
                        (matrix[i + 1][j + 1] == p || matrix[i + 1][j + 1] == 0) &&
                        (matrix[i + 2][j + 2] == p || matrix[i + 2][j + 2] == 0) &&
                        (matrix[i + 3][j + 3] == p || matrix[i + 3][j + 3] == 0)
                    )
                        score = score + (p == 1 ? -1 : 1);

                    if (
                        i - 3 >= 0 &&
                        j - 3 >= 0 &&
                        (matrix[i][j] == p || matrix[i][j] == 0) &&
                        (matrix[i - 1][j - 1] == p || matrix[i - 1][j - 1] == 0) &&
                        (matrix[i - 2][j - 2] == p || matrix[i - 2][j - 2] == 0) &&
                        (matrix[i - 3][j - 3] == p || matrix[i - 3][j - 3] == 0)
                    )
                        score = score + (p == 1 ? -1 : 1);
                }
            }
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
