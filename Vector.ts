class Vector {
    private _length: number = 0;
    private _angle: number = 0;
  
    constructor();
    constructor(length: number, angle: number);
    constructor(point:{x:number, y:number});

    //this constructor overload is not callable
    constructor(point1:{x1: number, y1: number}, point2:{x2: number, y2: number});
    constructor(...args: any[]){
      //definitely assign properties
        
      if (args.length === 2 && typeof args[0] === `number` && typeof args[1] === `number`){
            let [length, angle] = args;
            this._length = length;
            if (angle >= 360 || angle < 0) {
                angle = ((angle % 360) + 360) % 360;
            }
            this._angle = angle;
          }
        
        if (args.length ===1){
            const [point] = args;
            this._length = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
            this._angle = Math.atan2(point.y, point.x);
          }
        if (args.length ===2 && typeof args[0] === `object` && typeof args[1] === `object`){
            const [point1, point2] = args;
            this._length = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
            this._angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
          }
    }
    
    static fromLengthAndAngle(length: number, angle: number): Vector {
      if (angle >= 360 || angle < 0) {
          angle = ((angle % 360) + 360) % 360;
      }
      return new Vector(length, angle);
    }

    static fromPoint(point: {x: number, y: number}): Vector {
        const length = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
        const angle = Math.atan2(point.y, point.x);
        return new Vector(length, angle);
    }

    static betweenPoints(point1: {x: number, y: number}, point2: {x: number, y: number}): Vector {
        const length = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
        return new Vector(length, angle);
    }

    distance(v: Vector): number {
        const p1 = this.toPoint();
        const p2 = v.toPoint();
        const distanceVector = Vector.betweenPoints(p1, p2);
        return distanceVector.length;
    }

    add(v: Vector): Vector {
      // Calculate the resulting vector from the addition of two vectors
      
      // Convert the vectors to points
      // Add x and y coordinates
      const newX = this.x + v.x;
      const newY = this.y + v.y;
      
      return new Vector({x: newX, y: newY})
      /* Convert back to scalars
      this._length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      this._angle = Math.atan2(y, x);

      return new Vector(this._length, this._angle);
      */
    }

    

    get angle(): number {

        return this._angle;
    }
    
    get length(): number {
        return this._length;
    }

    get x(): number{
      return this.toPoint().x
    }
    
    get y(): number{
      return this.toPoint().y
    }

    scale(factor: number): Vector {
        return new Vector({x: this.toPoint().x * factor, y: this.toPoint().y * factor});
    }

    set angle(n: number){
      this._angle = n;
    }

    toPoint(): {x:number, y: number} {
      // Create a point object with the x and y coordinates of the vector
      let x= this._length * Math.cos(this._angle);
      let y= this._length * Math.sin(this._angle);

      /* Ensure the angle is positive to avoid flickering when crossing the x-axis
      if (y < 0) {
        y += 2 * Math.PI;
      }
*/
      return { x, y };
    }

  }
  

    

    

     
    
    


