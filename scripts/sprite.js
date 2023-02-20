class Sprite
{
    constructor(speedAnimation)
    {
        this.image = new Image();
        this.currentFrame = 0;
        this.maxFrames = 0;
        this.speedAnimation = speedAnimation;
        this.nextAnimationTimer = this.speedAnimation;
    }

    load(path, tileSize)
    {
        this.image.src = path;
        this.maxFrames =  this.image.width / tileSize;
    }

    update()
    {
        this.nextAnimationTimer -= 1/60;

        if (this.nextAnimationTimer <= 0)
        {
            this.currentFrame++;
            this.currentFrame %= this.maxFrames;
            this.nextAnimationTimer = this.speedAnimation;
        }
    }

    draw(context, tileSize, x, y)
    {
        context.drawImage(this.image,this.currentFrame * tileSize,0, tileSize, tileSize, x, y, tileSize, tileSize);
    }
}