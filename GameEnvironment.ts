class GameEnvironment{
    private _keyboardController: KeyboardController;
    
    private _svgElement: SVGSVGElement;
    private _viewBoxLeft: number;
    private _viewBoxTop: number;
    private _viewBoxWidth: number;
    private _viewBoxHeight: number;
    private defsElement: SVGDefsElement;
    private controlElements: HTMLElement[];
    private label1: HTMLElement;
    private label2: HTMLElement;
    private label3: HTMLElement;
    private label4: HTMLElement;
    private arrowBox1: SVGElement;
    private ArrowBox2: SVGElement;
    private arrow1: SVGElement;
    private arrow2: SVGElement;

    private htmlInputElements: HTMLElement[];
    

    constructor(){
        //initialisier UserSpace -100 - 100
        this._viewBoxLeft = -200;
        this._viewBoxTop = -200;
        this._viewBoxWidth = 600;
        this._viewBoxHeight = 600;

        //eine Reihe Kontrollelemte: aktuelle Flüghöhe, aktuelles Energielevel, Mauszeigerposition, aktuelle Masse...
        this.controlElements = [];
        
        this.label1 = document.createElement("div");
        this.label1.setAttribute('class', 'transformValue')
        this.label1.textContent = "TestText"; 

        this.label2 = document.createElement("div");
        this.label2.setAttribute('class', 'transformValue')
        this.label2.textContent = "TestText"; 
        
        this.arrow1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        this.arrow1.setAttribute("viewBox", "-50 -50 100 100");
        this.arrow1.setAttribute("points", "0,-40 30,30 0,10 -30,30")
        this.arrow1.setAttribute("fill", "white")
        this.arrow1.setAttribute("opacity", ".8")
      
        this.arrow2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        this.arrow2.setAttribute("points", "0,-40 30,30 0,10 -30,30")
        this.arrow2.setAttribute("viewBox", "0 0 100 100");
        this.arrow2.setAttribute("fill", "darkblue")
      
        this.arrowBox1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.arrowBox1.setAttribute("style", "position: static; background-color:grey; border: 2px solid black")
        this.arrowBox1.setAttribute("class", "transformValue")
        this.arrowBox1.setAttribute("width", "148px")
        this.arrowBox1.setAttribute("height", "100px")
        this.arrowBox1.setAttribute("viewBox", "-50 -50 100 100")
        
        
        this.arrowBox1.appendChild(this.arrow2)
        this.arrowBox1.appendChild(this.arrow1)
        
        this.label3 = document.createElement("div");
        this.label3.setAttribute('class', 'transformValue')
        this.label3.textContent = "Rocket velocity:";
        
        
        this.label4 = document.createElement("div");
        this.label4.setAttribute('class', 'transformValue')
        this.label4.textContent = "Rocket direction:";

        this.ArrowBox2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.ArrowBox2.setAttribute("style", "position: static;")
        this.ArrowBox2.setAttribute("width", "100px")
        this.ArrowBox2.setAttribute("height", "100px")
        this.ArrowBox2.setAttribute("fill", "darkblue")
        
        document.getElementById('controlContainer')!.appendChild(this.label1);
        document.getElementById('controlContainer')!.appendChild(this.label2);
        document.getElementById('controlContainer')!.appendChild(this.label3);
        document.getElementById('controlContainer')!.appendChild(this.arrowBox1);
        document.getElementById('controlContainer')!.appendChild(this.label4);
        document.getElementById('controlContainer')!.appendChild(this.ArrowBox2);


        //zwei html-Input-Elements für linken und rechten Daumen: links Beschleunigung, rechts Rotation
        this.htmlInputElements = [];

        // initialisiere mainSVG
        this._svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svgElement.setAttribute("class", "mainSVG"); //attributes are defined in the style.css //convenient layout properties are defined there
       // this._svgElement.setAttribute("style", "width:100%; height:100%;");
        
        this._svgElement.setAttribute("viewBox", `${this._viewBoxLeft} ${this._viewBoxTop} ${this._viewBoxWidth} ${this._viewBoxHeight}`);
        
        this.defsElement = document.createElementNS("http://www.w3.org/2000/svg", "defs");

        this._keyboardController = new KeyboardController();
    }

    public addControlElement(htmlElement: HTMLElement){
        this.controlElements.push(htmlElement);
    }
    
    public addMouseListener(){
        this._svgElement.addEventListener('mousemove', (event) => {
            this.controlElements[0].textContent = event.clientX.toString();
        });
    }

    get svgElement(){
        return(this._svgElement);
    }

    get viewBoxHeight(){
        return this._viewBoxHeight;
    }

    get viewBoxLeft(){
        return this._viewBoxLeft;
    }

    get viewBoxTop(){
        return this._viewBoxTop;
    }

    get viewBoxWidth(){
        return this._viewBoxWidth;
    }

    get keyBoardController(){
        return(this._keyboardController)
    }

    set svgElement(svgElem: SVGSVGElement){
        this._svgElement = svgElem;
    }

    public setLabel1(value: string){
        this.label1.textContent = value;
    }
    
    public setLabel2(value: string){
        this.label2.textContent = value;
    }

    public setLabel3(value: string){
        this.label3.textContent = value;
    }

    public setLabel4(value: string){
        this.label4.textContent = value;
    }

    public setArrow1(direction: number, scale: number){
        this.arrow1.setAttribute(`transform`, `rotate (${direction}), scale (${scale/10})`)
    }

    public setArrow2(direction: number, scale: number){
        this.arrow2.setAttribute(`transform`, `rotate (${direction}), scale (${scale})`)
    }

}