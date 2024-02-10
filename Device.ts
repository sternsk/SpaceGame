class Device extends SpaceObject{
    private attachmentPoint: {x: number, y: number};
    
    constructor(so: SpaceObject){
        super(so.position, so.velocity, so.rotation, so.direction.angle/Math.PI * 180)
        this.attachmentPoint = {x:0, y:0};

    }
    

}