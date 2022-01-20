import BoardView from "./view/BoardView.js";
import GameModel from "./model/GameModel.js";

window.addEventListener("load", () => {
    const game = new GameModel();
    const boardView = new BoardView(
        game,
        document.querySelector("#mainCanvas"),
        document.querySelector("#animationCanvas")
    );

    game.start();

    setTimeout(() => {
        game.play(2);

        setTimeout(() => {
            game.play(5);
        }, 500);
    }, 500);
});
