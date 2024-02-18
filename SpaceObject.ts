class SpaceObject {
    protected _position: Vector = Vector.fromPoint({x:0,y:0});
    protected _velocity: Vector = Vector.fromPoint({x:0,y:0});
    protected _direction: Vector = new Vector(1, 0); // degrees
    protected _rotation: number = 0;  // enduring rotation in degrees
    protected _scale: number = 1;
    protected _maneuverability: number = 5;
    protected _mass?: number; 
    
    protected gElement?: SVGGElement | null;
    protected _rotationPivot: {x: number, y:number} = {x:0, y:0};

    protected _image?: SVGImageElement;  // Falls ein Image eingefügt wird
    protected centerOfImage?: {x:number, y:number} = {x: 0, y:0};
    
    protected _imageWidth?: number;

    constructor(
        position: Vector, 
        velocity: Vector, 
        direction: Vector,      // degrees
        rotation: number,
        gElement?: SVGElement,
        imageUrl?: string       // Optionaler Parameter für das Bild
    );
    constructor(
        position: Vector, 
        velocity: Vector, 
        direction: Vector, 
        rotation: number);

    constructor();
    
    constructor(...args: any[]){
        
        if (args.length >= 4){
            let[position, velocity, direction, rotation, gElement, imageUrl] = args
            this._position = position;
            this._velocity = velocity;
            this._direction = direction;
            this._rotation = rotation;
            
            this._scale = 1;
            this._maneuverability = 5;
            
            this._mass = 0;

            if(gElement){
                this.gElement = gElement;}
                else {
                    this.gElement = null;
                }
            this._image = undefined;
            
            if (imageUrl){
                this.gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
                this._image = document.createElementNS("http://www.w3.org/2000/svg", "image");
                this._image.href.baseVal = imageUrl;    
                
                this.gElement.appendChild(this._image);
               
                this._image.onload = () =>{
                
                    if(this._image && this.gElement){
                        this._imageWidth = this._image.getBBox().width;
                        this.centerOfImage = {x: this._image.getBBox().width / 2, y: this._image.getBBox().height / 2}
                    
                    this._image.setAttribute('x', ((-this.centerOfImage.x).toString()));//probiere auch this.image.getBBox().width und 
                    this._image.setAttribute('y', ((-this.centerOfImage.y).toString())); // -  this.image.height.baseVal.value/ 2
                    
                    //console.log("rotationPivot set by Spaceobject")
                    }
                };
            }    
        }
        if (args.length ===0){
            this._rotation = 0;
            this._mass = 0;
        }
        

    }

    // Methode zur Beschleunigung in Blickrichtung
    accelerate(thrust: number): void {
   
        // Hinzufügen der Beschleunigung zur aktuellen Geschwindigkeit
        this._velocity = this._velocity.add(this._direction.scale(thrust));
        
    
    }

    brake(dampingFactor: number): void {
        // Verringere die Geschwindigkeit um den Dämpfungsfaktor
         this._velocity = this._velocity.scale(1 - dampingFactor);
        
        // this._velocity.add(new Vector(.5, this.direction.angle))
        // Optional: Stoppe die Bewegung vollständig, wenn die Geschwindigkeit einen bestimmten Schwellenwert unterschreitet
         if (this._velocity.length < 0.01) {
            this._velocity = new Vector(0, 0);
        }
        
    }

    distance(v: Vector): number{
        const p1 = this.position.toPoint()
        const p2 = v.toPoint()
        const distanceVector = Vector.betweenPoints(p1, p2)
        return distanceVector.length;
    }

    get direction(): Vector{
        return this._direction;
    }

    get image(): SVGImageElement | undefined{
        return this._image;
    }

    get imageWidth(): number | undefined{
        if (this._imageWidth){
            return this._imageWidth;
        }
        else return undefined;
    }

    get position(): Vector{
        return this._position;
    }

    get velocity(): Vector{
        return this._velocity;
    }

    get rotation(): number{
        return this._rotation;
    }

    get rotationPivot(){
        return this._rotationPivot;
    }

    get scale(): number{
        return this._scale;
    }

    // Getter-Methode, um die SVG-Elemente zu erhalten
    get svgElem(): SVGGElement | null {
        if (this.gElement){
         return this.gElement;
        }
        else return null;
        
    }    
    
    // Behandeln von Keyboard-Eingaben in SpaceObjects
    handleKeyboardInput(keysPressed: {[key: string]: boolean}) {
        if (keysPressed['ArrowLeft']) {
            this.rotate(-this._maneuverability);
        }
        
        if (keysPressed['ArrowRight']) {
            this.rotate(this._maneuverability);
        }
        
        if (keysPressed['ArrowUp']) {
            this.accelerate(this._maneuverability/100);
        }

        if (keysPressed['ArrowDown']) {
            this.brake(this._maneuverability/100);
        }
        
        if (keysPressed[' ']) {
            //Aktion beim Drücken von Space
        }
        // console.log(keysPressed);
        // Weitere Tastenabfragen...
    }
    
    // Behandeln von HTML-Input-Eingaben
    handleHtmlInput(input: {type: string, value: number}) {
        switch (input.type){ 
            case `acceleration`:
                this.accelerate(input.value);
                break;
            case `rotation`:
                this.rotate(input.value);
                break;
        }
        
    }
    // Methode zur Änderung der direction
    rotate(angle: number): void {
        let direct = this._direction.angle;
        direct += angle;
        
        if (direct >= 360 || direct < 0) {
            direct = ((direct % 360) + 360) % 360;
        }
        this._direction.angle = direct;
    }

    set direction(d: Vector){
        this._direction = d;
    }

    set mass(n: number){
        this._mass = n;
    }

    setImageWidth(n: number | undefined) {
        this._imageWidth = n;
        if(this._image){    
            this._image.setAttribute('width', (`${this._imageWidth}`)); 
        }
    }

    set position(p: Vector){
        this._position= p;
    }

    setScale(s: number){
        this._scale= s;
    }

    setRotationPivot({x, y}: {x: number, y: number}){
        this._rotationPivot = {x, y};
    }
    
    set velocity(velocity: Vector){
        this._velocity= velocity;
    }

    update(): void {
        //update position
        this.position = this._position.add(this._velocity);
        //console.log("this._position.toPoint().x: ",this._position.toPoint().x, "this._position.toPoint().y: ", this._position.toPoint().y);
        
        //update rotation;
        this.rotate(this._rotation);
  
        if (this.gElement) {
                const transform = 
                    `translate( ${this._position.x}, 
                            ${this._position.y}) 
                    rotate(${this._direction.angle + 90},
                            ${this._rotationPivot.x},
                            ${this._rotationPivot.y})
                    scale(${this._scale})`;
                this.gElement.setAttribute('transform', transform);
        }
        
    }
}
