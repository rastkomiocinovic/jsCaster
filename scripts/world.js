
class World {
    constructor(tiles, numOfTiles, map, ctx) {
        this.tiles = tiles;
        this.numOfTiles = numOfTiles;
        this.ctx = ctx;
        world = this;
        map.addEventListener('mousedown', function(e) {
            clickedEditor(map, e, world);
        });
    }



    drawMap(player) {
        this.player = player;
        for( let i = 0; i < numOfTiles; i++){
            for( let j = 0; j < numOfTiles; j++){
                if(tiles[i][j] === 1){
                    ctx.fillStyle = "black";
                    ctx.fillRect(i*tileSize,j*tileSize,tileSize, tileSize);                
                }
                else {
                    ctx.fillStyle = "white";
                    ctx.fillRect(i*tileSize,j*tileSize,tileSize, tileSize);
                }
            }
        }
    
        ctx.beginPath();
        for( let pos = 0; pos <= numOfTiles*tileSize; pos+=tileSize) {
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, numOfTiles*tileSize);
            ctx.moveTo(0, pos);
            ctx.lineTo(numOfTiles*tileSize, pos);
        }
        
        ctx.strokeStyle = "black";
        ctx.stroke();
    
        player.render();
        
    }
    
    
}

function clickedEditor(canvas, event, world) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileSize);
    const y = Math.floor((event.clientY - rect.top)  / tileSize);
    if(x === 0 || y === 0 || x === numOfTiles-1 || y === numOfTiles-1)
        return;
    tiles[x][y] = tiles[x][y]==0 ? 1 : 0;
    world.drawMap(player);
    
}