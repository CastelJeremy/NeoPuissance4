import EventEmitter from '../EventEmitter.js';

class BoardView extends EventEmitter {
    constructor(gameModel, mainCanvas, animationCanvas) {
        super();
        this.animate = false;
        this.gameModel = gameModel;
        this.mainCanvas = mainCanvas;
        this.animationCanvas = animationCanvas;

        gameModel.on(
            'updateBoard',
            ({ matrix, playerOneColor, playerTwoColor }) =>
                this.draw(matrix, playerOneColor, playerTwoColor)
        );

        gameModel.on('playerPlayed', ({ columnId, rowId, color }) =>
            this.dropAnimation(columnId, rowId, color)
        );

        this.on('animationEnded', () =>
            this.draw(
                gameModel.getBoard().getMatrix(),
                gameModel.getPlayerOne().getColor(),
                gameModel.getPlayerTwo().getColor()
            )
        );

        animationCanvas.addEventListener('click', this.onClick.bind(this));
    }

    isAnimate() {
        return this.animate;
    }

    // GRH - (NOTE) N'étant pas sur du contenue de la matrix je l'ai imaginé
    draw(matrix, playerOneColor, playerTwoColor) {
        const ctx = this.mainCanvas.getContext('2d');
        const space = 20;
        const radius = 15;

        ctx.clearRect(
            0,
            0,
            this.animationCanvas.width,
            this.animationCanvas.height
        );

        for (let i = 0; i < 2; i++) {
            ctx.shadowOffsetX = i === 0 ? 2 : -2;
            ctx.shadowOffsetY = i === 0 ? 2 : -2;

            // GRH - On dessine ici le rectangle neon blanc
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffffff';
            ctx.moveTo(space + radius, space);
            ctx.lineTo(this.mainCanvas.width - radius - space, space);
            ctx.quadraticCurveTo(
                this.mainCanvas.width - space,
                space,
                this.mainCanvas.width - space,
                space + radius
            );
            ctx.lineTo(
                this.mainCanvas.width - space,
                this.mainCanvas.height - space - radius
            );
            ctx.quadraticCurveTo(
                this.mainCanvas.width - space,
                this.mainCanvas.height - space,
                this.mainCanvas.width - radius - space,
                this.mainCanvas.height - space
            );
            ctx.lineTo(space + radius, this.mainCanvas.height - space);
            ctx.quadraticCurveTo(
                space,
                this.mainCanvas.height - space,
                space,
                this.mainCanvas.height - space - radius
            );
            ctx.lineTo(space, space + radius);
            ctx.quadraticCurveTo(space, space, space + radius, space);
            ctx.closePath();
            ctx.stroke();

            // GRH - On dessine ici les ronds à l'intérieur
            for (let x = 0; x < 7; x++) {
                for (let y = 0; y < 6; y++) {
                    ctx.beginPath();
                    ctx.lineWidth = 7;

                    // GRH - On affiche la couleur
                    if (matrix[y][x] === 0) {
                        ctx.lineWidth = 5;
                        ctx.strokeStyle = '#ffffff';
                        ctx.shadowColor = '#ffffff';
                    } else if (matrix[y][x] === 1) {
                        ctx.strokeStyle = playerOneColor;
                        ctx.shadowColor = playerOneColor;
                    } else {
                        ctx.strokeStyle = playerTwoColor;
                        ctx.shadowColor = playerTwoColor;
                    }

                    ctx.arc(
                        x * 100 + space * 4,
                        (5 - y) * 100 + space * 4,
                        45,
                        0,
                        Math.PI * 2
                    );
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    dropAnimation(x, y, color) {
        this.animate = true;
        const ctx = this.animationCanvas.getContext('2d');

        let yTemp = 0;
        let handler = null;

        function animate() {
            ctx.beginPath();
            ctx.lineWidth = 7;
            ctx.strokeStyle = color;
            ctx.clearRect(
                0,
                0,
                this.animationCanvas.width,
                this.animationCanvas.height
            );
            ctx.stroke();

            //draw rectangle
            ctx.arc(x * 100 + 20 * 4, yTemp * 100 + 20 * 4, 45, 0, Math.PI * 2);
            ctx.stroke();

            yTemp++;

            ctx.closePath();

            if (Math.abs(y - 6) === yTemp) {
                clearInterval(handler);
                this.animate = false;
                this.emit('animationEnded');
            }
        }

        handler = setInterval(animate.bind(this), 100);
    }

    onClick(evt) {
        if (!this.animate) {
            const rect = evt.target.getBoundingClientRect();
            const x = evt.clientX - rect.left;
            const columnWidth = (this.animationCanvas.width - 50) / 7;

            if (x < this.animationCanvas.width - 50 && x > 25)
                this.emit('click', Math.floor((x - 25) / columnWidth));
        }
    }
}

export default BoardView;
