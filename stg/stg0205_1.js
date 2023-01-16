//起動時の処理
function setup(){
    canvasSize(1200, 720);
    loadImg(0, "image/bg.png");
    loadImg(1, "image/spaceship.png");
    loadImg(2, "image/missile.png");
    initSShip();
}

//メインループ
function mainloop(){
    drawBG(1);
    moveSShip();
    moveMissile();
}

//背景のスクロール
var bgX = 0;
function drawBG(spd) {
    bgX = (bgX + spd)%1200;
    drawImg(0, -bgX, 0);
    drawImg(0, 1200-bgX, 0);
}
//自機の管理
var ssX = 0;
var ssY = 0;

function initSShip() {
    ssX = 400;
    ssY = 360;
}

function moveSShip() {
    if(key[37] > 0 && ssX > 60) ssX -= 20;
    if(key[39] > 0 && ssX < 1000) ssX += 20;
    if(key[38] > 0 && ssY > 40) ssY -= 20;
    if(key[40] > 0 && ssY < 680) ssY += 20;
    if(key[32] == 1) setMissile(ssX+40, ssY, 40, 0);
    drawImgC(1, ssX, ssY);
}

//自機が撃つ弾の管理
var mslX, mslY, mslXp, mslYp;
var mslF = false;

function setMissile(x, y, xp, yp) {
    if(mslF == false) {
        mslX = x;
        mslY = y;
        mslXp = xp;
        mslYp = yp;
        mslF = true;
    }
}

function moveMissile() {
    if(mslF == true) {
        mslX = mslX + mslXp;
        mslY = mslY + mslYp;
        drawImgC(2, mslX, mslY);
        if(mslX > 1200) mslF = false;
    }
}
