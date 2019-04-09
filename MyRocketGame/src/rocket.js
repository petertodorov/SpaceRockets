import { Container } from 'pixi.js'

export default class Rocket {
  constructor(top, bottom, thrust, rocket) {
    this.top = top
    this.bottom = bottom
    this.thrust = thrust
    this.rocket = rocket
    this.container = new Container()
    this.rocketContainer = new Container()
    this.nameTagContainer = new Container()
    this.fuelFirstContainer = new Container()
    this.fuelSecondContainer = new Container()
    this.fuelIsEmpty = false
  }
  makeContainer() {
    this.top.x = 0
    this.top.y = 0
    this.bottom.x = 0
    this.bottom.y = this.top.height
    this.thrust.x = (this.bottom.width - this.thrust.width) / 2
    this.thrust.y = this.top.height + this.bottom.height
    this.rocket.scale.set(0.7, 0.7)
    this.container.addChild(this.top)
    this.container.addChild(this.bottom)
    this.container.addChild(this.thrust)
  }
  makeIcon() {
    this.rocketContainer.addChild(this.rocket)
  }
  useFuelFirstStage(fuelConsumptionPerSec) {
    this.firstStageInterval = setInterval(() => {
      this.fuelFirstStage -= fuelConsumptionPerSec
      console.log(this.fuelFirstStage)
      if (this.fuelFirstStage <= 0) {
        this.bottom.alpha -= 0.5;
        this.useFuelSecondStage(fuelConsumptionPerSec)
      }
    }, 1000)
  }
  useFuelSecondStage(fuelConsumptionPerSec) {
    this.thrust.y = this.top.height
    this.secondStageInterval = setInterval(() => {
      this.fuelSecondStage -= fuelConsumptionPerSec
      if (this.fuelSecondStage <= 0) {
        this.top.alpha -= 0.1
        this.thrust.alpha -= 0.1
        this.fuelIsEmpty = true
      }
    }, 1000)
  }

}
