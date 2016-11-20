const log = require('debug')('ob-scene:Scene')

class Scene {
  constructor(config) {
    this.name = config.name
    this.ownCreate = config.create
    this.ownUpdate = config.update
    this.ownDraw = config.draw
    this.ownDestroy = config.destroy
  }
  changeScene(sceneName, nextSceneParams) {
    // will be overridden by SceneManager
  }
  create() {
    this.ownCreate && this.ownCreate.apply(this, arguments)
  }
  update() {
    this.ownUpdate && this.ownUpdate.apply(this, arguments)
  }
  draw() {
    this.ownDraw && this.ownDraw.apply(this, arguments)
  }
  destroy() {
    this.ownDestroy && this.ownDestroy.apply(this, arguments)
  }
}

module.exports = Scene
