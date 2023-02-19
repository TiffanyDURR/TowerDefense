class Vector 
{
    constructor(x, y) 
    {
      this.x = x;
      this.y = y;
    }
  
    plus(otherVector) 
    {
      return new Vec(this.x + otherVector.x, this.y + otherVector.y);
    }
  
    minus(otherVector) 
    {
      return new Vec(this.x - otherVector.x, this.y - otherVector.y);
    }
  
    get length() 
    {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  
    toString() 
    {
      return `Vec{x: ${this.x}, y: ${this.y}}`;
    }
}