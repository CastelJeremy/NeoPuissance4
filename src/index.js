import GameModel from './model/GameModel.js';
import BoardView from './view/BoardView.js';
import EndModalView from './view/EndModalView.js';
import BoardController from './controller/BoardController.js';

window.addEventListener('load', () => {
    const gameModel = new GameModel();
    const boardView = new BoardView(
        gameModel,
        document.querySelector('#mainCanvas'),
        document.querySelector('#animationCanvas')
    );
    const endModalView = new EndModalView(
        gameModel,
        document.querySelector('#gameEndModal')
    );
    const boardController = new BoardController(gameModel, boardView);
});
