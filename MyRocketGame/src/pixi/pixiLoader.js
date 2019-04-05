export default function pixiLoader(){
    return PIXI.loader
    .add('top', 'assets/rocket_top.png')
    .add('bottom', 'assets/rocket_bottom.png')
    .add('thrust','assets/thrust.png')
    .add('rocket','assets/rocket.png')
}