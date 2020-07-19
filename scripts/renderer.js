function drawRays3D(player, viewCtx, mapContext) {
    let r = 0, mx = 0, my = 0, mp = 0, dof = 0,
        rx = 0, ry = 0, ra = player.pa, xo = 0, yo = 0, disT;
    
    ra = player.pa - DR*30;
    if(ra<0) {
        ra+=2*Math.PI;
    }
    if(ra>2*Math.PI)
        ra-=2*Math.PI;

    viewCtx.fillStyle="blue";
    viewCtx.fillRect(0,0,view.width,view.height/2);
    viewCtx.fillStyle = "#484848";
    viewCtx.fillRect(0, view.height/2, view.width, view.height);
    
    for(r=0; r <= 60; r++) {
        
        let disH = 100000, hx = player.x, hy = player.y;
        dof = 0;
        let aTan = -1/Math.tan(ra);
        if(ra > Math.PI) {
            ry = Math.floor(player.y / tileSize)*tileSize - .0001;
            rx = (player.y - ry)*aTan + player.x;
            yo = -tileSize; xo = -yo*aTan;
        }
        if(ra < Math.PI) {
            ry = Math.floor(player.y / tileSize)*tileSize + tileSize;
            rx = (player.y - ry)*aTan + player.x;
            yo =  tileSize; xo = -yo*aTan;
        }
        if(ra == 0 || ra == Math.PI){
            rx = player.x;
            ry = player.y;
            dof = 8;
        }

        while(dof < 8){
            mx = Math.floor(rx / tileSize);
            my = Math.floor(ry / tileSize);
            if(mx < tiles.length && my < tiles.length && mx >=0 && my >= 0 && tiles[mx][my] === 1){
                dof = 8;
                hx = rx; hy = ry; disH = dist(player.x, player.y, rx, ry);
            }
            else {
                rx+=xo; ry+=yo; dof++;
            }
        }


        let disV = 100000, vx = player.x, vy = player.y;
        dof = 0;
        let nTan = -Math.tan(ra);
        if(ra > Math.PI/2 && ra < Math.PI*3/2) {
            rx = Math.floor(player.x / tileSize)*tileSize - .0001;
            ry = (player.x - rx)*nTan + player.y;
            xo = -tileSize; yo = -xo*nTan;
        }
        if(ra < Math.PI/2 || ra > Math.PI*3/2) {
            rx = Math.floor(player.x / tileSize)*tileSize + tileSize;
            ry = (player.x - rx)*nTan + player.y;
            xo =  tileSize; yo = -xo*nTan;
        }
        if(ra == 0 || ra == Math.PI){
            rx = player.x;
            ry = player.y;
            dof = 8;
        }

        while(dof < 8){
            mx = Math.floor(rx / tileSize);
            my = Math.floor(ry / tileSize);
            if(mx < tiles.length && my < tiles.length && mx >=0 && my >= 0 && tiles[mx][my] === 1){
                dof = 8;
                vx = rx; vy = ry; disV = dist(player.x, player.y, rx, ry);
            }
            else {
                rx+=xo; ry+=yo; dof++;
            }
        }

        if(disH>disV) {
            rx = vx; ry = vy; disT = disV; viewCtx.strokeStyle = "#808080";
        }
        else {
            rx = hx; ry = hy; disT = disH; viewCtx.strokeStyle = "#A9A9A9";
        }

        mapContext.beginPath();
        mapContext.moveTo(player.x, player.y);
        mapContext.lineTo(rx, ry);
        mapContext.strokeStyle = "blue";
        mapContext.stroke();


        //crtaj 3d
        let ca = player.pa - ra; ca = ca < 0 ? ca + Math.PI*2 : ca > Math.PI*2 ? ca - Math.PI*2 : ca;
        disT = disT*Math.cos(ca);
        let lineH = view.height*4*numOfTiles/disT;
        let lineO = view.height/2 - lineH/2;
        viewCtx.beginPath();
        let oldWidth = viewCtx.lineWidth;
        viewCtx.moveTo(r*viewCtx.lineWidth, lineO);
        viewCtx.lineTo(r*viewCtx.lineWidth, lineH+lineO);
        viewCtx.lineWidth *= 1.2;
        viewCtx.stroke();

        viewCtx.lineWidth = oldWidth;

        ra+=DR;
        if(ra<0) {
            ra+=2*Math.PI;
        }
        if(ra>2*Math.PI)
            ra-=2*Math.PI;

        
    }
}

function dist(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
}

const DR = 0.0174533;