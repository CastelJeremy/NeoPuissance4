class BoardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('click', (columnId) => model.play(columnId));
        view.on('animationEnded', () => model.checkBoard());
        model.start();
    }
}

export default BoardController;
