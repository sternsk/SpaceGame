import {idInputElement} from "./startGame.js";
import {colorSelector} from "./startGame.js";
import {typeSelector} from "./startGame.js";
import { SpaceObject } from "./SpaceObject.js";

export class Spacecraft extends SpaceObject{
    private id: string = idInputElement.value
    private color: string = colorSelector.value
    private type: string = typeSelector.value       
    
    protected svgNS = "http://www.w3.org/2000/svg";

    protected wingLeft: SVGPathElement = document.createElementNS(this.svgNS, "path") as SVGPathElement;
    protected wingRight: SVGPathElement = document.createElementNS(this.svgNS, "path") as SVGPathElement;
    protected summitball: SVGPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    protected summitballX: number = 0
    protected summitballY: number = -10

    //preparing values for the animation of the propulsion fire
    // initiate an Array with propulsion fire data as attractor to prevent wild fireing
    //protected needAChange = true
    protected flameSpire1LeftPathControlPoint = {x:-3, y:5}   //[0][0].x
    protected flameSpire1LeftPath = {x: -2, y: 8}             ////[0][1] [0][1].y
    protected flameSpire1RightPathControlPoint = {x:-1, y:7}
    protected flameSpire1RightPath = {x: -1, y: 6}            //[1]
    protected flameSpire2LeftPathControlPoint = {x:-1, y:7.5}
    protected flameSpire2LeftPath = {x: 0, y: 9}              //[2]
    protected flameSpire2RightPathControlPoint = {x:1, y:7.5}
    protected flameSpire2RightPath = {x: 1, y: 6}             //[3]
    protected flameSpire3LeftPathControlPoint = {x:1, y:7}
    protected flameSpire3LeftPath = {x: 2, y: 8}              //[4]
    protected flameSpire3RightPathControlPoint = {x:3, y:5}   //[5]

    protected innerFlameSpire1LeftPathControlPoint = {x: -1.5 , y:2.5}
    protected innerFlameSpire1LeftPath = {x: -1, y:4.5}
    protected innerFlameSpire1RightPathControlPoint = {x:-.5 , y:4.5}
    protected innerFlameSpire1RightPath = {x: 0, y:3}
    protected innerFlameSpire2LeftPathControlPoint = {x:.5 , y:4}
    protected innerFlameSpire2LeftPath = {x: 1, y:4.5}
    protected innerFlameSpire2RightPathControlPoint = {x:1.5 , y:3.5}
    
    constructor(){
        super()
    }
    // Definieren Sie eine Funktion, die eine Anfrage an den Server stellt
    async sendStatus() {
        // Die URL Ihres Servers
        const url = 'http://localhost:8080/api/main/SynchronizeRocket';
    
        // Die Daten, die an den Server gesendet werden sollen        
        const data = {
            status: {
                id: this.id,
                color: this.color,
                type: this.type,
                position: {
                    x: this.position.x,
                    y: this.position.y
                }
            }
        };

        // Konfigurieren Sie die Anfrageoptionen
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
           
        };

        try {
            // Führen Sie die Anfrage aus und warten Sie auf die Antwort
            const response = await fetch(url, options);

            // Überprüfen Sie den Status der Antwort
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Extrahieren Sie die Antwortdaten als JSON
            const responseData = await response.json();

            // Verarbeiten Sie die Antwort hier
            console.log('Server Response:', responseData);
            
            // Hier können Sie die Antwort weiter verarbeiten
            // Beispiel: responseData.forEach((rocket: any) => console.log(rocket.rocketId));

        } catch (error) {
            console.error('Error:', error);
        }
    }

    protected createRocketSvg(): SVGGElement {
                
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
        summit.setAttribute("stroke-width", ".1");
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

    static getCraftGElement(type: string): SVGGElement{
        switch(type){
            case`Rainbow Rocket`:
                let rokket = new Spacecraft()
                return (rokket.createRocketSvg());
        
            case`rokket`:
                let gElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
                let outline = document.createElementNS("http://www.w3.org/2000/svg", "path")
                let inline = document.createElementNS("http://www.w3.org/2000/svg", "path")
                outline.setAttribute("d", `M 0 8, 
                                            L  -4 -8,
                                            L -2 -4,
                                            L 0 -8,
                                            L 2 -6, 
                                            L 4 -8,
                                            z`)
                outline.setAttribute("stroke","black")
                outline.setAttribute("stroke-width","1px")
                outline.setAttribute("stroke-width","1px")
                outline.setAttribute('vector-effect', 'non-scaling-stroke')
                
                inline.setAttribute("d", `M -1 6,
                                            L 1 6,
                                            L -2 2,
                                            L 1.5 2,
                                            z`)
                inline.setAttribute("fill", "black")
                gElement.appendChild(outline)
                gElement.appendChild(inline)
                return(gElement)
        }
        return(document.createElementNS("http://www.w3.org/2000/svg","g"))
    }
}