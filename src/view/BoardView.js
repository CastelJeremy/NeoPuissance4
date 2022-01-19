class BoardView {

    constructor() {
        this.animate = false;
    }

    isAnimate() {
       return this.animate;
    }

    // GRH - (NOTE) N'étant pas sur du contenue de la matrix je l'ai imaginé
    draw(matrix, document){

        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let space = 20;

        // GRH - On dessine ici le rectangle neon blanc
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";
        ctx.strokeRect(space,space,canvas.width-40, canvas.height-40);


        // GRH - On dessine ici les ronds à l'intérieur
        for(let x=0; x < 7; x++){
            for(let y=0; y< 6; y++){

                // GRH - Si il n'y a aucun joueur sur cette position alors rond blanc
                if(matrix[x][y] == null){
                    ctx.beginPath();
                    ctx.strokeStyle = "white";
                    ctx.shadowColor = "white";
                    ctx.lineWidth = 5;
                    ctx.arc((x*100)+space*4, (y*100)+space*4, 45, 0, Math.PI*2);
                    ctx.stroke();
                    ctx.closePath();
                }

                // GRH - Si il y'a un joueur alors on affiche le jeton de sa couleur
                else {
                    ctx.beginPath();
                    ctx.shadowBlur = 25;

                    // GRH - On affiche la couleur
                    if(matrix[x][y] === 'y'){
                        ctx.strokeStyle = "yellow";
                        ctx.shadowColor = "yellow";
                    } else {
                        ctx.strokeStyle = "red";
                        ctx.shadowColor = "red";
                    }

                    ctx.lineWidth = 7;
                    ctx.arc((x*100)+space*4, (y*100)+space*4, 45, 0, Math.PI*2);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    dropAnimation(document, posJeton){
        let canvAnimation = document.getElementById("animation");
        let ctxA = canvAnimation.getContext("2d");

        var y = 0;
        let start = null;

        function animate(timestamp) {

            if(start=== null){
                start = timestamp;
            }
            let progress = timestamp - start;

            if((progress % 500) < 6){
                ctxA.beginPath();
                ctxA.lineWidth = 7;
                ctxA.strokeStyle = "red";
                ctxA.shadowColor = "red";
                ctxA.shadowBlur = 25;
                ctxA.clearRect(0,0,canvAnimation.width,canvAnimation.height);
                ctxA.stroke();

                //draw rectangle
                ctxA.arc((posJeton.x*100)+20*4, (y*100)+20*4, 45, 0, Math.PI*2);
                ctxA.stroke();

                y++;

                ctxA.closePath();
            }

            if(y !== posJeton.y){
                requestAnimationFrame(animate);
            }


        }

        requestAnimationFrame(animate);
    }

    onClick(evt){

    }

}

export default BoardView;