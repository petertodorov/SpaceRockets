import * as PIXI from 'pixi.js';
let gameWidth = document.documentElement.clientWidth-10;
let gameHeight = document.documentElement.clientHeight-10;

let textureReplay = PIXI.Texture.fromImage('assets/replay.png');
let texturePlay = PIXI.Texture.fromImage('assets/play.png');

let playButtonNormal = new PIXI.Sprite(texturePlay);
let playButtonFast = new PIXI.Sprite(texturePlay);
let buttonReplay = new PIXI.Sprite(textureReplay);

let textStyle = {fontFamily: "Arial", fontSize: 30, fill: "white"}
let textStyleTytle = {fontFamily: "Arial", fontSize: 50, fill: "white"}
let title = new PIXI.Text('SpaceX Rockets Louncher', textStyleTytle);
let textNormal = new PIXI.Text('Normal speed: 1 tone/sec', textStyle);
let textFast = new PIXI.Text('Fast speed: 100 tones/sec',textStyle);

title.position.set( (gameWidth / 2)-title.width/2, gameHeight/5);
textNormal.position.set( (gameWidth / 2.5), (gameHeight / 2)+textNormal.height);
textFast.position.set( (gameWidth / 2.5), (gameHeight / 3 )+textFast.height);

playButtonNormal.height = 100;
playButtonNormal.width = 100;

playButtonFast.height = 100;
playButtonFast.width = 100;

buttonReplay.height = 100;
buttonReplay.width = 100;

playButtonNormal.position.set( gameWidth / 3 - playButtonNormal.width / 2, gameHeight / 2 );
playButtonFast.position.set( gameWidth / 3 - playButtonNormal.width / 2, gameHeight / 3);
buttonReplay.position.set( gameWidth / 2 - buttonReplay.width / 2, gameHeight / 3 - buttonReplay.height / 2);

playButtonNormal.interactive = true;
playButtonNormal.buttonMode = true;

playButtonFast.interactive = true;
playButtonFast.buttonMode = true;

buttonReplay.interactive = true;
buttonReplay.buttonMode = true;




buttonReplay
    .on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp)
    .on('click', () => {
        location.reload();
    })

function onButtonDown() {
    this.isdown = true;
    this.alpha = 0.5;
}
function onButtonUp() {
    this.isdown = false;
    this.alpha = 1;
    if (this.isOver) {
        this.texture = textureButtonOver;
    } else {
        this.texture = textureReplay;
    }
}
export  {buttonReplay as button,playButtonNormal,textNormal, playButtonFast,textFast,title };