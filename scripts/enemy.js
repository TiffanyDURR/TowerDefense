class Enemy
{
    sprite = new Sprite();
    
    constructor(path)
    {
        this.maxHealth = 10;
        this.currentHealth = this.maxHealth;
        this.speed = 0.02;
        this.x = path[0];
        this.y = path[1];
        this.pathIndex = 0;
    }

    load()
    {
        this.sprite.load("assets/anim.png");
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
                    // Corriger la position ici afin d'éviter un cumul de delta
                    this.pathIndex++; 

                    if (this.pathIndex == paths.length - 1)
                    {
                        this.currentHealth = 0;
                    }
                }
            }
    }
}

    draw(context)
    {
        this.sprite.draw(context, (this.x * 64), (this.y * 64));
    }

    get isAlive()
    {
        return this.currentHealth > 0;
    }
}