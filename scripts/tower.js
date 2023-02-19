class Tower {
  towerImage = new Image();

  async load() {
    this.towerImage.src = "assets/tower.png";
  }

  update() {}

  draw(context, x, y) {
    context.drawImage(this.towerImage, x, y);
  }
}
