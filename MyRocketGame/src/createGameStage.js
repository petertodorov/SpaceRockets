import { Container } from 'pixi.js';

export default function addRocketsToGameStage(rockets,gameWidth,gameHeight) {
   
    let gameStage = new Container();
    gameStage.name = 'gameContainer';
    
    let distanceBetweenRockets = (gameWidth / rockets.length);
    let x = distanceBetweenRockets / 2;
    let y = gameHeight - (rockets[0].top.height+rockets[0].bottom.height);
    let iconsY = 0;
    rockets.forEach(rocket => {
        rocket.container.position.set(x, y)
        x += distanceBetweenRockets;
        gameStage.addChild(rocket.container);
    })
    rockets.forEach(rocket=>{
        rocket.rocketContainer.position.set(0, iconsY)        
        rocket.nameTagContainer.position.set(0,iconsY)
        rocket.fuelFirstContainer.position.set(0,iconsY)
        rocket.fuelSecondContainer.position.set(0,iconsY)
        iconsY+=rockets[0].rocketContainer.height*2.2;
        gameStage.addChild(rocket.rocketContainer);
        gameStage.addChild(rocket.nameTagContainer);
        gameStage.addChild(rocket.fuelFirstContainer);
        gameStage.addChild(rocket.fuelSecondContainer);
        rocket.container.name = rocket.name;
        rocket.rocketContainer.name = 'Icon ' + rocket.name;
        rocket.nameTagContainer.name = 'NameTag';
        rocket.fuelFirstContainer.name = 'FirstStageFuel';
        rocket.fuelSecondContainer.name = 'SecondStageFuel';
    })
    return gameStage
}
