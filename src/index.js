import GameModel from './model/GameModel.js';
import BoardView from './view/BoardView.js';
import EndModalView from './view/EndModalView.js';
import SettingsView from './view/SettingsView.js';
import BoardController from './controller/BoardController.js';
import EndModalController from './controller/EndModalController.js';
import SettingsController from './controller/SettingsController.js';

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
    const settingsView = new SettingsView(
        gameModel,
        document.querySelector('#toolsBox')
    );
    const boardController = new BoardController(gameModel, boardView);
    const endModalController = new EndModalController(gameModel, endModalView);
    const settingsController = new SettingsController(gameModel, settingsView);
});
