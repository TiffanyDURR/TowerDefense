const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const tileset = new Image();
const cursor = new Image();
tileset.src = "assets/tileset.png";
cursor.src = "assets/cursor.png";
canvas.addEventListener('mousemove', mouseMove);

loadMap();

async function loadMap()
{

    var mapData = await getJSON("data/map.json");
    var tileSize = mapData.tileSize;

    canvas.height = mapData.data.length * tileSize;
    canvas.width = mapData.data[0].length  * tileSize;

    for (let y = 0; y < mapData.data[0].length; y++)
    {
        for (let x = 0; x < mapData.data.length; x++)
        {
            context.drawImage(tileset, tileSize * mapData.data[x][y], 0, tileSize, tileSize, y * tileSize, x * tileSize, tileSize, tileSize);
        }
    }
}

function mouseMove(e)
{
    let mousePos = new Vector(e.offsetX, e.offsetY);

    context.drawImage(cursor, mousePos.x, mousePos.y);
}