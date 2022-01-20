class BoardView {
    constructor(gameModel, mainCanvas, animationCanvas) {
        this.animate = false;
        this.gameModel = gameModel;
        this.mainCanvas = mainCanvas;
        this.animationCanvas = animationCanvas;

        gameModel.on('updateBoard', ({ matrix, playerOneColor, playerTwoColor }) => this.draw(matrix, playerOneColor, playerTwoColor));
        gameModel.on('playerPlayed', ({ columnId, rowId, color }) => this.dropAnimation(columnId, rowId, color));
    }

    isAnimate() {
       return this.animate;
    }

    // GRH - (NOTE) N'étant pas sur du contenue de la matrix je l'ai imaginé
    draw(matrix, playerOneColor, playerTwoColor) {
        let ctx = this.mainCanvas.getContext("2d");
        let space = 20;

        ctx.clearRect(0,0,this.animationCanvas.width,this.animationCanvas.height);

        // GRH - On dessine ici le rectangle neon blanc
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#ffffff";
        ctx.strokeRect(space,space,this.mainCanvas.width-40, this.mainCanvas.height-40);

        // GRH - On dessine ici les ronds à l'intérieur
        for(let x=0; x < 7; x++){
            for(let y=0; y< 6; y++){
                ctx.beginPath();
                ctx.shadowBlur = 25;
                ctx.lineWidth = 7;

                // GRH - On affiche la couleur
                if (matrix[y][x] === 0) {
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "#ffffff";
                    ctx.shadowColor = "#ffffff";
                } else if(matrix[y][x] === 1){
                    ctx.strokeStyle = playerOneColor;
                    ctx.shadowColor = playerOneColor;
                } else {
                    ctx.strokeStyle = playerTwoColor;
                    ctx.shadowColor = playerTwoColor;
                }

                ctx.arc((x*100)+space*4, ((5-y)*100)+space*4, 45, 0, Math.PI*2);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    dropAnimation(x, y, color) {
        let ctxA = this.animationCanvas.getContext("2d");

        let yTemp = 0;
        let start = null;
        let handler = null;

        function animate() {

                ctxA.beginPath();
                ctxA.lineWidth = 7;
                ctxA.strokeStyle = color;
                ctxA.shadowColor = color;
                ctxA.shadowBlur = 25;
                ctxA.clearRect(0,0,this.animationCanvas.width,this.animationCanvas.height);
                ctxA.stroke();

                //draw rectangle
                console.log(((5-y)*100)+20*4)
                ctxA.arc((x*100)+20*4, ((yTemp)*100)+20*4, 45, 0, Math.PI*2);
                ctxA.stroke();

                yTemp++;

                ctxA.closePath();

            console.log(Math.abs(y-6))
            console.log(yTemp)

            if(Math.abs(y-6) === yTemp){
                clearInterval(handler)
            }

        }

        //requestAnimationFrame(animate.bind(this));
        handler = setInterval(animate.bind(this), 500);
    }

    onClick(evt){

    }

}

export default BoardView;