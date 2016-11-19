const log = require('debug')('ob-scene:SceneManager')

class SceneManager {
  constructor() {
    this.scenes = []
    this.currentScene = null
  }
  changeScene(sceneName, nextSceneParams) {
    log(`changeScene - sceneName: '${sceneName}' - nextSceneParams:, nextSceneParams`)

    nextSceneParams = nextSceneParams || {}
    if (this.currentScene) {
      this.currentScene.destroy(nextSceneParams)
    }
    this.currentScene = this.scenes.find(function (scene) {
      return scene.name === sceneName
    })

    if (!this.currentScene) {
      throw Error(`No scene with name '${sceneName}'`)
    }

    this.currentScene.create(nextSceneParams)
  }
  setScenes(scenes) {
    log(`setScenes: ${scenes}`)

    if (!(scenes instanceof Array)) {
      throw Error(`scenes must be of type Array`)
    }

    this.scenes = scenes

    this.scenes.forEach(function (scene) {
      scene.sceneManager = this
    }.bind(this))
  }
  update() {
    this.currentScene.update.apply(this.currentScene, arguments)
  }
  draw() {
    this.currentScene.draw.apply(this.currentScene, arguments)
  }
}

module.exports = SceneManager
