class Sprite
{
    image = new Image();

    constructor()
    {
        this.currentFrame = 0;
        this.maxFrames = 0;
        this.speedAnimation = 0.2;
        this.nextAnimationTimer = this.speedAnimation;
    }

    load(path)
    {
        this.image.src = path;

        this.maxFrames =  this.image.width / 64;
    }

    update()
    {
        this.nextAnimationTimer -= 1/60;

        if (this.nextAnimationTimer <= 0)
        {
            this.currentFrame += 1;
            this.currentFrame %= this.maxFrames;

            this.nextAnimationTimer = this.speedAnimation;
        }
    }

    draw(context, x, y)
    {
        context.drawImage(this.image,this.currentFrame * 64,0, 64, 64, x, y, 64, 64);
    }
}