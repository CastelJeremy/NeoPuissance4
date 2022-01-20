import BoardView from "./view/BoardView.js";
import GameModel from "./model/GameModel.js";

window.addEventListener("load", () => {
    const boardView = new BoardView(
        document.querySelector("#mainCanvas"),
        document.querySelector("#animationCanvas")
    );

    const game = new GameModel();

    game.start();
    boardView.draw(game.getBoard().getMatrix());

    setTimeout(() => {
        game.play(2);
        boardView.draw(
            game.getBoard().getMatrix(),
            game.getPlayerOne().getColor(),
            game.getPlayerTwo().getColor()
        );

        setTimeout(() => {
            game.play(5);
            boardView.dropAnimation(5);
        }, 500);
    }, 500);
});
