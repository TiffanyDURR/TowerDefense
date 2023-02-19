class Level {
  tileset = new Image();
  obstacles = new Image();

  constructor(mapData) {
    this.mapData = mapData;
    this.tileSize = mapData.tileSize;
    this.slots = Array.from(
      Array(mapData.background.length),
      () => new Array(mapData.background[0].length)
    );
    console.log(this.slots);
  }

  async load() {
    this.tileset.src = "assets/tileset.png";
    this.obstacles.src = "assets/obstacles.png";
  }

  update() {}

  draw(context) {
    this.drawMap(context);
    this.drawObstacles(context);
    this.drawGrid(context);
    this.drawTowers(context);
  }

  drawMap(context) {
    for (let y = 0; y < mapData.background[0].length; y++) {
      for (let x = 0; x < mapData.background.length; x++) {
        context.drawImage(
          this.tileset,
          this.tileSize * mapData.background[x][y],
          0,
          this.tileSize,
          this.tileSize,
          y * this.tileSize,
          x * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }

  drawObstacles(context) {
    for (let y = 0; y < mapData.foreground[0].length; y++) {
      for (let x = 0; x < mapData.foreground.length; x++) {
        if (mapData.foreground[x][y] != 0) {
          context.drawImage(
            this.obstacles,
            this.tileSize * mapData.foreground[x][y],
            0,
            this.tileSize,
            this.tileSize,
            y * this.tileSize,
            x * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }
  }

  drawGrid(context) {
    context.strokeStyle = "rgba(0,0,0,0.3)";
    context.lineCap = "round";
    context.lineWidth = 3;

    for (let y = 0; y < mapData.foreground.length; y++) {
      let start = new Vector(0, y * this.tileSize);
      let end = new Vector(canvas.width, y * this.tileSize);

      drawLine(start, end);
    }

    for (let x = 0; x < mapData.foreground[0].length; x++) {
      let start = new Vector(x * this.tileSize, 0);
      let end = new Vector(x * this.tileSize, canvas.height);

      drawLine(start, end);
    }
  }

  drawTowers(context) {
    for (let y = 0; y < this.slots.length; y++) {
      for (let x = 0; x < this.slots[0].length; x++) {
        if (this.slots[x][y] != null) {
          this.slots[x][y].draw(context, x * this.tileSize, y * this.tileSize);
        }
      }
    }
  }

  canSpawn(position) {
    if (this.mapData.background[position.x][position.y] == 0) {
      if (this.mapData.foreground[position.x][position.y] == 0) {
        if (this.slots[position.x][position.y] == null) {
          return true;
        }
      }
    }
    return false;
  }
}
