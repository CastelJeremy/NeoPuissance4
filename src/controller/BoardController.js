class BoardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('click', (columnId) => model.play(columnId));
        model.start();
    }
}

export default BoardController;