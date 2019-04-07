import Rocket from './rocket'
export default function createRocket (resources) {
  return new Rocket(
    new PIXI.Sprite(resources.top.texture),
    new PIXI.Sprite(resources.bottom.texture),
    new PIXI.Sprite(resources.thrust.texture),
    new PIXI.Sprite(resources.rocket.texture)
  )
}
