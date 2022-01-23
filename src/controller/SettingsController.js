class SettingsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('colorUpdate', (event) => {
            if (event.player === 1) {
                model.getPlayerOne().setColor(event.color);
            } else {
                model.getPlayerTwo().setColor(event.color);
            }
        });
    }
}

export default SettingsController;
