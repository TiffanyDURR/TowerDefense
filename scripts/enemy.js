class Enemy
{
    enemyImage = new Image();
    
    constructor()
    {
        this.maxHealth = 10;
        this.currentHealth = this.maxHealth;
        this.speed = 0.01;
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
            directionX = this.speed;
        }

        else if (destinationPath[0] < originPath[0])
        {
            directionX = -this.speed;
        }

        if (destinationPath[1] > originPath[1])
        {
            directionY = this.speed;
        }

        else if (destinationPath[1] < originPath[1])
        {
            directionY = -this.speed;
        }

        this.x += directionX;
        this.y += directionY;

        let destinationX = destinationPath[0]; 
        let destinationY = destinationPath[1]; 

        let delta = 0.015;

        if (Math.abs(destinationX - this.x) <= delta)
        {
            if (Math.abs(destinationY - this.y) <= delta)
            {
                this.pathIndex++;
                // Corriger la position ici afin d'éviter un cumul de delta
            }
        }
    }

    draw(context)
    {
        context.drawImage(this.enemyImage, (this.x * 64), (this.y * 64));
    }

    get isAlive()
    {
        return this.currentHealth <= 0;
    }
}