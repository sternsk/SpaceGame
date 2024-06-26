class GameEnvironment{
    private _keyboardController: KeyboardController;
    private _frameRateManager = new FrameRateManager();
    
    private _svgElement: SVGSVGElement;

   // private selector: number[] = [];
    readyForAChange: boolean = true;
    
    private _viewBoxLeft: number;
    private _viewBoxTop: number;
    private _viewBoxWidth: number;
    private _viewBoxHeight: number;
    private _bgImage?: SVGImageElement;
    private defsElement: SVGDefsElement;
    private controlElements: HTMLElement[];
    missionSelector: HTMLSelectElement;
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
    private dummy = new SpaceObject()
    
    private htmlInputElements: HTMLElement[];
    

    constructor(){
        //initialisiere UserSpace
        this._viewBoxLeft = -300;
        this._viewBoxTop = -200;
        this._viewBoxWidth = 1200;
    
        this._viewBoxHeight = 3/4 * this._viewBoxWidth; //viewBoxAttribuntes get overriden by svg-Size Attributes in css stylesheet

        //eine Reihe Kontrollelemte: aktuelle Flüghöhe, aktuelles Energielevel, Mauszeigerposition, aktuelle Masse...
        this.controlElements = [];

        this.missionSelector = document.createElement("select")
        this.missionSelector.setAttribute("aria-Label", "State")
        const option = document.createElement("option")
        option.value = "";
        option.textContent = "choose Mission"
        option.disabled = true;
        option.selected = true;
        this.missionSelector.appendChild(option)
        
        this.label1 = document.createElement("div");
        this.label1.setAttribute('class', 'transformValue')
        this.label1.textContent = "Space Patrol!"; 

        this.label2 = document.createElement("div");
        this.label2.setAttribute('class', 'transformValue')
        this.label2.textContent = "Arrow keys to navigate"; 
        
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
        this.label3.textContent = "Space to chisel!";
        
        this.label4 = document.createElement("div");
        this.label4.setAttribute('class', 'transformValue')
        this.label4.textContent = "!";

        this.ArrowBox2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.ArrowBox2.setAttribute("style", "position: static;")
        this.ArrowBox2.setAttribute("width", "100px")
        this.ArrowBox2.setAttribute("height", "100px")
        this.ArrowBox2.setAttribute("fill", "darkblue")
        
        
        document.getElementById('controlContainer')!.appendChild(this.label1);
        document.getElementById('controlContainer')!.appendChild(this.label2);
        document.getElementById('controlContainer')!.appendChild(this.missionSelector);
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
   /*     console.log("this._viewBoxHeight: "+this._viewBoxHeight)
        console.log(`this._svgElement.getAttribute("viewBox"): `+this._svgElement.getAttribute("viewBox"))
        console.log("this._svgElement.getBBox().height: "+this._svgElement.getBBox().height)
     */   
        //console.log("svgElementWidth in Constructor of gameEnvironment: ",this._svgElement.getBBox())

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

    public addOption(element: HTMLSelectElement, value: string){
        const option = document.createElement("option")
        option.value = value
        option.textContent = value
        element.appendChild(option)
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
    drawBackground(){
        //console.log("drawingBackground")
        //this.label4.textContent = ("viewBoxValues: "+ document.getElementsByClassName("mainSVG").item(0)?.getAttribute("viewBox")+" _viewBoxWidth: "+ this._viewBoxWidth.toFixed(0))
        //this.label3.textContent = ("_viewBoxLeft: "+this._viewBoxLeft)
        
        this.removeBackground()

        // setzte den Abstand der Gitternetzlinien bis viewBoxSize 100 auf 1, zwischen 100 und 1000 auf 10, zwischen 1000 und 10000 auf 100 px
        // Logarythmus scheint zu lahm zu laufen - die Linien werden zu eng bei großer Viewbox ab 5000
        let spaceBetweenLines = Math.pow(10, Math.floor(Math.log10(this._viewBoxWidth/10)))
                    
        //console.log("viewBoxLeft"+ this._viewBoxLeft + "viewBoxWidth: " + this._viewBoxWidth)
        //this.label3.textContent = (spaceBetweenLines+"")
        
        //zeichne die vertikalen Linien
        for(let xPosition = Math.floor(this._viewBoxLeft); xPosition < this._viewBoxLeft + this._viewBoxWidth; xPosition++ ){ 
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
            path.setAttribute("stroke", "beige")
            path.setAttribute('vector-effect', 'non-scaling-stroke')
            path.setAttribute("class", "bgPathElement")
                    
            // falls ein Bild eingefügt ist
            if(this._bgImage){ 
                //console.log("vertical: _bgImage is set: "+this._bgImage)
                // xPosition is outside _bgImage
                if(xPosition % spaceBetweenLines == 0 && (xPosition < this._bgImage?.getBBox().x || xPosition > this._bgImage.getBBox().x+this._bgImage?.getBBox().width)){ 
                    path.setAttribute("d", `M ${xPosition} ${this._viewBoxTop} v ${this._viewBoxHeight}`)
                    
                    if((xPosition / spaceBetweenLines) % spaceBetweenLines == 0){ 
                        path.setAttribute("stroke-width", `.5px`)
                    }
                    else{ 
                        path.setAttribute("stroke-width", `.2px`)
                    }
                    this._svgElement.appendChild(path)
                }else{
                    // xPosition inside _bgImage
                    // case _bgImage top is visible in viewBox
                    
                    if(xPosition % spaceBetweenLines == 0 && this._bgImage.getBBox().y > this._viewBoxTop){
                        path.setAttribute("d", `M${xPosition} ${this._viewBoxTop} V ${this._bgImage.getBBox().y}`)
                        if(xPosition / spaceBetweenLines % spaceBetweenLines ==0){
                            path.setAttribute("stroke-width", `.5px`)
                        }else{
                            path.setAttribute("stroke-width", `.2px`)
                        }

                        this._svgElement.appendChild(path)
                    }
                    // case _bgImageBottom ist visible in viewBox
                    //console.log("_bgImageBottom ist visible in viewBox")
                    if(xPosition % spaceBetweenLines == 0 && this._bgImage.getBBox().y + 
                                                                this._bgImage.getBBox().height 
                                                                < this._viewBoxTop + 
                                                                    this._viewBoxHeight){
                        path.setAttribute("d", `M${xPosition} ${this._bgImage.getBBox().y + this._bgImage.getBBox().height}
                                                v ${this._viewBoxTop + this._viewBoxHeight - 
                                                    this._bgImage.getBBox().y + this._bgImage.getBBox().height}`)
                        if(xPosition/spaceBetweenLines%spaceBetweenLines == 0){
                            path.setAttribute("stroke-width", `.5px`) 
                        }else{
                            path.setAttribute("stroke-width", ".2px")
                        }

                        this._svgElement.appendChild(path)   
                    }
                }
            }else
            // falls kein Bild eingefügt ist
            {
                if(xPosition % spaceBetweenLines == 0) { 
                    path.setAttribute("d", `M ${xPosition} ${this._viewBoxTop} v ${this._viewBoxHeight}`)
                    path.setAttribute("stroke", "beige")
                    if((xPosition / spaceBetweenLines) % spaceBetweenLines == 0){ 
                        path.setAttribute("stroke-width", `.5px`)
                    }
                    else{ 
                        path.setAttribute("stroke-width", `.2px`)
                    }
                    path.setAttribute('vector-effect', 'non-scaling-stroke')
                    path.setAttribute("class", "bgPathElement")
                    this._svgElement.appendChild(path)
                }
            }
        }
        // zeichne die horizontalen Linien
        for(let yPosition = Math.floor(this._viewBoxTop); yPosition < this.viewBoxTop + this.viewBoxHeight; yPosition++){
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
            path.setAttribute("stroke", "beige")
            path.setAttribute("vector-effect", "non-scaling-stroke")
            path.setAttribute("class", "bgPathElement")
                            
           // falls ein Bild eingefügt ist
            if(this._bgImage){ 
                // yPosition is outside _bgImage
                if(yPosition % spaceBetweenLines == 0 && (yPosition < this._bgImage.getBBox().y || yPosition 
                                                            > this._bgImage.getBBox().y+this._bgImage.getBBox().height)){
                    path.setAttribute("d", `M ${this.viewBoxLeft} ${yPosition} h ${this._viewBoxWidth}`)
                    if((yPosition / spaceBetweenLines) % spaceBetweenLines == 0){
                        path.setAttribute("stroke-width", ".5px")
                        }
                    else{
                        path.setAttribute("stroke-width", `.2px`)
                    }
                    this._svgElement.appendChild(path)
                }else
                // yPosition is inside _bgImage
                {   //left side of _bgImage is visible
                    if(yPosition % spaceBetweenLines == 0 && this.viewBoxLeft < this._bgImage.getBBox().x){ 
                        path.setAttribute("d", `M ${this._viewBoxLeft} ${yPosition} H ${this._bgImage.getBBox().x}`)
                        if((yPosition / spaceBetweenLines) % spaceBetweenLines == 0){
                            path.setAttribute("stroke-width", ".5px")
                            }
                        else{
                            path.setAttribute("stroke-width", `.2px`)
                        }
                        this._svgElement.appendChild(path)
                    }
                    // right side of image is visible
                    if(yPosition % spaceBetweenLines == 0 && this.viewBoxLeft + this.viewBoxWidth 
                                                                > this._bgImage.getBBox().x + this._bgImage.getBBox().width){ 
                        path.setAttribute("d", `M ${this._bgImage.getBBox().x + this._bgImage.getBBox().width} 
                                                    ${yPosition}
                                                    H ${this._viewBoxLeft + this._viewBoxWidth}`)
                        if(yPosition / spaceBetweenLines % spaceBetweenLines == 0){ 
                            path.setAttribute("stroke-width", ".5px")}
                            else{
                            path.setAttribute("stroke-width", ".2px")
                            }
                        this._svgElement.appendChild(path)
                    }
                }
            }else
            //falls kein Bild eingefügt ist
            {
                
                if(yPosition % spaceBetweenLines == 0){
                    // console.log(spaceBetweenLines)
                        path.setAttribute("d", `M ${this.viewBoxLeft} ${yPosition} h ${this._viewBoxWidth}`)
                        if((yPosition / spaceBetweenLines) % spaceBetweenLines == 0){
                            path.setAttribute("stroke-width", ".5px")
                        }
                        else{
                            path.setAttribute("stroke-width", `.2px`)
                        }
                        this._svgElement.appendChild(path)
                    }
            }
        }
    }
    removeBackground(){
        //console.log("removing")
        let elements = document.getElementsByClassName("bgPathElement")
       // console.log(elements.length)
        while (elements.length>0){
            elements[0].parentNode!.removeChild(elements[0]);
            elements = document.getElementsByClassName("bgPathElement")
        }
       // console.log("bg removed")
    }
    getAspectRatio(): number{
        return(this._svgElement.getBBox().width / this._svgElement.getBBox().height);
    }

    get bgImage(): SVGImageElement | undefined{
        return this._bgImage
    }

    get frameRateManager(): FrameRateManager{
        return this._frameRateManager;
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

    set viewBoxWidth(n:number){
        this._viewBoxWidth = n;
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
               // this.setMessage("", 0, 0, () => {}); // Immediately hide the message
            });                     
            document.getElementById("textBox")?.appendChild(option);
        });
    }

    insertBackgroundPicture(){
        let imageFrame = document.createElementNS("http://www.w3.org/2000/svg", "path")
        this._bgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        this._bgImage.href.baseVal = "../resources/spaceship.jpg";

        console.log("loading image")

        this._bgImage.onload = () => {
            
            this._bgImage?.setAttribute("x", "-400")
            this._bgImage?.setAttribute("y", "-150")
            
            this._bgImage?.setAttribute("width","800")

            /*console.log("this._bgImage?.getBBox().width: "+this._bgImage?.getBBox().width)
            console.log("this._bgImage?.getBBox().height: "+this._bgImage?.getBBox().height)
            console.log("this._bgImage?.width.baseVal.value: "+this._bgImage?.width.baseVal.value)
            console.log("this._bgImage?.getBBox().x: "+this._bgImage?.getBBox().x)
            console.log("this._bgImage?.getBBox().y: "+this._bgImage?.getBBox().y)
            */
            imageFrame.setAttribute("d",`M ${this._bgImage?.getBBox().x} ${this._bgImage?.getBBox().y}, 
                                        h${this._bgImage?.getBBox().width}, 
                                        v${this._bgImage?.getBBox().height}
                                        h${-this._bgImage!.getBBox().width}, 
                                        z`)
            imageFrame.setAttribute("fill", "none")
            imageFrame.setAttribute("stroke", "grey")
            imageFrame.setAttribute("stroke-width", "2px")
            imageFrame.setAttribute("vector-effect", "non-scaling-stroke")
            
        }
        this.svgElement.appendChild(this._bgImage)
        this.svgElement.appendChild(imageFrame)

    }

    playIntro(svgElements: SVGElement[]){
        //console.log("playing Intro")
        
        let keysPressed = this.keyBoardController.getKeysPressed()
        let repeat: boolean
        let selector: number[]
        let candidat: number
        
        if(this.readyForAChange){ 
            this.readyForAChange = false
            selector = []
            // add up to svgElements.length random numbers to selector[] // handle zero separately, its the whole bunch //try not to repeat the numbers!
            if(Math.random() < .3){ 
                for(let i = 0; i < Math.ceil(Math.random() * svgElements.length); i++){
                    repeat = true;
                        while(repeat){ 
                            candidat = Math.ceil(Math.random()  * (svgElements.length -1))
                            if(selector.indexOf(candidat) === -1){ 
                                selector.push(candidat)
                                //console.log(candidat)
                                repeat = false
                            }
                        }
                }
            }else{
                selector.push(0)
            }
            for(let i = 0; i<svgElements.length; i++){
                svgElements[i].removeAttribute("stroke")
                svgElements[i].removeAttribute("stroke-width")
                
            }

            for(let i = 0; i < selector.length; i++){
                svgElements[selector[i]].setAttribute("stroke", "brown")
                svgElements[selector[i]].setAttribute("Stroke-width", ".2")
            }

        
            setTimeout(()=>{
                this.readyForAChange = true
            }, 2000)
        }

        //console.log(this.selector)
        //this.setLabel3("svgElements.length: "+ svgElements.length)
        
        
        /*
        if(keysPressed["ArrowUp"]){
            this._viewBoxWidth += 10
            this._viewBoxHeight = this._viewBoxWidth/4*3
            this._svgElement.setAttribute(`viewBox`, `${this._viewBoxLeft} ${this._viewBoxTop} ${this._viewBoxWidth} ${this._viewBoxHeight}`)
            //console.log(this._viewBoxWidth)
        }
        if(keysPressed["ArrowDown"]){
            this._viewBoxWidth -= 10
            if(this._viewBoxWidth<0)
                this._viewBoxWidth = 0
            this._viewBoxHeight = this._viewBoxWidth/4*3
            this._svgElement.setAttribute(`viewBox`, `${this._viewBoxLeft} ${this._viewBoxTop} ${this._viewBoxWidth} ${this._viewBoxHeight}`)
            //console.log(this._viewBoxWidth)
        }
        if(keysPressed["ArrowLeft"]){ 
            
        }

        if(keysPressed["ArrowRight"]){ 
            
        }

        if(keysPressed[" "]){}
            //spaceGame.rocket.animateSummitBall()
        */
    }

    async missionSelection(): Promise<string>{
        return new Promise<string>((resolve, reject) => {    
            this.missionSelector.addEventListener(`change`, () =>{
            resolve(this.missionSelector.value)
            })
        })
    }

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
    
    
    // Zoome parabolisch in duration sekunden auf targetWidth Fensterbreite
    // Die Anzahl der zur Verfügung stehenden Frames ergibt sich aus duration * actualFps
    windowSmoothly(mode: string, duration: number, targetWidth: number, targetCenter:{x: number,y: number}, overheadFactor?: number){
        //console.log(this._svgElement.getBBox().height)
        const actualFps = this._frameRateManager.getFPS()
        
        const aspectRatio = this.getAspectRatio();
        //console.log("should be 1.3: ",aspectRatio) // should be 1.3
        this._viewBoxHeight = this._viewBoxWidth / aspectRatio; //Clearifying the aspect - viewBoxAttributes apparently get overriden bei svg-Size Attributes 
        const targetHeight = targetWidth / aspectRatio;      
       // console.log("targetWidth: ", targetWidth, "target Height: ", targetHeight)   

        const targetLeft = targetCenter.x - targetWidth/2
        const targetTop = targetCenter.y - targetHeight/2

        const deltaWidth = targetWidth - this._viewBoxWidth;
        const deltaHeight = targetHeight - this._viewBoxHeight; 
        //console.log("delta tWidth: ", deltaWidth, "delta Height: ", deltaHeight)
        const deltaXTranslation = targetLeft - this._viewBoxLeft
        const deltaYTranslation = targetTop - this._viewBoxTop

        const totalFrames = duration * actualFps;
        let frameCount = 0;

        let animateZoom = () =>{}

        /*console.log("actual fps: ", actualFps)
        console.log("duration: ", duration)
        console.log("totalFrames: ", totalFrames)
        console.log("mode: ", mode)
        */
        switch(mode){ 
            case("linear"):
                const deltaWidthPerFrame = deltaWidth / totalFrames;
                const deltaHeightPerFrame = deltaHeight / totalFrames;
                const xTranslationPerFrame = deltaXTranslation / totalFrames
                const yTranslationPerFrame = deltaYTranslation / totalFrames

                animateZoom = () =>{
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
            break;   

            case (`parabolic`):
                if(!overheadFactor){
                    overheadFactor = .8
                }
                const viewBoxWidthStart = this._viewBoxWidth
               // console.log("viewBoxWidthStart: ",viewBoxWidthStart)
                const viewBoxHeightStart = this._viewBoxHeight
                const viewBoxLeftStart = this._viewBoxLeft
                const viewBoxTopStart = this._viewBoxTop
                
                animateZoom = () =>{
                    const deltaWidthPerFrame = (-(Math.pow(frameCount/totalFrames, 2) ) + 2 * overheadFactor! * frameCount / totalFrames) /
                                        ((2 * overheadFactor! - 1) / deltaWidth)
                    
                    const deltaHeightPerFrame = (-(Math.pow(frameCount/totalFrames, 2) ) + 2 * overheadFactor! * frameCount / totalFrames) /
                                        ((2 * overheadFactor! - 1) / deltaHeight)

                    const deltaLeftPerFrame = (-(Math.pow(frameCount/totalFrames, 2) ) + 2 * overheadFactor! * frameCount / totalFrames) /
                                        ((2 * overheadFactor! - 1) / deltaXTranslation)

                    const deltaTopPerFrame = (-(Math.pow(frameCount/totalFrames, 2) ) + 2 * overheadFactor! * frameCount / totalFrames) /
                                        ((2 * overheadFactor! - 1) / deltaYTranslation)

                   /* 
                    console.log("frameCount: ", frameCount)
                    console.log("deltaWidth: ", deltaWidth)
                    */
                    if(frameCount < totalFrames){
                        this._viewBoxWidth = viewBoxWidthStart + deltaWidthPerFrame;
                        this._viewBoxHeight = viewBoxHeightStart + deltaHeightPerFrame
                        this._viewBoxLeft = viewBoxLeftStart + deltaLeftPerFrame
                        this._viewBoxTop = viewBoxTopStart + deltaTopPerFrame

                        if(this._viewBoxWidth < 0)
                            this._viewBoxWidth = 0;
                    
                        if(this._viewBoxHeight < 0)
                            this._viewBoxHeight = 0;
                        
                        this._svgElement.setAttribute("viewBox", `${this._viewBoxLeft} ${this._viewBoxTop} ${this._viewBoxWidth} ${this._viewBoxHeight}`)
                        
                        frameCount++
                        requestAnimationFrame(animateZoom)
                    }

                }
                animateZoom();
            break;
        }
            
        
                
        
    }
    

}