class Device extends SpaceObject{
    private attachmentPoint: {x: number, y: number};
    
    constructor(so: SpaceObject){
        super(so.position, so.velocity, so.direction, so.rotation)
        this.attachmentPoint = {x:0, y:0};

    }
    

}