class Level {
  tileset = new Image();
  obstacles = new Image();
  enemies = [];
  bullets = [];

  constructor(mapData) {
    this.mapData = mapData;
    this.waveManager = new WaveManager();
    this.tileSize = mapData.tileSize;
    this.slots = Array.from(Array(mapData.background[0].length), () => new Array(mapData.background.length));
  }

  async load() {
    this.tileset.src = "assets/tileset.png";
    this.obstacles.src = "assets/obstacles.png";
  }

  update(deltaTime, mousePosition) {
    this.waveManager.update(deltaTime, this);
    this.updateEnemies(deltaTime, mousePosition);
    this.updateTowers(deltaTime);
    this.updateBullets(deltaTime);
  }

  updateEnemies(deltaTime, mousePosition) {
    let toRemove = [];

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(deltaTime, this.mapData.paths);

      if (!this.enemies[i].isAlive) {
        toRemove.push(this.enemies[i]);
      }
    }

    this.enemies = this.enemies.filter((x) => !toRemove.includes(x));
  }

  updateTowers(deltaTime) {
    for (let y = 0; y < this.slots[0].length; y++) {
      for (let x = 0; x < this.slots.length; x++) {
        if (this.slots[x][y] != null) {
          this.slots[x][y].update(deltaTime, this);
        }
      }
    }
  }

  updateBullets(deltaTime) {
    let toRemove = [];

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update(deltaTime);

      if (!this.bullets[i].isAlive) {
        toRemove.push(this.bullets[i]);
      }
    }

    this.bullets = this.bullets.filter((x) => !toRemove.includes(x));
  }

  draw(context) {
    this.drawMap(context);
    this.drawObstacles(context);
    this.drawGrid(context);
    this.drawEnemies(context);
    this.drawTowers(context);
    this.drawBullets(context);
  }

  drawMap(context) {
    for (let y = 0; y < this.mapData.background[0].length; y++) {
      for (let x = 0; x < this.mapData.background.length; x++) {
        context.drawImage(this.tileset, this.tileSize * this.mapData.background[x][y], 0, this.tileSize, this.tileSize, y * this.tileSize, x * this.tileSize, this.tileSize, this.tileSize);
      }
    }
  }

  drawObstacles(context) {
    for (let y = 0; y < this.mapData.foreground[0].length; y++) {
      for (let x = 0; x < this.mapData.foreground.length; x++) {
        if (this.mapData.foreground[x][y] != 0) {
          context.drawImage(this.obstacles, this.tileSize * this.mapData.foreground[x][y], 0, this.tileSize, this.tileSize, y * this.tileSize, x * this.tileSize, this.tileSize, this.tileSize);
        }
      }
    }
  }

  drawGrid(context) {
    context.strokeStyle = "rgba(134,146,46,0.3)";
    context.lineCap = "round";
    context.lineWidth = 2;

    for (let y = 0; y < this.mapData.background.length; y++) {
      let start = new Vector(0, y * this.tileSize);
      let end = new Vector(canvas.width, y * this.tileSize);

      drawLine(start, end);
    }

    for (let x = 0; x < this.mapData.background[0].length; x++) {
      let start = new Vector(x * this.tileSize, 0);
      let end = new Vector(x * this.tileSize, canvas.height);

      drawLine(start, end);
    }
  }

  drawTowers(context) {
    for (let y = 0; y < this.slots[0].length; y++) {
      for (let x = 0; x < this.slots.length; x++) {
        if (this.slots[x][y] != null) {
          this.slots[x][y].draw(context, x * this.tileSize, y * this.tileSize);
        }
      }
    }
  }

  drawEnemies(context) {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(context, this.tileSize);
    }
  }

  drawBullets(context) {
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(context, this.tileSize);
    }
  }

  canSpawn(position) {
    if (this.mapData.background[position.y][position.x] == 0) {
      if (this.mapData.foreground[position.y][position.x] == 0) {
        if (this.slots[position.x][position.y] == null) {
          return true;
        }
      }
    }
    return false;
  }
}
