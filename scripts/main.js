const canvas = document.getElementById("game");
const debug = document.getElementById("debug");
const context = canvas.getContext("2d");
const cursor = new Image();

let level;
let mousePosition = new Vector(0, 0); 

cursor.src = "assets/cursor.png";
canvas.addEventListener('mousemove', mouseMove);

initialize();

async function initialize()
{
    mapData = await getJSON("data/map.json");

    level = new Level(mapData);
    await level.load();

    canvas.height = level.mapData.background.length * level.tileSize;
    canvas.width = level.mapData.background[0].length  * level.tileSize;

    window.requestAnimationFrame(gameLoop);
}

function gameLoop() 
{
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}

function update()
{
    level.update();
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height); // Clean tout

    level.draw(context); // Draw the map

    drawCursor(); // Draw the cursor
}

function drawCursor()
{
    let x = Math.floor(mousePosition.x / level.tileSize);
    let y = Math.floor(mousePosition.y / level.tileSize);

    logDebug(x + "-" + y);

    context.drawImage(cursor, x * level.tileSize, y * level.tileSize);
}

function logDebug(message)
{
    debug.innerHTML = message;
}

function mouseMove(e)
{
    mousePosition = new Vector(e.offsetX, e.offsetY);
}