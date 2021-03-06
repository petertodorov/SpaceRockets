import * as PIXI from 'pixi.js'
export default function pixiApp (x, y) {
    let typeRend = 'WebGL'
    if (!PIXI.utils.isWebGLSupported()) {
        typeRend = 'canvas'
    }
    PIXI.autoDetectRenderer(0, 0)
    let app = new PIXI.Application(x, y)
    app.renderer.view.style.position = 'absolute'
    app.renderer.view.style.display = 'block'
    app.renderer.autoResize = true
    return app
}
