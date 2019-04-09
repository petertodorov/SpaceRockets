import * as PIXI from 'pixi.js'
import pixiApp from './pixi/pixiApp'
import pixiLoader from './pixi/pixiLoader'
import createRocket from './createRocket'
import addRocketsToGameStage from './createGameStage'
import fetchRocketsInfo from './fetchRockets'
import { button as buttonReplay } from './pixi/buttons'
import { playButtonNormal } from './pixi/buttons'
import { playButtonFast } from './pixi/buttons'

import { textNormal } from './pixi/buttons'
import { textFast } from './pixi/buttons'
import { title } from './pixi/buttons'
import '../src/style.css'

let state
let gameScene
let sucessScene
let allRockets = []
let speed
let fuelConsumptionPerSec = 0

let gameWidth = document.documentElement.clientWidth - 20
let gameHeight = document.documentElement.clientHeight - 20
let metaDataStyle = { fontFamily: 'Arial', fontSize: 16, fill: 'white' }
let messageStyle = { fontFamily: 'Arial', fontSize: 64, fill: 'white' }

const app = pixiApp(gameWidth, gameHeight)
document.body.appendChild(app.view)

let background = new PIXI.Sprite.fromImage ('assets/bg.jpg')
background.width = gameWidth
background.height = gameHeight

app.stage.addChild(background)
app.stage.addChild(playButtonNormal)
app.stage.addChild(textNormal)
app.stage.addChild(playButtonFast)
app.stage.addChild(textFast)
app.stage.addChild(title)

function hideStartButtons () {
  playButtonNormal.visible = false
  playButtonFast.visible = false
  app.stage.removeChild(textFast)
  app.stage.removeChild(textNormal)
  app.stage.removeChild(title)
}

playButtonNormal.on('click', () => {
  fuelConsumptionPerSec = 1

  pixiLoader().load(setup)
  hideStartButtons()
})

playButtonFast.on('click', () => {
  fuelConsumptionPerSec = 100

  pixiLoader().load(setup)
  hideStartButtons()
})

async function setup (loader, resources) {
  try {
    let allRocketsData = await fetchRocketsInfo()
    for (let i = 0; i < allRocketsData.length; i++) {
      let rocketData = allRocketsData[i]
      let rocket = Object.assign(createRocket(resources), rocketData)
      rocket.makeContainer()
      rocket.makeIcon()
      let tagName = new PIXI.Text(rocket.name + ' Fuel', metaDataStyle)
      tagName.position.set(i * rocket.width, rocket.rocketContainer.height + 7)
      rocket.nameTagContainer.addChild(tagName)
      allRockets.push(rocket)
    }
  } catch (err) {
    console.log(err)
  }

  gameScene = addRocketsToGameStage(allRockets, gameWidth, gameHeight)
  sucessScene = new PIXI.Container()
  sucessScene.visible = false

  let message = new PIXI.Text('SUCCESS!', messageStyle)
  message.position.set(gameWidth / 2 - message.width / 2, gameHeight / 2)

  app.stage.addChild(gameScene)
  app.stage.addChild(sucessScene)
  sucessScene.addChild(message)
  sucessScene.addChild(buttonReplay)

  state = lounchRockets
  app.ticker.add(delta => gameLoop(delta, allRockets))
  allRockets.forEach(rocket => {rocket.useFuelFirstStage(fuelConsumptionPerSec)})
}

function gameLoop (delta, allRockets) {
  state(delta)
  checkRocketsStatus(allRockets)
}

function lounchRockets () {
  allRockets.forEach(rocket => {
    let [top, bottom, thrust] = rocket.container.children
    if (rocket.container.y > 0) {
      speed = 0.1
    } else {
      speed = 0
      // rocket.thrust.visible = false;
    };
    rocket.container.y -= speed
    thrust.scale.y = Math.random()
  })
}

function fuelChecker (rocket, index) {
  let fuelFirst = new PIXI.Text(`Stage1: ${Math.round(rocket.fuelFirstStage)}`, metaDataStyle)
  let fuelSecond = new PIXI.Text(`Stage2: ${Math.round(rocket.fuelSecondStage)}`, metaDataStyle)

  fuelFirst.position.set(index * rocket.width, rocket.rocketContainer.height + 25)
  fuelSecond.position.set(index * rocket.width, rocket.rocketContainer.height + 45)

  rocket.fuelFirstContainer.addChild(fuelFirst)
  rocket.fuelSecondContainer.addChild(fuelSecond)

  let removerFirstFuelInterval = setInterval(() => {
    rocket.fuelFirstContainer.removeChildren()
  }, 10)
  let removerSecondFuelInterval = setInterval(() => {
    rocket.fuelSecondContainer.removeChildren()
  }, 10)

  if (rocket.fuelFirstStage < 0) {
    clearInterval(rocket.firstStageInterval)          
    clearInterval(removerFirstFuelInterval)
    rocket.fuelFirstContainer.destroy()
  }
  if (rocket.fuelSecondStage < 0) {
    clearInterval(rocket.secondStageInterval)          
    clearInterval(removerSecondFuelInterval)
    rocket.fuelSecondContainer.destroy()
  }
}

function checkRocketsStatus (allRockets) {
  allRockets.forEach((rocket, index) => {
    if (rocket.fuelIsEmpty === true) {
      rocket.rocketContainer.alpha -= 0.01
      rocket.nameTagContainer.alpha -= 0.01
    } else {
      fuelChecker(rocket, index)
    }
  })
  if (allRockets.every(rocket => rocket.fuelIsEmpty === true)) {
    state = end
  }
}

function end () {
  setTimeout(() => {
    sucessScene.visible = true
    gameScene.visible = false
  }, 2200)
}
