class Camera {
  constructor(context) {
    this.zoom = 1
    this.zoomPower = 0.05
    this.lookAt = [0, 0]
    this.context = context
    this.zoomMin = 0.5
    this.zoomMax = 3
    this.viewport = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
      scale: [1.0, 1.0],
    }
    this.init()
  }

  init() {
    this.addListeners()
    this.updateViewport()
  }

  begin() {
    this.context.save()
    this.applyScale()
    this.applyTranslation()
  }

  end() {
    this.context.restore()
  }

  applyScale() {
    this.context.scale(this.viewport.scale[0], this.viewport.scale[1])
  }

  applyTranslation() {
    this.context.translate(-this.viewport.left, -this.viewport.top)
  }

  updateViewport() {
    this.aspectRatio = this.context.canvas.width / this.context.canvas.height
    this.viewport.width = this.zoom * Math.tan(Math.PI / 4.0) * this.context.canvas.width
    this.viewport.height = this.viewport.width / this.aspectRatio
    this.viewport.left = this.lookAt[0] - this.viewport.width / 2.0
    this.viewport.top = this.lookAt[1] - this.viewport.height / 2.0
    this.viewport.right = this.viewport.left + this.viewport.width
    this.viewport.bottom = this.viewport.top + this.viewport.height
    this.viewport.scale[0] = this.context.canvas.width / this.viewport.width
    this.viewport.scale[1] = this.context.canvas.height / this.viewport.height
  }

  zoomTo(z) {
    this.zoom = z
    this.updateViewport()
  }

  moveTo(x, y) {
    this.lookAt[0] = x
    this.lookAt[1] = y
    this.updateViewport()
  }

  screenToWorld(x, y, position) {
    position = position || {}
    position.x = x / this.viewport.scale[0] + this.viewport.left
    position.y = y / this.viewport.scale[1] + this.viewport.top

    return position
  }

  worldToScreen(x, y, position) {
    position = position || {}
    position.x = (x - this.viewport.left) * this.viewport.scale[0]
    position.y = (y - this.viewport.top) * this.viewport.scale[1]

    return position
  }

  addListeners() {
    window.onwheel = (e) => {
      let zoomDirection = Math.sign(e.deltaY)
      let zoomLevel = this.zoom

      if (zoomDirection > 0) {
        zoomLevel -= this.zoomPower
      } else if (zoomDirection < 0) {
        zoomLevel += this.zoomPower
      }
      zoomLevel = Math.min(Math.max(zoomLevel, this.zoomMin), this.zoomMax) // Clamp entre zoomMin zoomMax

      this.zoomTo(zoomLevel)
    }
  }
}
