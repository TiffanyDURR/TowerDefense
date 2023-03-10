class Enemy {
  constructor(firstPath) {
    this.maxHealth = 10;
    this.speed = 2;
    this.offsetBar = new Vector(0, 5);
    this.collider = null;
    this.pathIndex = 0;
    this.currentHealth = this.maxHealth;
    this.x = firstPath[0];
    this.y = firstPath[1];
    this.sprite = new Sprite(0.2);
    this.foregroundBar = new Image();
    this.backgroundBar = new Image();
  }

  load(tileSize) {
    this.sprite.load("assets/dragon.png", 4);
    this.foregroundBar.src = "assets/foreground.png";
    this.backgroundBar.src = "assets/background.png";
    this.collider = new Collider(this.x, this.y, 1, 1);
  }

  update(deltaTime, paths) {
    if (this.isAlive) {
      this.sprite.update(deltaTime);

      let originPath = paths[this.pathIndex];
      let destinationPath = paths[this.pathIndex + 1];

      let directionX = 0;
      let directionY = 0;

      if (destinationPath[0] > originPath[0]) {
        directionX = this.speed;
      } else if (destinationPath[0] < originPath[0]) {
        directionX = -this.speed;
      }

      if (destinationPath[1] > originPath[1]) {
        directionY = this.speed;
      } else if (destinationPath[1] < originPath[1]) {
        directionY = -this.speed;
      }

      this.x += directionX * deltaTime;
      this.y += directionY * deltaTime;

      let destinationX = destinationPath[0];
      let destinationY = destinationPath[1];

      let delta = 0.05;

      if (Math.abs(destinationX - this.x) <= delta) {
        if (Math.abs(destinationY - this.y) <= delta) {
          this.pathIndex++;

          this.x = destinationX;
          this.y = destinationY;

          if (this.pathIndex == paths.length - 1) {
            this.currentHealth = 0;
          }
        }
      }

      this.collider.update(this.x, this.y);
    }
  }

  draw(context, tileSize) {
    this.sprite.draw(context, tileSize, this.x * tileSize, this.y * tileSize);

    if (this.currentHealth < this.maxHealth) {
      var barX = this.x * tileSize + this.offsetBar.x;
      var barY = this.y * tileSize - this.offsetBar.y;

      var ratio =   (this.currentHealth / this.maxHealth) * this.foregroundBar.width;

      context.drawImage(this.backgroundBar, barX, barY);
      context.drawImage(this.foregroundBar, barX, barY, ratio, this.foregroundBar.height);
    }

    if (debugMode) {
      this.collider.draw(context, this.x * tileSize, this.y * tileSize);
    }
  }

  get isAlive() {
    return this.currentHealth > 0;
  }

  damage(amount) {
    this.currentHealth -= amount;
  }
}
