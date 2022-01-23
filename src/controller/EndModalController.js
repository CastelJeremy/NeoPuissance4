class EndModalController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('restartClicked', () => model.start());
    }
}

export default EndModalController;
