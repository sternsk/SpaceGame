class GameEnvironment{
    private _keyboardController: KeyboardController;
    
    private _svgElement: SVGSVGElement;
    private _viewBoxLeft: number;
    private _viewBoxTop: number;
    private _viewBoxWidth: number;
    private _viewBoxHeight: number;
    private defsElement: SVGDefsElement;
    private controlElements: HTMLElement[];
    private textBox: HTMLElement;


    private messageShowing = false;
    private decisionOptions: HTMLButtonElement[];
    private decision = "";
    private _waitForDecision = false;
    
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
        //initialisiere UserSpace
        this._viewBoxLeft = -500;
        this._viewBoxTop = -500;
        this._viewBoxWidth = 550;
        this._viewBoxHeight = 1; //viewBoxAttribuntes get overriden by svg-Size Attributes

        //eine Reihe Kontrollelemte: aktuelle Flüghöhe, aktuelles Energielevel, Mauszeigerposition, aktuelle Masse...
        this.controlElements = [];
        
        this.label1 = document.createElement("div");
        this.label1.setAttribute('class', 'transformValue')
        this.label1.textContent = "Label 1"; 

        this.label2 = document.createElement("div");
        this.label2.setAttribute('class', 'transformValue')
        this.label2.textContent = "Label 2"; 
        
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
        this.label3.textContent = "Label 3";
        
        this.label4 = document.createElement("div");
        this.label4.setAttribute('class', 'transformValue')
        this.label4.textContent = "Label 4";

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

        this.textBox = document.getElementById(`textBox`)!;
        this.textBox.style.display = `none`;

        
        this.decisionOptions = [];

        
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

    displayOptions(options: string[], context: SpaceGame){
        
        options.forEach(element=>{
            const option = document.createElement("button");
            option.textContent = element;
            this._waitForDecision = true;
            option.addEventListener("click", () => {
                // Handle the click event for this option
                context.decision = element;
                this._waitForDecision = false;
                this.messageShowing = false; // User made a decision, hide the message
                this.setMessage("", 0, 0, () => {}); // Immediately hide the message
            });                     
            document.getElementById("textBox")?.appendChild(option);
            

        });
    }
/* Kann weg
    handleDecision(context: SpaceGame): boolean{
        
        if(this.decision){
            context.decision = this.decision;
            
            return true;
        }
        else
            return false;
    }
*/
    getAspectRatio(): number{
        return(this._svgElement.getBBox().width / this._svgElement.getBBox().height);
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

    set viewBoxLeft(n:number){
        this._viewBoxLeft = n;
        this._svgElement.setAttribute("viewBox", `${this._viewBoxLeft} ${this._viewBoxTop} ${this._viewBoxWidth} ${this._viewBoxHeight}`);
    }

    get viewBoxTop(){
        return this._viewBoxTop;
    }

    set viewBoxTop(n:number){
        this._viewBoxTop = n;
        this._svgElement.setAttribute("viewBox", `${this._viewBoxLeft} ${this._viewBoxTop} ${this._viewBoxWidth} ${this._viewBoxHeight}`);
    }

    get viewBoxWidth(){
        return this._viewBoxWidth;
    }

    get waitForDecision(): boolean{
        return this._waitForDecision;
    }

    get keyBoardController(){
        return(this._keyboardController)
    }

    set svgElement(svgElem: SVGSVGElement){
        this._svgElement = svgElem;
    }

    set waitForDecision(b: boolean){
        this._waitForDecision = b
    }
    
    
    public setArrow1(direction: number, scale: number){
        this.arrow1.setAttribute(`transform`, `rotate (${direction}), scale (${scale/10})`)
    }

    public setArrow2(direction: number, scale: number){
        this.arrow2.setAttribute(`transform`, `rotate (${direction}), scale (${scale})`)
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

    
    //displaying a message duration seconds with delay seconds delay 

    setMessage(message: string, messageDuration: number, delay: number = 1, callback: (shown: boolean)=>void) {
        if (!this.messageShowing) {
            // console.log("wait for decision: ", this._waitForDecision);
        
            this.textBox.innerHTML = message;
            setTimeout(() => {
                
                this.textBox.style.display = `block`;  
                
                
                setTimeout(() => {
                    if (this.textBox) {
                        this.textBox.style.display = `none`;
                        this.messageShowing = false;
                        callback(true); // Indicate that the message was shown
                    }
                }, messageDuration * 1000);
            
            }, delay * 1000);
    
            this.messageShowing = true;
        }else {
            callback(false); // Indicate that the message was not shown
        }
    }
    

    // Zoome hyperbolisch in einer vorgegebenen Zeit auf eine vorgegebenen Fensterbreite
    // Die Anzahl der zur Verfügung stehenden Frames ergibt sich aus der Zeitvorgabe * der actualFps

    windowSmoothly(duration: number, actualFps: number, targetWidth: number, targetCenter:{x: number,y: number}){
        const aspectRatio = this.getAspectRatio();
        this._viewBoxHeight = this._viewBoxWidth / aspectRatio; //Clearifying the aspect - viewBoxAttributes apparently get overriden bei svg-Size Attributes 
        const targetHeight = targetWidth / aspectRatio;         

        const deltaWidth = targetWidth - this._viewBoxWidth;
        const deltaHeight = targetHeight - this._viewBoxHeight; 
        const totalFrames = duration * actualFps;
        const deltaWidthPerFrame = deltaWidth / totalFrames;
        const deltaHeightPerFrame = deltaHeight / totalFrames;
        const xTranslationPerFrame = deltaWidthPerFrame * targetWidth / targetCenter.x
        const yTranslationPerFrame = deltaHeightPerFrame * targetHeight / targetCenter.y

        let frameCount = 0;
        
        const animateZoom = () =>{
            console.log(frameCount)
            if (frameCount < totalFrames){
                
                this._viewBoxWidth += deltaWidthPerFrame;
                this._viewBoxHeight += deltaHeightPerFrame;
                this._viewBoxLeft += xTranslationPerFrame;
                this._viewBoxTop += yTranslationPerFrame;
                this._svgElement.setAttribute("viewBox", `${this._viewBoxLeft} ${this._viewBoxTop} ${this._viewBoxWidth} ${this._viewBoxHeight}`)
                frameCount++;
            
                requestAnimationFrame(animateZoom)
            }
            
        }
        animateZoom();
        
    }
    

}