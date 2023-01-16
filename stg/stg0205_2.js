//起動時の処理
function setup(){
    canvasSize(1200, 720);
    loadImg(0, "image/bg.png");
    loadImg(1, "image/spaceship.png");
    loadImg(2, "image/missile.png");
    initSShip();
    initMissile();
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
    if(key[32] == 1) {
        key[32]++;
        setMissile(ssX+40, ssY, 40, 0);
    }
    drawImgC(1, ssX, ssY);
}

//自機が撃つ弾の管理
var MSL_MAX = 100;
var mslX = new Array(MSL_MAX);
var mslY = new Array(MSL_MAX);
var mslXp = new Array(MSL_MAX);
var mslYp = new Array(MSL_MAX);
var mslF = new Array(MSL_MAX);
var mslNum = 0;

function initMissile() {
    for(var i=0; i<MSL_MAX; i++) mslF[i] = false;
    mslNum = 0;
}

function setMissile(x, y, xp, yp) {
    mslX[mslNum] = x;
    mslY[mslNum] = y;
    mslXp[mslNum] = xp;
    mslYp[mslNum] = yp;
    mslF[mslNum] = true;
    mslNum = (mslNum+1)%MSL_MAX;
}

function moveMissile() {
    for(var i=0; i<MSL_MAX; i++) {
        if(mslF[i] == true) {
            mslX[i] = mslX[i] + mslXp[i];
            mslY[i] = mslY[i] + mslYp[i];
            drawImgC(2, mslX[i], mslY[i]);
            if(mslX[i] > 1200) mslF[i] = false;
        }
    }
}
