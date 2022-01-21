class BoardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('loadingAnimationEnded', () => model.start());
        view.on('click', (columnId) => model.play(columnId));
        view.on('animationEnded', () => model.checkBoard());
    }
}

export default BoardController;
