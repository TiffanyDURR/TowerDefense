class Enemy
{
    
    constructor(firstPath)
    {
        this.maxHealth = 10;
        this.speed = 0.02;
        this.pathIndex = 0;
        this.currentHealth = this.maxHealth;
        this.x = firstPath[0];
        this.y = firstPath[1];
        this.sprite = new Sprite(0.2);
    }

    load(tileSize)
    {
        this.sprite.load("assets/dragon.png", tileSize);
    }

    update(paths)
    {
        if (this.isAlive)
        {
            this.sprite.update();

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

            let delta = 0.025;

            if (Math.abs(destinationX - this.x) <= delta)
            {
                if (Math.abs(destinationY - this.y) <= delta)
                {
                    this.pathIndex++; // Corriger la position ici afin d'éviter un cumul de delta

                    if (this.pathIndex == paths.length - 1)
                    {
                        this.currentHealth = 0;
                    }
                }
            }
        }
    }

    draw(context, tileSize)
    {
        this.sprite.draw(context,tileSize, (this.x * tileSize), (this.y * tileSize));
    }

    get isAlive()
    {
        return this.currentHealth > 0;
    }
}