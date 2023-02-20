class WaveManager
{
    constructor()
    {
        this.nextSpawn = 0;
        this.currentWaveIndex = 0;
    }

    update(level)
    {
        this.nextSpawn -= 1/60;

        if (this.nextSpawn <= 0)
        {
            this.spawn(level);

            this.nextSpawn = level.mapData.timeBetweenSpawn;
        }
    }

    spawn(level)
    {
        let enemy = new Enemy(level.mapData.paths[0]);

        enemy.load(level.tileSize);

        level.enemies.push(enemy);
    }
}