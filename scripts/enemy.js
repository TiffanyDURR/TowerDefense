class Enemy
{
    enemyImage = new Image();

    constructor()
    {
        this.maxHealth = 10;
        this.currentHealth = this.maxHealth;
        this.speed = 0.005;
        this.x = 1;
        this.y = 1;
    }

    load()
    {
        this.enemyImage.src = "assets/enemy.png";
    }

    update()
    {
        this.x += this.speed;
        this.y += this.speed;
    }

    draw(context)
    {
        context.drawImage(this.enemyImage, this.x * 64, this.y * 64);
    }

    get isAlive()
    {
        return this.currentHealth <= 0;
    }
}