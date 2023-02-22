class Collider
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 
    }

    isColliding(collider)
    {
        if (this.x < collider.x + collider.width && this.x + this.width > collider.x && this.y < collider.y + collider.height && this.height + this.y > collider.y) 
        {
            return true;
        } 
        
        else 
        {
            return false;
        }
    }

    update(x, y)
    {
        this.x = x;
        this.y = y;
    }

    draw(context,x , y)
    {
        context.globalAlpha = 0.3;

        context.fillStyle = "red";
        context.fillRect(x, y , this.width, this.height);

        context.globalAlpha = 1;
    }

    contains(x, y) 
    {
        return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
    }
    
    get center()
    {
        return new Vector(this.x + this.width / 2, this.y + this.height / 2)
    }

    toString() 
    {
       return `x: ${this.x}, y: ${this.y} width: ${this.width}, y: ${this.height}`;
    }
}