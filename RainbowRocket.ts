class RainbowRocket extends SpaceObject {
    
    private svgNS = "http://www.w3.org/2000/svg";
    private wingLeft: SVGPathElement = document.createElementNS(this.svgNS, "path") as SVGPathElement;
    private wingRight: SVGPathElement = document.createElementNS(this.svgNS, "path") as SVGPathElement;
    private summitball: SVGPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    private summitballX: number = 0
    private summitballY: number = -10

    //preparing values for the animation of the propulsion fire
    // initiate an Array with propulsion fire data as attractor to prevent wild fireing
    private needAChange = true
    private flameSpire1LeftPathControlPoint = {x:-3, y:5}   //[0][0].x
    private flameSpire1LeftPath = {x: -2, y: 8}             ////[0][1] [0][1].y
    private flameSpire1RightPathControlPoint = {x:-1, y:7}
    private flameSpire1RightPath = {x: -1, y: 6}            //[1]
    private flameSpire2LeftPathControlPoint = {x:-1, y:7.5}
    private flameSpire2LeftPath = {x: 0, y: 9}              //[2]
    private flameSpire2RightPathControlPoint = {x:1, y:7.5}
    private flameSpire2RightPath = {x: 1, y: 6}             //[3]
    private flameSpire3LeftPathControlPoint = {x:1, y:7}
    private flameSpire3LeftPath = {x: 2, y: 8}              //[4]
    private flameSpire3RightPathControlPoint = {x:3, y:5}   //[5]

    private innerFlameSpire1LeftPathControlPoint = {x: -1.5 , y:2.5}
    private innerFlameSpire1LeftPath = {x: -1, y:4.5}
    private innerFlameSpire1RightPathControlPoint = {x:-.5 , y:4.5}
    private innerFlameSpire1RightPath = {x: 0, y:3}
    private innerFlameSpire2LeftPathControlPoint = {x:.5 , y:4}
    private innerFlameSpire2LeftPath = {x: 1, y:4.5}
    private innerFlameSpire2RightPathControlPoint = {x:1.5 , y:3.5}

    
    
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
        position: Vector = Vector.fromPoint({x:0, y:0}), 
        velocity: Vector = Vector.fromPoint({x:0,y:0}), 
        direction: Vector = new Vector(1, 0),
        rotation: number = 0, 
        gElement?: SVGGElement,
        imageUrl?: string
    ) {
        // Call the super constructor with the provided parameters if they exist
        super(position, velocity, direction, rotation, gElement, imageUrl);
        
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
    private createRocketSvg(): SVGGElement {
                
        // Erstelle das <g>-Element für die Rakete
        const g = document.createElementNS(this.svgNS, "g") as unknown as SVGGElement;
        g.setAttribute("fill", "url(#gradient1)");
        
        
        this.wingLeft.setAttribute("id", "wingLeft");
        this.wingLeft.setAttribute("d", "M-2 -3 q-1.5 1, -2 3 q1 -0.5, 2 -1z");
        this.wingLeft.setAttribute("fill", "darkslateblue");
        this._svgElement?.push(this.wingLeft)

        g.appendChild(this.wingLeft);
        

        this.wingRight.setAttribute("id", "wingRight");
        this.wingRight.setAttribute("d", "M 2 -3 q 1.5 1, 2 3 q-1 -0.5, -2 -1z");
        this.wingRight.setAttribute("fill", "url(#gradient2)");
        this._svgElement?.push(this.wingRight)
        g.appendChild(this.wingRight);

        const fire = document.createElementNS(this.svgNS, "path") as SVGPathElement;

        fire.setAttribute("id", "fire");
        fire.setAttribute("d", `M -2 2 
                                Q ${this.flameSpire1LeftPathControlPoint.x}
                                    ${this.flameSpire1LeftPathControlPoint.y}, 
                                    ${this.flameSpire1LeftPath.x}
                                    ${this.flameSpire1LeftPath.y} 
                                
                                Q ${this.flameSpire1RightPathControlPoint.x}
                                    ${this.flameSpire1RightPathControlPoint.y}, 
                                    ${this.flameSpire1RightPath.x}
                                    ${this.flameSpire1RightPath.y} 
                                
                                Q ${this.flameSpire2LeftPathControlPoint.x}
                                    ${this.flameSpire2LeftPathControlPoint.y},
                                    ${this.flameSpire2LeftPath.x}
                                    ${this.flameSpire2LeftPath.y} 
                                
                                Q ${this.flameSpire2RightPathControlPoint.x}
                                    ${this.flameSpire2RightPathControlPoint.y}, 
                                    ${this.flameSpire2RightPath.x}
                                    ${this.flameSpire2RightPath.y} 
                                
                                Q ${this.flameSpire3LeftPathControlPoint.x} 
                                    ${this.flameSpire3LeftPathControlPoint.y}, 
                                    ${this.flameSpire3LeftPath.x}
                                    ${this.flameSpire3LeftPath.y}
                                
                                Q ${this.flameSpire3RightPathControlPoint.x}
                                    ${this.flameSpire3RightPathControlPoint.y}, 
                                    2 
                                    2
                                 
                                q -2 -0.5, -4 0 `);

        fire.setAttribute("fill", "url(#gradient2");
        fire.setAttribute("display", "block")
        this._svgElement?.push(fire)
        g.appendChild(fire);

        const innerfire = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        innerfire.setAttribute("id", "innerfire");
        innerfire.setAttribute("d", `M-1 1.5 
                                        Q ${this.innerFlameSpire1LeftPathControlPoint.x}  
                                            ${this.innerFlameSpire1LeftPathControlPoint.y} , 
                                            ${this.innerFlameSpire1LeftPath.x} 
                                            ${this.innerFlameSpire1LeftPath.y}   
                                        Q   ${this.innerFlameSpire1RightPathControlPoint.x}  
                                            ${this.innerFlameSpire1RightPathControlPoint.y} , 
                                            ${this.innerFlameSpire1RightPath.x} 
                                            ${this.innerFlameSpire1RightPath.y}  
                                        Q ${this.innerFlameSpire2LeftPathControlPoint.x} 
                                            ${this.innerFlameSpire2LeftPathControlPoint.y} , 
                                            ${this.innerFlameSpire2LeftPath.x}
                                            ${this.innerFlameSpire2LeftPath.y} 
                                        Q ${this.innerFlameSpire2RightPathControlPoint.x} 
                                            ${this.innerFlameSpire2RightPathControlPoint.x}, 
                                            1
                                            1.5`);
        innerfire.setAttribute("fill", "orange");
        this._svgElement?.push(innerfire)
        g.appendChild(innerfire);

        const body = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        body.setAttribute("id", "body");
        body.setAttribute("d", "M-2-4 q-1 3,  0 6 q 2 -.5, 4 0 q 1 -3,  0 -6 q -2 -0.5, -4 0 ");
        body.setAttribute("stroke", "black");
        body.setAttribute("stroke-width", ".1px");
        body.setAttribute("fill", "url(#gradient1)");
        body.setAttribute("vector-effect", "non-scaling-stroke");
        this._svgElement?.push(body)
        g.appendChild(body);

        const top = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        top.setAttribute("id", "top");
        top.setAttribute("d", "M -2 -4 q .5 -2, 2 -4 q 1.5 2, 2 4 q-2 -0.5, -4 0");
        top.setAttribute("fill", "url(#gradient2");
        this._svgElement?.push(top)
        g.appendChild(top);

        const topwindow = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        topwindow.setAttribute("id", "topwindow");
        topwindow.setAttribute("d", "M -1 -5 q .75 -.75, 1 -1 q .75 .75, 1 1 q -1 -.25, -2 0");
        topwindow.setAttribute("fill", "darkslateblue");
        this._svgElement?.push(topwindow)
        g.appendChild(topwindow);

        const middlewindow = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        middlewindow.setAttribute("id", "middlewindow");
        middlewindow.setAttribute("d", "M-1 -3 q -.5 2, 0 4 q .5 .15, 1 0 q -.5 -2, 0 -4 q -.5 -.15, -1 0");
        middlewindow.setAttribute("fill", "darkslateblue");
        this._svgElement?.push(middlewindow)
        g.appendChild(middlewindow);

        const summit = document.createElementNS(this.svgNS, "line") as SVGPathElement;
        summit.setAttribute("id", "summit");
        summit.setAttribute("x1", "0");
        summit.setAttribute("y1", "-8");
        summit.setAttribute("x2", "0");
        summit.setAttribute("y2", "-10");
        summit.setAttribute("stroke", "grey");
        summit.setAttribute("stroke-width", "1");
        this._svgElement?.push(summit)
        g.appendChild(summit);

        this.summitball = document.createElementNS(this.svgNS, "circle") as SVGPathElement;
        this.summitball.setAttribute("id", "summitBall")
        this.summitball.setAttribute("cx", "0");
        this.summitball.setAttribute("cy", "-10");
        this.summitball.setAttribute("r", ".2");
        this.summitball.setAttribute("fill", "orange");
        this._svgElement?.push(this.summitball)
        g.appendChild(this.summitball);
        
        return g;
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

    update(){
        super.update()
        this.animateInnerFire()
    }

    handleKeyboardInput(keysPressed: {[key: string]: boolean}) {
        super.handleKeyboardInput(keysPressed)
        if (keysPressed[' ']) {
            this.animateSummit()
            let summitShit: SVGPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")

            let svgElem = document.getElementsByClassName("mainSVG").item(0) as SVGSVGElement

            summitShit.setAttribute("d", `M ${this._position.x + this.summitballX} ${this.position.y + this.summitballY} v10`)
            summitShit.setAttribute("stroke", `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`)
            summitShit.setAttribute("stroke-width", "10px")
            summitShit.setAttribute("class", "summitShit")
            
            svgElem?.appendChild(summitShit)
           
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
