const canvas = document.getElementById("game");
const context = canvas.getContext("2d");


loadMap();

async function loadMap()
{
    const tileset = new Image();

    tileset.src = "assets/tileset.png";

    var mapData = await getJSON("data/map.json");

    var tileSize = mapData.tileSize;

    console.log(tileset);

    for (let y = 0; y < mapData.data[0].length; y++)
    {
        for (let x = 0; x < mapData.data.length; x++)
        {
            context.drawImage(tileset, tileSize * mapData.data[x][y], 0, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}