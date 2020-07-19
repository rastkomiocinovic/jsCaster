let mapId= "topDown";
let viewId="firstPerson";
let numOfTiles=8;
let tiles = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,1]
];

let map;
let view;
let tileSize;
let ctx;
let viewCtx;
let viewWidth;
let player;
let world;


window.onload = function() {
    map = document.getElementById(mapId);
    map.width = 500; map.height= 500;
    tileSize = Math.floor(map.height / numOfTiles);
    
    view = document.getElementById(viewId);
    viewCtx = view.getContext("2d");
    viewWidth = view.width;
    viewCtx.lineWidth= viewWidth/60;
   

    ctx = map.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    world = new World(tiles, numOfTiles, map);
    player = new Player(ctx, viewCtx, 3,3);

    
    
    world.drawMap(player);

    
    
}






