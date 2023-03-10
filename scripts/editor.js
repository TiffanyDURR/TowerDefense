const canvas = document.getElementById("game");
const tileSet = document.getElementById("tileset");
const obstacleSet = document.getElementById("obstacles");
const context = canvas.getContext("2d");
const cursor = new Image();

let level;
let camera;
let mousePosition = new Vector(0, 0);
let lastUpdateTime = 0;
let isDragging = false;
let dragPosition;
let mouseDragPosition;
let currentTile = 0;
let currentObstacle = 0;

cursor.src = "assets/cursor.png";
canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("contextmenu", rightMouseClick);
tileSet.addEventListener("click", tileSetClick);
obstacleSet.addEventListener("click", obstaclesClick);

initialize();

async function initialize() {
  mapData = await getJSON("data/map.json");

  level = new Level(mapData);

  await level.load();

  canvas.width = level.mapData.background[0].length * level.tileSize;
  canvas.height = level.mapData.background.length * level.tileSize;

  window.requestAnimationFrame(gameLoop);

  camera = new Camera(context);

  camera.moveTo(canvas.width / 2, canvas.height / 2);
}

function gameLoop(currentTime) {
  draw();

  lastUpdateTime = currentTime;

  window.requestAnimationFrame(gameLoop);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clean tout

  camera.begin();

  level.draw(context); // Draw the map

  drawCursor(); // Draw the cursor

  camera.end();
}

function drawCursor() {
  let gridPosition = mouseToGridPixel(mousePosition, level.tileSize, camera);

  context.drawImage(cursor, gridPosition.x, gridPosition.y);
}

function changeTile(position, tileID) {
  level.mapData.background[position.y][position.x] = tileID;
}

function changeObstacle(position, obstacleID) {
  level.mapData.foreground[position.y][position.x] = obstacleID;
}

function mouseMove(e) {
  mousePosition = new Vector(e.offsetX, e.offsetY);

  if (isDragging) {
    camera.moveTo(dragPosition.x + (mouseDragPosition.x - mousePosition.x) * camera.zoom, dragPosition.y + (mouseDragPosition.y - mousePosition.y) * camera.zoom);
  }

  if (camera != null) mousePosition = camera.screenToWorld(mousePosition.x, mousePosition.y);
}

function mouseDown(e) {
  if (e.button == 0) {
    // Click gauche
    let position = mouseToGrid(mousePosition, level.tileSize);

    changeTile(position, currentTile);
  } else if (e.button == 1) {
    // Click molette
    let position = mouseToGrid(mousePosition, level.tileSize);

    changeObstacle(position, currentObstacle);
  } else if (e.button == 2) {
    // Click droit
    isDragging = true;

    dragPosition = new Vector(camera.lookAt[0], camera.lookAt[1]); // Permet de prendre la valeur et non la réference

    mouseDragPosition = new Vector(e.offsetX, e.offsetY);
  }
}

function mouseUp(e) {
  if (e.button == 2) {
    isDragging = false;
  }
}

function rightMouseClick(e) {
  e.preventDefault(); // On empêche juste le menu de s'ouvrir pour que mousedown detect le droit aussi
}

function tileSetClick(e) {
  let position = new Vector(e.offsetX, e.offsetY);
  let gridPos = mouseToGrid(position, 64);

  currentTile = gridPos.x;
}

function obstaclesClick(e) {
  let position = new Vector(e.offsetX, e.offsetY);
  let gridPos = mouseToGrid(position, 64);

  currentObstacle = gridPos.x;
}

function saveClick() {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(level.mapData, null, 2)], {
      type: "text/plain",
    })
  );
  a.setAttribute("download", "map.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function loadClick() {
  var input = document.createElement("input");
  input.type = "file";
  input.onchange = (e) => {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;

      level.mapData = JSON.parse(content);
    };
  };
  input.click();
}
