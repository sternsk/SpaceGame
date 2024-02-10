class GridBackground{

    width: number; 
    height: number;
    xMin: number;
    yMin: number;

    deltaX: number = 20;
    numberOfVerticalLines: number;
    numberOfHorizontalLines: number;
    

    constructor (width: number, height: number, xMin: number, yMin: number){
        this.width = width;
        this.height = height;
        this.xMin = xMin;
        this.yMin = yMin;

        this.numberOfVerticalLines = this.width / this.deltaX;
        this.numberOfHorizontalLines = this.height / this.deltaX;

    }
    private calculateControlX(xPos: number, xLoc: number, mass: number){
        let controlX = (xPos - Math.sin(10 * (xPos - xLoc) / mass / Math.PI) * mass / Math.PI);
        return controlX;
    }

    public refresh(objectMap: Map<string, SpaceObject>){
        let xPosition = this.xMin;
        //vertical grid lines
        for (let i = 0; i < this.numberOfVerticalLines ; i++){
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            path.setAttribute('stroke', 'black');
            path.setAttribute('stroke-width', '1px');
            path.setAttribute('vector-effect', 'non-scaling-stroke')

        objectMap.forEach((object, key) =>{
            if ((object.mass) && (object.mass != 0)){
                const controlPoint = this.calculateControlX(xPosition, object.position.x, object.mass);
            }
        
        });

        xPosition += this.deltaX;
        }

    }
}