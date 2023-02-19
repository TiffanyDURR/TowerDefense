class Enemy
{
    enemyImage = new Image();
    
    constructor()
    {
        this.maxHealth = 10;
        this.currentHealth = this.maxHealth;
        this.speed = 0.005;
        this.x = 0;
        this.y = 0;
        this.pathIndex = 0;
    }

    load()
    {
        this.enemyImage.src = "assets/enemy.png";
    }

    update(paths)
    {
        let originPath = paths[this.pathIndex];
        let destinationPath = paths[this.pathIndex + 1];
        
        let directionX = 0;
        let directionY = 0;

        if (destinationPath[0] > originPath[0])
        {
            directionY = this.speed;
        }

        else if (destinationPath[0] < originPath[0])
        {
            directionY = -this.speed;
        }

        if (destinationPath[1] > originPath[1])
        {
            directionX = this.speed;
        }

        else if (destinationPath[1] < originPath[1])
        {
            directionX = -this.speed;
        }

        this.x += directionX;
        this.y += directionY;

        let destinationX = destinationPath[0]; // 0 * 64
        let destinationY = destinationPath[1]; // 3 * 

        let delta = 0.01;

        if (Math.abs(destinationY - this.x) <= delta)
        {
            if (Math.abs(destinationX - this.y) <= delta)
            {
                this.pathIndex++;
            }
        }

    }

    draw(context)
    {
        context.drawImage(this.enemyImage, (this.x * 64) - 32, (this.y * 64) - 32);
    }

    get isAlive()
    {
        return this.currentHealth <= 0;
    }
}