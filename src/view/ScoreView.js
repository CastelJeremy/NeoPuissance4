class ScoreView {
    constructor(gameModel, scoreElement) {
        this.gameModel = gameModel;
        this.scoreElement = scoreElement;
        this.playerOneScoreElement =
            this.scoreElement.querySelector('#scoreP1');
        this.playerTwoScoreElement =
            this.scoreElement.querySelector('#scoreP2');

        this.playerOneScoreElement.innerText = this.gameModel
            .getPlayerOne()
            .getScore();
        this.playerTwoScoreElement.innerText = this.gameModel
            .getPlayerTwo()
            .getScore();

        this.gameModel.on('scoreUpdate', () => {
            this.playerOneScoreElement.innerText = this.gameModel
                .getPlayerOne()
                .getScore();
            this.playerTwoScoreElement.innerText = this.gameModel
                .getPlayerTwo()
                .getScore();
        });
    }
}

export default ScoreView;
