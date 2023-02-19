class Tower {
  towerImage = new Image();

  load() {
    this.towerImage.src = "assets/tower.png";
  }

  update() {}

  draw(context, x, y) {
    context.drawImage(this.towerImage, x, y);
  }
}
