//起動時の処理
function setup(){
    canvasSize(1200, 720);
    loadImg(0, "image/bg.png");
    loadImg(1, "image/spaceship.png");
    loadImg(2, "image/missile.png");
    loadImg(5, "image/enemy1.png");
    initSShip();
    initMissile();
    initObject();
}

//メインループ
var tmr = 0;
function mainloop(){
    tmr++;
    drawBG(1);
    moveSShip();
    moveMissile();
    if(tmr%10 == 0) setObject(1200, rnd(700), -12, 0);
    moveObject();
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
var automa = 0;//弾の自動発射

function initSShip() {
    ssX = 400;
    ssY = 360;
}

function moveSShip() {
    if(key[37] > 0 && ssX > 60) ssX -= 20;
    if(key[39] > 0 && ssX < 1000) ssX += 20;
    if(key[38] > 0 && ssY > 40) ssY -= 20;
    if(key[40] > 0 && ssY < 680) ssY += 20;
    if(key[65] == 1) {
        key[65]++;
        automa = 1-automa;
    }
    if(automa == 0 && key[32] == 1) {
        key[32]++;
        setMissile(ssX+40, ssY, 40, 0);
    }
    if(automa == 1 && tmr%8 == 0) setMissile(ssX+40, ssY, 40, 0);
    var col = "black";
    if(automa == 1) col = "white";
    fRect(900, 20, 280, 60, "blue");
    fText("[A]uto Missile", 1040, 50, 36, col);
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
            mslX[i] += mslXp[i];
            mslY[i] += mslYp[i];
            drawImgC(2, mslX[i], mslY[i]);
            if(mslX[i] > 1200) mslF[i] = false;
        }
    }
}

//物体の管理
var OBJ_MAX = 100;
var objX = new Array(OBJ_MAX);
var objY = new Array(OBJ_MAX);
var objXp = new Array(OBJ_MAX);
var objYp = new Array(OBJ_MAX);
var objF = new Array(OBJ_MAX);
var objNum = 0;

function initObject() {
    for(var i=0; i<OBJ_MAX; i++) objF[i] = false;
    objNum = 0;
}

function setObject(x, y, xp, yp) {
    objX[objNum] = x;
    objY[objNum] = y;
    objXp[objNum] = xp;
    objYp[objNum] = yp;
    objF[objNum] = true;
    objNum = (objNum+1)%OBJ_MAX;
}

function moveObject() {
    for(var i=0; i<OBJ_MAX; i++) {
        if(objF[i] == true) {
            objX[i] = objX[i] + objXp[i];
            objY[i] = objY[i] + objYp[i];
            drawImgC(5, objX[i], objY[i]);
            if(objX[i] < 0) objF[i] = false;
        }
    }
}
