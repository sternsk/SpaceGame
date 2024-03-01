class RainbowRocket extends SpaceObject {
    
    private svgNS = "http://www.w3.org/2000/svg";
    private wingLeft: SVGPathElement = document.createElementNS(this.svgNS, "path") as SVGPathElement;
    private wingRight: SVGPathElement = document.createElementNS(this.svgNS, "path") as SVGPathElement;
    
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
        this._defsElement = this.createRainbowRocketdefsElement();
        
        this._svgElement.push(this.gElement)
        
    }



   
    private createRainbowRocketdefsElement(): SVGDefsElement[] | undefined{
        //erstelle drei lineardefsElement
        const numberOfdefsElement = 3;
        const linearGradient: SVGLinearGradientElement[] = [];
        
        // erzeuge numberOfDefsElements linearGradients
        for (let i=0; i<numberOfdefsElement; i++){
            const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
            linearGradient.push(gradient);
        }

        // erstelle einen zweidimensionalen Array von stops für die defsElemente
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

        //füge dem ersten defsElement drei stops, dem zweiten 6 stops und dem dritten drei stops hinzu
        const stopAmounts = [3,6,3];
        for (let i=0; i<stopAmounts.length; i++){
            
            for (let j=0; j<stopAmounts[i]; j++){
                linearGradient[i].appendChild(stop[i][j] )
            }
        }
        return this._defsElement;

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
        this.wingRight.setAttribute("d", "M 2 -3 q1.5 1 ,2 3 q-1 -0.5, -2 -1z");
        this.wingRight.setAttribute("fill", "darkslateblue");
        this._svgElement?.push(this.wingRight)
        g.appendChild(this.wingRight);

        const fire = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        fire.setAttribute("id", "fire");
        fire.setAttribute("d", "M -2 2 q -1 3,  0 6 q 1 -1, 1 -2 q 0 1.5, 1 3 q 1 -1.5, 1 -3 q 0 1, 1 2 q 1 -3,  0 -6 q -2 -0.5, -4 0 ");
        fire.setAttribute("stroke-width", ".1px");
        fire.setAttribute("stroke", "black");
        fire.setAttribute("vector-effect", "non-scaling-stroke");
        this._svgElement?.push(fire)
        g.appendChild(fire);

        const innerfire = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        innerfire.setAttribute("id", "innerfire");
        innerfire.setAttribute("d", "M-1 1.5 q -.5 1 , 0 3 q .5 0, 1 -1.5 q .5 1, 1 1.5 q .5 -1, 0 -3");
        innerfire.setAttribute("fill", "orange");
        this._svgElement?.push(innerfire)
        g.appendChild(innerfire);

        const body = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        body.setAttribute("id", "body");
        body.setAttribute("d", "M-2-4 q-1 3,  0 6 q 2 -.5, 4 0 q 1 -3,  0 -6 q -2 -0.5, -4 0 ");
        body.setAttribute("stroke", "black");
        body.setAttribute("stroke-width", ".1px");
        body.setAttribute("fill", "grey");
        body.setAttribute("vector-effect", "non-scaling-stroke");
        this._svgElement?.push(body)
        g.appendChild(body);

        const top = document.createElementNS(this.svgNS, "path") as SVGPathElement;
        top.setAttribute("id", "top");
        top.setAttribute("d", "M -2 -4 q .5 -2, 2 -4 q 1.5 2, 2 4 q-2 -0.5, -4 0");
        top.setAttribute("stroke", "black");
        top.setAttribute("stroke-width", ".1px");
        top.setAttribute("fill", "darkgrey");
        top.setAttribute("vector-effect", "non-scaling-stroke");
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
        summit.setAttribute("stroke", "black");
        summit.setAttribute("stroke-width", ".1");
        this._svgElement?.push(summit)
        g.appendChild(summit);

        const summitball = document.createElementNS(this.svgNS, "circle") as SVGPathElement;
        summitball.setAttribute("cx", "0");
        summitball.setAttribute("cy", "-10");
        summitball.setAttribute("r", ".2");
        summitball.setAttribute("fill", "orange");
        this._svgElement?.push(summitball)
        g.appendChild(summitball);
        
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

    // Hier können weitere spezifische Methoden für RainbowRocket hinzugefügt werden
}
