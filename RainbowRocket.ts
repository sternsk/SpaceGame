import { Spacecraft } from "./Spacecraft";
import { Vector } from "./Vector";

export class RainbowRocket extends Spacecraft {
    
    private _summits = false;
    
    // Constructor overload without parameters
    constructor();

    // Constructor overload with parameters
    constructor(
        position: Vector, 
        velocity: Vector, 
        direction: Vector,
        rotation: number, 
        gElement?: SVGGElement,
        imageUrl?: string
    );

    // Actual constructor implementation
    constructor(
       /* position: Vector = Vector.fromPoint({x:0, y:0}), 
        velocity: Vector = Vector.fromPoint({x:0,y:0}), 
        direction: Vector = new Vector(1, 0),
        rotation: number = 0, 
        gElement?: SVGGElement,
        imageUrl?: string*/
                ) {
        // Call the super constructor with the provided parameters if they exist
        super(/*position, velocity, direction, rotation, gElement, imageUrl*/
                );
        
        // Additional initialization specific to RainbowRocket
        this._svgElement = [];
        this.gElement = this.createRocketSvg();
        
        this.createRainbowRocketdefsElement();
        //console.log(this._defsElement)
        //this._svgElement.push(this._defsElement!)
        this._svgElement.push(this.gElement)
    }

    propulsionFire(){
        //grab the fire out of the DOM
        const fire = document.getElementById("fire")
        const flameDistraction = this.velocity.length/5
                                                  
        fire?.setAttribute("display", "block")

        let animateFire = () =>{}
        
        let deltaValues: {x: number, y: number}[] []= []

        for(let i = 0; i<6; i++){
            
            deltaValues[i] = []
            for(let j = 0; j<2; j++){ 
                // propulsionFireData serves as Attractor
                // console.log("i: "+i+"j: "+j)
                // console.log(this.propulsionFireData[i][j].x)
                
                deltaValues[i][j] = {x: Math.random()*flameDistraction - flameDistraction/2, 
                                    y: Math.random()*flameDistraction - flameDistraction/3}

            }
            
        }
    
        animateFire = () =>{
        /* fire consists of a path from M -2 2          starting Point
                                        q -1 3, 0 6     first path to first flamespire, controlPoint first! initialFlameSpire1
                                        q 1 -1, 1 -2    second path
                                        q 0 1.5, 1 3    third path to second flameSpire     initialFlameSpire2
                                        q 1 -1.5, 1 -3  fourth path
                                        q 0 1, 1 2      fifth path to third flameSpire  	initialFlameSpire3
                                        q 1 -3,  0 -6   sixth path
                                        q -2 -0.5, -4 0 closing Path
            
            or in absolute Coordinates  Q -3 5, -2 8    flameSpire1
                                        Q -1 7, -1 6

                                        Q -1 7.5, 0 9   flameSpire2
                                        Q 1 7.5, 1 6 
                                        
                                        Q 1 7, 2 8      flameSpire3
                                        Q 3 5, 2 2
                                        Q 0 1.5, -2 2   closing path
       // outdatet - see branch "misconception of flamemovement"
       // define five random points as delta-flamespires and corresponding random delta-controlPoints
        // for each point define a random framenumber when to reach the target point
        // when targetpoint is reached, ask for the next random target point
        // ask for the next frame and then move the path attribut linear stepwise to their target-direction
        //that means creating 
        */
            
            fire?.setAttribute("d", `M -2 2 
                                    Q   ${this.flameSpire1LeftPathControlPoint.x + deltaValues[0][0].x} 
                                        ${this.flameSpire1LeftPathControlPoint.y + deltaValues[0][0].y}, 
                                        ${this.flameSpire1LeftPath.x + deltaValues[0][1].x} 
                                        ${this.flameSpire1LeftPath.y + deltaValues[0][1].y} 
                                    Q   ${this.flameSpire1RightPathControlPoint.x + deltaValues[1][0].x} 
                                        ${this.flameSpire1RightPathControlPoint.y + deltaValues[1][0].y}, 
                                        ${this.flameSpire1RightPath.x + deltaValues[1][1].x} 
                                        ${this.flameSpire1RightPath.y + deltaValues[1][1].y}
                                    Q   ${this.flameSpire2LeftPathControlPoint.x + deltaValues[2][0].x} 
                                        ${this.flameSpire2LeftPathControlPoint.y + deltaValues[2][0].y}, 
                                        ${this.flameSpire2LeftPath.x + deltaValues[2][1].x} 
                                        ${this.flameSpire2LeftPath.y + deltaValues[2][1].y} 
                                    Q   ${this.flameSpire2RightPathControlPoint.x + deltaValues[3][0].x} 
                                        ${this.flameSpire2RightPathControlPoint.y + deltaValues[3][0].y}, 
                                        ${this.flameSpire2RightPath.x + deltaValues[3][1].x} 
                                        ${this.flameSpire2RightPath.y + deltaValues[3][1].y} 
                                    Q   ${this.flameSpire3LeftPathControlPoint.x + deltaValues[4][0].x} 
                                        ${this.flameSpire3LeftPathControlPoint.y + deltaValues[4][0].y}, 
                                        ${this.flameSpire3LeftPath.x + deltaValues[4][1].x} 
                                        ${this.flameSpire3LeftPath.y + deltaValues[4][1].y} 
                                    Q   ${this.flameSpire3RightPathControlPoint.x + deltaValues[5][0].x} 
                                        ${this.flameSpire3RightPathControlPoint.y + deltaValues[5][0].y}, 
                                        2 2
                                    Q   0 1.5, -2 2
                                    `)
                fire?.setAttribute("stroke", "brown")
            }
            
            requestAnimationFrame(animateFire)  
        
        animateFire()
        
        
    }

    animateInnerFire(){
        const fire = document.getElementById("innerfire")
        
        const flameDistraction = this.velocity.length/20

        let animateFire = () =>{}
        
        let deltaValue: {x: number, y: number}[] = []
        for(let i=0;i<2;i++){ 
            deltaValue[i] = {x: Math.random()*flameDistraction - flameDistraction/2, 
                                    y: Math.random()*flameDistraction - flameDistraction/2.2}
        }
        animateFire = () =>{
            
            fire?.setAttribute("d", `M -1 1.5 
                                    Q   ${this.innerFlameSpire1LeftPathControlPoint.x + deltaValue[0].x} 
                                        ${this.innerFlameSpire1LeftPathControlPoint.y + deltaValue[0].y}, 
                                        ${this.innerFlameSpire1LeftPath.x + deltaValue[0].x} 
                                        ${this.innerFlameSpire1LeftPath.y + deltaValue[0].y} 
                                    Q   ${this.innerFlameSpire1RightPathControlPoint.x + deltaValue[0].x} 
                                        ${this.innerFlameSpire1RightPathControlPoint.y + deltaValue[0].y}, 
                                        ${this.innerFlameSpire1RightPath.x + deltaValue[0].x} 
                                        ${this.innerFlameSpire1RightPath.y + deltaValue[0].y}
                                    Q   ${this.innerFlameSpire2LeftPathControlPoint.x + deltaValue[0].x} 
                                        ${this.innerFlameSpire2LeftPathControlPoint.y + deltaValue[0].y}, 
                                        ${this.innerFlameSpire2LeftPath.x + deltaValue[0].x} 
                                        ${this.innerFlameSpire2LeftPath.y + deltaValue[0].y} 
                                    Q   ${this.innerFlameSpire2RightPathControlPoint.x + deltaValue[0].x} 
                                        ${this.innerFlameSpire2RightPathControlPoint.y + deltaValue[0].y}, 
                                        0 -3
                                        
                                    `)
                }
            
            requestAnimationFrame(animateFire)  
        
        animateFire()
        
        
    }
    
    animateSummit(){
        const summitBall = document.getElementById("summitBall")
        const summit = document.getElementById("summit")
        this.summitballX = Math.random() * 2 - 1
        this.summitballY = Math.random() * -2 - 9
        summitBall?.setAttribute("cx", `${this.summitballX}`)
        summitBall?.setAttribute("cy", `${this.summitballY}`)
        summit?.setAttribute("stroke", "grey")
        summit?.setAttribute("stroke-width", ".1")
        summit?.setAttribute("x2", `${this.summitballX}`)
        summit?.setAttribute("y2", `${this.summitballY}`)
    }

    private createRainbowRocketdefsElement(){
        this._defsElement = document.createElementNS("http://www.w3.org/2000/svg", "defs")
        //erstelle drei lineardefsElement
        const numberOfGradients = 3;
        const linearGradient: SVGLinearGradientElement[] = [];
        
        // erzeuge numberOfGradients linearGradients
        for (let i=0; i<numberOfGradients; i++){
            const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
            gradient.setAttribute("id", `gradient${i}`)
            linearGradient.push(gradient);
        }

        // erstelle einen zweidimensionalen Array von stops für die Gradients
        const stop: SVGStopElement[][] = [
            [
                this.createStop("0%", "stop-color:#5b79a8"), 
                this.createStop("50%", "stop-color:#ffffff", "100"), 
                this.createStop("100%", "stop-color:#a2a85b"), 
            ],
            [
                this.createStop("0%", "stop-color:#ff0000"), 
                this.createStop("20%", "stop-color:#ffff00"), 
                this.createStop("40%", "stop-color:#00ff00"), 
                this.createStop("60%", "stop-color:#0000ff"), 
                this.createStop("80%", "stop-color:#ff00ff"), 
                this.createStop("100%", "stop-color:#ff0000"), 
            ],
            [
                this.createStop("0%", "stop-color:#5b79a8"), 
                this.createStop("50%", "stop-color:#00000", "0"), 
                this.createStop("100%", "stop-color:#a2a85b"),             
            ]
        ];

        //füge dem ersten Gradient drei stops, dem zweiten 6 stops und dem dritten drei stops hinzu
        const stopAmounts = [3,6,3];
        for (let i=0; i<stopAmounts.length; i++){
            
            for (let j=0; j<stopAmounts[i]; j++){
                linearGradient[i].appendChild(stop[i][j] )
            }
        }
        linearGradient.forEach((object) =>{
            this._defsElement?.appendChild(object)
        })
        
    } 

    private createStop(offset: string, stopColor: string, stopOpacity?: string): SVGStopElement {
        const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop") as SVGStopElement;
        stop.setAttribute("offset", offset);
        stop.setAttribute("stop-color", stopColor);
        if (stopOpacity) {
            stop.setAttribute("stop-opacity", stopOpacity);
        }
        return stop;
    }

    get summits(): boolean{
        return this._summits
    }

    update(){
        super.update()
        this.animateInnerFire()
    }

    handleKeyboardInput(keysPressed: {[key: string]: boolean}) {
        super.handleKeyboardInput(keysPressed)
        if (keysPressed[' ']) {
            this.animateSummit()
            this._summits = true;
            //lets get the rocket leave a trail
            //let summitShit: SVGPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
            
            let svgElem = document.getElementsByClassName("mainSVG").item(0) as SVGSVGElement

       /*     summitShit.setAttribute("d", `M ${this._position.x + this.summitballX} ${this.position.y + this.summitballY} v10`)
            summitShit.setAttribute("stroke", "brown")
            summitShit.setAttribute("stroke-width", "10px")
            summitShit.setAttribute("class", "summitShit")
            
            svgElem?.appendChild(summitShit)
         */  
        }else{
            this._summits = false
        }
        if(keysPressed[`ArrowUp`]){
            this.propulsionFire()    
        }
        else{
            let fire = document.getElementById("fire")
            fire?.setAttribute("display", "none")
        }
        
    }
}
