class Bullet
{
    constructor(x, y, target)
    {
        this.target = target;
        this.speed = 4;
        this.x = x;
        this.y = y;
        this.isAlive = true;
        this.collider = null;
        this.sprite = new Sprite(1);
    }

    load()
    {
        this.sprite.load("assets/bullet.png", 20);
        this.collider = new Collider(this.x, this.y, 20 / 64, 20 / 64);
    }

    update(deltaTime)
    {
        this.sprite.update(deltaTime);
        
        let x = (this.target.x - this.x);
        let y = (this.target.y - this.y);

        let distance = Math.sqrt(x * x + y * y);

        this.x += (x * this.speed * deltaTime) / distance;
        this.y += (y * this.speed * deltaTime) / distance;

        this.collider.x = this.x;
        this.collider.y = this.y;

        if (this.target.isAlive)
        {
            if (this.collider.isColliding(this.target.collider))
            {
                this.isAlive = false;
                this.target.currentHealth = 0;
            }
        }

        else
        {
            this.isAlive = false;
        }
    }

    length(x, y)
    {
        return Math.sqrt(x * x + y * y);
    }

    draw(context, tileSize)
    {
        this.sprite.draw(context, 20, (this.x * tileSize), (this.y * tileSize));

       // if(debugMode)
       //     this.collider.draw(context, (this.x * tileSize), (this.y * tileSize));
    }
}