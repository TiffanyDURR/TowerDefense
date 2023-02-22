class Tower {

  constructor(x, y) {
    this.towerImage = new Image();
    this.target;
    this.detectionRange = 2;
    this.x = x;
    this.y = y;
    this.shootSpeed = 1;
    this.lastShoot = this.shootSpeed;
  }

  load() {
    this.towerImage.src = "assets/tower.png";
  }

  update(deltaTime, level) 
  {
    this.updateTarget(deltaTime, level);
    this.updateShooting(deltaTime, level);
  }

  updateTarget(deltaTime, level)
  {
    if (this.target != null)
    {
      if (!this.target.isAlive) // On check si la cible est toujours vivante
      {
        this.target = null;
      }

      else if (!this.inRange(this.x, this.y, this.target.x, this.target.y)) // On check si la cible est toujours active + toujours dans la zone
      {
        this.target = null;
      }
    }

    else // Sinon, on en cherche une nouvelle
    {
      for (let i = 0; i < level.enemies.length; i++)
      {
        if (this.inRange(this.x, this.y, level.enemies[i].x, level.enemies[i].y))
        {
          this.target = level.enemies[i];
        }
      }
    }
  }

  updateShooting(deltaTime, level)
  {
    this.lastShoot -= deltaTime;

    if (this.target != null)
    {
      if (this.lastShoot <= 0)
      {
          this.shoot(level);

          this.lastShoot = this.shootSpeed;
      }
    }
  }

  inRange(sourceX, sourceY, targetX, targetY){
    let y = targetX - sourceX;
    let x = targetY - sourceY;
    
    var distance = Math.sqrt(x * x + y * y);

    return distance <= this.detectionRange;
}

  shoot(level)
  {
    let bullet = new Bullet(this.x + 0.5 - (10 / 64), this.y + 0.5 - (10 / 64), this.target);

    bullet.load();

    level.bullets.push(bullet)
  }

  draw(context, x, y) {
    context.drawImage(this.towerImage, x, y);

    if (debugMode)
    {
      context.beginPath()
      context.arc(x + 32, y + 32, this.detectionRange * 64, 0, 2 * Math.PI, false)
      context.fillStyle = 'red';
      context.globalAlpha = 0.15;
      context.fill();
      context.globalAlpha = 1;
    }
    }
}
