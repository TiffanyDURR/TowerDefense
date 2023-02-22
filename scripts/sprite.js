class Sprite
{
    constructor(speedAnimation)
    {
        this.image = new Image();
        this.currentFrame = 0;
        this.maxFrames;
        this.frameWidth;
        this.frameHeight;
        this.speedAnimation = speedAnimation;
        this.nextAnimationTimer = this.speedAnimation;
    }

    load(path, frameCount)
    {
        this.image.src = path;
        this.maxFrames = frameCount;
        this.frameWidth =  this.image.width / frameCount;
        this.frameHeight =  this.image.height;
    }

    update(deltaTime)
    {
        this.nextAnimationTimer -= deltaTime;

        if (this.nextAnimationTimer <= 0)
        {
            this.currentFrame++;
            this.currentFrame %= this.maxFrames;
            this.nextAnimationTimer = this.speedAnimation;
        }
    }

    get center()
    {
        return new Vector(this.frameWidth / 2, this.frameHeight / 2);
    }

    draw(context, tileSize, x, y)
    {
        context.drawImage(this.image,this.currentFrame * tileSize,0, tileSize, tileSize, x, y, tileSize, tileSize);
    }
}