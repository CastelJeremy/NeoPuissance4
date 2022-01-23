import EventEmitter from '../EventEmitter.js';

class EndModalView extends EventEmitter {
    constructor(gameModel, modalElement) {
        super();
        this.visible = false;
        this.gameModel = gameModel;
        this.modalElement = modalElement;
        this.modalTitleElement = modalElement.querySelector('#title');
        this.modalSubtitleElement = modalElement.querySelector('#subtitle');
        this.modalButtonElement = modalElement.querySelector('#restart');

        gameModel.on('stateWin', (playerId) => this.toggle(true, playerId));
        gameModel.on('stateDraw', () => this.toggle(false));
        this.modalButtonElement.addEventListener(
            'click',
            this.onButtonClick.bind(this)
        );
    }

    toggle(win, player) {
        this.modalElement.style.display = this.visible ? 'none' : 'flex';
        this.modalTitleElement.innerText = win ? 'You Win !' : 'Draw...';
        this.modalSubtitleElement.innerText = player ? 'Player ' + player : '';
        this.visible = !this.visible;
    }

    onButtonClick() {
        this.modalElement.style.display = 'none';
        this.visible = false;

        this.emit('restartClicked');
    }
}

export default EndModalView;
