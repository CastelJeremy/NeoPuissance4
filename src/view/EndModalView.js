class EndModalView {
    constructor(gameModel, modalElement) {
        this.visible = false;
        this.gameModel = gameModel;
        this.modalElement = modalElement;
        this.modalTitleElement = modalElement.querySelector("#title");
        this.modalSubtitleElement = modalElement.querySelector("#subtitle");

        gameModel.on("stateWin", (playerId) => this.toggle(true, playerId));
        gameModel.on("stateDraw", () => this.toggle(false));
    }

    toggle(win, player) {
        this.modalElement.style.display = this.visible ? "none" : "block";
        this.modalTitleElement.innerText = win ? "Win !" : "Draw...";
        this.modalSubtitleElement.innerText = player ? "Player " + player : "";
        this.visible = !this.visible;
    }
}

export default EndModalView;
