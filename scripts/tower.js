class Tower {

  constructor(x, y) {
    this.towerImage = new Image();
    this.x = x;
    this.y = y;
    this.shootSpeed = 0.5;
    this.lastShoot = this.shootSpeed;
  }

  load() {
    this.towerImage.src = "assets/tower.png";
  }

  update(deltaTime, level) {
    this.lastShoot -= deltaTime;


    if (this.lastShoot <= 0)
    {
        this.shoot(level);

        this.lastShoot = this.shootSpeed;
    }
  
  }

  shoot(level)
  {
    let bullet = new Bullet(this.x, this.y, level.enemies[0]);

    bullet.load();

    level.bullets.push(bullet)
  }

  draw(context, x, y) {
    context.drawImage(this.towerImage, x, y);
  }
}
