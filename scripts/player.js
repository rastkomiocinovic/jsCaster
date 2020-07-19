class Player {
    constructor(world, viewCtx, x, y) {
        this.x = x*tileSize + tileSize/3;
        this.y = y*tileSize + tileSize/3;
        this.mapContext = world;
        this.viewCtx = viewCtx;
        this.pa = 0;
        this.pdx = this.pdy = Math.sqrt(5);
        this.color="red";

        document.addEventListener('keydown', (e) => {
            switch(e.code){
                case "ArrowUp":
                    player.move(player.pdx, player.pdy);
                   
                    break;
                case "ArrowDown":
                    player.move(-player.pdx, -player.pdy);
                    
                    break;
                case "ArrowLeft":
                    player.rotate(-.1);
                    break;
                case "ArrowRight":
                    player.rotate(.1);
                    break;
            }
          
        });
    }

    render() {
        this.mapContext.fillStyle = this.color;     
        this.mapContext.fillRect(this.x - tileSize/6, this.y - tileSize/6, tileSize/3, tileSize/3);       
        drawRays3D(this, this.viewCtx, this.mapContext);
    }

    move(dx, dy) {
        this.color = "white";
        this.x += dx;
        this.y += dy;
        this.color = "red";
        world.drawMap(this);
    }

    rotate(da) {
        this.pa += da;
        if(this.pa > Math.PI*2) this.pa -= Math.PI*2;
        else if(this.pa < 0)    this.pa += Math.PI*2;
        this.pdx = Math.cos(this.pa)*5;
        this.pdy = Math.sin(this.pa)*5;
        world.drawMap(this);
    }
}
