class Bullet {
  constructor(x, y, target) {
    this.target = target;
    this.speed = 4;
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.collider = null;
    this.sprite = new Sprite(1);
  }

  load() {
    this.sprite.load("assets/bullet.png", 1);
    this.collider = new Collider(this.x, this.y, 20 / 64, 20 / 64);
  }

  update(deltaTime) {
    this.sprite.update(deltaTime);

    let direction = this.getDirection();

    this.x += direction.x * deltaTime;
    this.y += direction.y * deltaTime;

    this.collider.update(this.x, this.y);

    if (this.target.isAlive) {
      if (this.collider.isColliding(this.target.collider)) {
        this.isAlive = false;
        this.target.currentHealth = 0;
      }
    } else {
      this.isAlive = false;
    }
  }

  getDirection() {
    let x = this.target.x + 0.5 - this.x;
    let y = this.target.y + 0.5 - this.y;

    let distance = Math.sqrt(x * x + y * y);

    let direction = new Vector((x * this.speed) / distance, (y * this.speed) / distance);

    return direction;
  }

  draw(context, tileSize) {
    this.sprite.draw(context, 20, this.x * tileSize, this.y * tileSize);
  }
}
