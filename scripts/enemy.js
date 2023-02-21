class Enemy
{
    constructor(firstPath)
    {
        this.maxHealth = 10;
        this.speed = 2;
        this.collider = null;
        this.pathIndex = 0;
        this.currentHealth = this.maxHealth;
        this.x = firstPath[0];
        this.y = firstPath[1];
        this.sprite = new Sprite(0.2);
    }

    load(tileSize)
    {
        this.sprite.load("assets/dragon.png", tileSize); // Changer pour un count frame plutôt
        this.collider = new Collider(this.x, this.y, 1, 1);
    }

    update(deltaTime, paths)
    {
        if (this.isAlive)
        {
            this.sprite.update(deltaTime);

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

            this.x += directionX * deltaTime;
            this.y += directionY * deltaTime;

            let destinationX = destinationPath[0]; 
            let destinationY = destinationPath[1]; 

            let delta = 0.05        ;

            if (Math.abs(destinationX - this.x) <= delta)
            {
                if (Math.abs(destinationY - this.y) <= delta)
                {
                    this.pathIndex++;

                    this.x = destinationX;
                    this.y = destinationY;

                    if (this.pathIndex == paths.length - 1)
                    {
                        this.currentHealth = 0;
                    }
                }
            }

            this.collider.x = this.x;
            this.collider.y = this.y;
        }
    }

    draw(context, tileSize)
    {
        this.sprite.draw(context, tileSize, (this.x * tileSize), (this.y * tileSize));

        if(debugMode)
            this.collider.draw(context, (this.x * tileSize), (this.y * tileSize));
    }

    get isAlive()
    {
        return this.currentHealth > 0;
    }
}