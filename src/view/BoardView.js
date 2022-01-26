import EventEmitter from '../EventEmitter.js';

class BoardView extends EventEmitter {
    constructor(gameModel, mainCanvas, animationCanvas) {
        super();
        this.animate = false;
        this.gameModel = gameModel;
        this.mainCanvas = mainCanvas;
        this.animationCanvas = animationCanvas;
        this.margin = 20;
        this.borderRadius = 15;

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

        this.loadingAnimation();
    }

    isAnimate() {
        return this.animate;
    }

    getFramePath() {
        const path = new Path2D();

        path.moveTo(this.margin + this.borderRadius, this.margin);
        path.lineTo(
            this.mainCanvas.width - this.borderRadius - this.margin,
            this.margin
        );
        path.quadraticCurveTo(
            this.mainCanvas.width - this.margin,
            this.margin,
            this.mainCanvas.width - this.margin,
            this.margin + this.borderRadius
        );
        path.lineTo(
            this.mainCanvas.width - this.margin,
            this.mainCanvas.height - this.margin - this.borderRadius
        );
        path.quadraticCurveTo(
            this.mainCanvas.width - this.margin,
            this.mainCanvas.height - this.margin,
            this.mainCanvas.width - this.borderRadius - this.margin,
            this.mainCanvas.height - this.margin
        );
        path.lineTo(
            this.margin + this.borderRadius,
            this.mainCanvas.height - this.margin
        );
        path.quadraticCurveTo(
            this.margin,
            this.mainCanvas.height - this.margin,
            this.margin,
            this.mainCanvas.height - this.margin - this.borderRadius
        );
        path.lineTo(this.margin, this.margin + this.borderRadius);
        path.quadraticCurveTo(
            this.margin,
            this.margin,
            this.margin + this.borderRadius,
            this.margin
        );

        return path;
    }

    // GRH - (NOTE) N'étant pas sur du contenue de la matrix je l'ai imaginé
    draw(matrix, playerOneColor, playerTwoColor) {
        const ctx = this.mainCanvas.getContext('2d');

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
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 5;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffffff';
            ctx.stroke(this.getFramePath());

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
                        x * 100 + this.margin * 4,
                        (5 - y) * 100 + this.margin * 4,
                        45,
                        0,
                        Math.PI * 2
                    );

                    ctx.stroke();
                }
            }
        }
    }

    loadingAnimation() {
        this.animate = true;
        let start = null;

        const ctx = this.mainCanvas.getContext('2d');
        const tokenLength = Math.PI * 45 * 2;
        const totalLength =
            this.mainCanvas.height * 2 +
            this.mainCanvas.width * 2 -
            this.margin * 8;

        ctx.lineWidth = 5;

        const animate = (timestamp) => {
            if (!start) start = timestamp;

            const elapsed = timestamp - start;

            if (elapsed > 400) {
                ctx.clearRect(
                    0,
                    0,
                    this.mainCanvas.width,
                    this.mainCanvas.height
                );
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ffffff';
                ctx.strokeStyle = '#ffffff';

                for (let i = 0; i < 2; i++) {
                    ctx.shadowOffsetX = i === 0 ? 2 : -2;
                    ctx.shadowOffsetY = i === 0 ? 2 : -2;
                    ctx.setLineDash([
                        totalLength * ((elapsed - 400) / 4000),
                        totalLength,
                    ]);
                    ctx.stroke(this.getFramePath());

                    for (let x = 0; x < 7; x++) {
                        for (let y = 0; y < 6; y++) {
                            ctx.setLineDash([
                                tokenLength * ((elapsed - 400) / 4000),
                                tokenLength,
                            ]);
                            ctx.beginPath();
                            ctx.arc(
                                x * 100 + this.margin * 4,
                                (5 - y) * 100 + this.margin * 4,
                                45,
                                0,
                                Math.PI * 2
                            );
                            ctx.stroke();
                        }
                    }
                }
            }

            if (elapsed < 4400) {
                window.requestAnimationFrame(animate.bind(this));
            } else {
                this.animate = false;
                ctx.setLineDash([]);
                this.emit('loadingAnimationEnded');
            }
        };

        window.requestAnimationFrame(animate.bind(this));
    }

    dropAnimation(x, y, color) {
        this.animate = true;
        const ctx = this.animationCanvas.getContext('2d');

        let yTemp = 0;
        let rebond = Math.round(Math.abs(y - 6) / 2);
        let handler = null;

        let doRebond = false;

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

            ctx.arc(x * 100 + 20 * 4, yTemp * 100 + 20 * 4, 45, 0, Math.PI * 2);
            ctx.stroke();

            if (!doRebond) {
                yTemp++;
            } else {
                yTemp--;
            }

            if (
                (Math.abs(y - 6) === yTemp && !doRebond) ||
                (yTemp == Math.abs(rebond - 5) - y && doRebond == true)
            ) {
                if (yTemp == Math.abs(rebond - 5) - y && doRebond == true) {
                    doRebond = false;
                } else if (rebond !== 1) {
                    doRebond = true;
                    rebond--;
                    yTemp--;
                } else {
                    clearInterval(handler);
                    ctx.clearRect(
                        0,
                        0,
                        this.animationCanvas.width,
                        this.animationCanvas.height
                    );
                    this.animate = false;
                    this.emit('animationEnded');
                }
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
