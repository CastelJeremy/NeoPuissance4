import EventEmitter from '../EventEmitter.js';

class SettingsView extends EventEmitter {
    constructor(gameModel, settingsElement) {
        super();
        this.gameModel = gameModel;
        this.settingsElement = settingsElement;
        this.playerOneColorElement = settingsElement.querySelector('#colorP1');
        this.playerTwoColorElement = settingsElement.querySelector('#colorP2');
        this.playerStartingElement =
            settingsElement.querySelector('#startingP');
        this.difficultyElement = settingsElement.querySelector('#difficulty');
        this.botElement = settingsElement.querySelector('#bot');
        this.restartElement = settingsElement.querySelector('#restartButton');

        this.playerOneColorElement.value = gameModel.getPlayerOne().getColor();
        this.playerTwoColorElement.value = gameModel.getPlayerTwo().getColor();
        this.playerStartingElement.value = gameModel.getStartingTurn();
        this.difficultyElement.value = gameModel.getDifficulty();
        this.botElement.checked = false;

        this.playerOneColorElement.addEventListener('change', (event) =>
            this.emit('colorUpdate', { player: 1, color: event.target.value })
        );
        this.playerTwoColorElement.addEventListener('change', (event) =>
            this.emit('colorUpdate', { player: 2, color: event.target.value })
        );
        this.playerStartingElement.addEventListener('change', (event) =>
            this.emit('starterUpdate', event.target.value)
        );
        this.difficultyElement.addEventListener('change', (event) => {
            this.emit('difficultyUpdate', event.target.value);
        });
        this.botElement.addEventListener('change', (event) =>
            this.emit('botUpdate', event.checked)
        );
        this.restartElement.addEventListener('click', () => {
            this.emit('restartClick');
        });

        gameModel.on(
            'starterUpdate',
            (playerValue) => (this.playerStartingElement.value = playerValue)
        );
    }
}

export default SettingsView;
