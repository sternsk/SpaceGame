
class SpaceGame {
    rocketId = idInputElement.value;
    idInputElement = document.getElementById(`rocketId`)! as HTMLInputElement

    gameEnvironment= new GameEnvironment();
    
    //allocate controlvariables for possible missions
    defaultMessageDuration = 5;
    
    mission: string[] = ["goddog", "behalf", "collisionTest"]
    actualMission: string = ""; //Testmission
    windowing: string = "centered"; //preparing for different screenbehaviour
    dogProcessRunning = false;
    missionChoosen = false;
    started = false
    rocketAppeared = false
    message = false;
    messageCount = 0;
    dummy = new SpaceObject()

    enableSpeedTest = false;
    speedTest = false; 
    enableBromberMission = false;
    enableDogMission = false;
    decision = "";
    bromberActivationSequence = false;
    actualTimestamp: number = 0;

    //allocate all sprites for all possible missions
    rocket: RainbowRocket;
    godPlanet: SpaceObject | null = null; 
    dogPlanet: SpaceObject | null = null;
    bromber: SpaceObject | null = null; 
    meteor: SpaceObject[] = []

    // and a selected spaceObject to focus
    selection: SpaceObject;
    
    //allocate an ObjectMap to store the initialized Objects for rendering
    objectMap = new Map<string, SpaceObject>;

    constructor() {
        this.rocket = new RainbowRocket();
        this.rocket.position = Vector.fromPoint ({x: 0, y:500})
        this.rocket.direction = Vector.fromPoint({x:1, y:-1})
        this.objectMap.set(`rokket`, this.rocket)
        this.rocket.setScale(.5);

        
        
        // set selection = rocket for default
        this.selection = this.rocket;
        
        this.mission.forEach((object) =>{
            this.gameEnvironment.addOption(this.gameEnvironment.missionSelector, object)
        })
        this.windowing = "centered"
    }

    
    public init(){
        /* füge die SVG Elemente der Spielfiguren ins gameEnvironment
        this.objectMap.forEach((object, key) => {
            if (object.svgElem){
                this.gameEnvironment.svgElement.appendChild(object.svgElem);
            }
        });*/
        // insert the gameEnvironment svg to svg Container
        //this.gameEnvironment.insertBackgroundPicture()
        document.getElementById('svgContainer')!.appendChild(this.gameEnvironment.svgElement);
        this.gameEnvironment.insertBackgroundPicture()
        this.start();
        this.gameLoop();
    }
   

    async start() {
        while (this.actualMission === "") {
            this.actualMission = await this.gameEnvironment.missionSelection();
        }
        console.log("mission selected")
        
        //initiiere die einzelnen Missionen
        switch(this.actualMission){
            case`collisionTest`:
            //create some meteors inside the bgImage
                if(this.gameEnvironment.bgImage){ 
                    const bgImage = this.gameEnvironment.bgImage

                    for(let i = 0; i<10; i++){
                    
                        this.meteor[i] = new SpaceObject()
                        this.meteor[i].position = Vector.fromPoint({x:50000,y:10000})//(Vector.fromPoint({x: Math.random()*2000-4000, y: Math.random()*2000-4000}))
                        this.meteor[i].velocity = new Vector(Math.random()*5, Math.random()*360)
                        this.meteor[i].setScale(5)
                        
                        this.objectMap.set("meteor"+i.toString(), this.meteor[i])
                        
                        const svgElem = document.createElementNS("http://www.w3.org/2000/svg", "rect")
                        const meteorWidth = Math.random()*5+5
                        const meteorHeight = Math.random()*5+5
                        const meteorRotation = Math.random()
                

                        this.meteor[i].rotation = meteorRotation

                        svgElem.setAttribute("width", `${meteorWidth}`)
                        svgElem.setAttribute("height", `${meteorHeight}`)
                        svgElem.setAttribute("rx", `${Math.random()*meteorWidth}`)
                        svgElem.setAttribute("ry", `${Math.random()*meteorHeight}`)
                        svgElem.setAttribute("fill", `grey`)
                        svgElem.setAttribute("opacity", `.6`)

                        svgElem.setAttribute("stroke", `rgb(${Math.floor(Math.random()*255)}, 
                                                            ${Math.floor(Math.random()*255)}, 
                                                            ${Math.floor(Math.random()*255)})`)
                        svgElem.setAttribute("stroke-width", `${Math.random()*10}px`)

                        this.meteor[i].addToGElem(svgElem)
                        this.meteor[i].gElem!.setAttribute("x", `${this.meteor[i].position.x-meteorWidth/2}`)
                        this.meteor[i].gElem!.setAttribute("y", `${this.meteor[i].position.y-meteorHeight/2}`)
                        
                        
                    }
                }                
               
            case`goddog`:
                
                this.godPlanet = new SpaceObject(
                Vector.fromPoint({x:-150,y:450}),          //Position
                new Vector(0,0),                       //velocity
                new Vector(1,0),                    //direction
                .3,                                 //rotation
                undefined,                          //svgElement
                "../resources/gravityPlanet07.png" 
                )
                this.godPlanet.setScale(.3);  
                
                this.dogPlanet = new SpaceObject(
                this.godPlanet.position,          //position
                new Vector(0,0),                       //velocity
                new Vector(1,0),                    //direction
                1,                                  //rotation
                undefined,                          //svgElement
                "../resources/gravityPlanet06.png"  //image-URI
                )
                this.dogPlanet.mass = 20;
                this.dogPlanet.setScale(0);   
                
                //Der soll später Motorradgeräusche machen
                this.bromber = new SpaceObject(
                    Vector.fromPoint({x: 200, y:100}),
                    new Vector(0,0),
                    Vector.fromLengthAndAngle(1,75),
                    0,
                    undefined, 
                    "../resources/spacecraft031.png"
                )
                this.bromber.setScale(.3)
    
                
                //Stelle sicher, dass die SpaceObjects in der richtigen Reihenfolge gerendert werden
                this.objectMap.set('godPlanet', this.godPlanet);
                this.objectMap.set("dogPlanet", this.dogPlanet);
                this.objectMap.set("bromber", this.bromber);
                
                
            break; 
        }
    }

    private gameLoop(){
        
        requestAnimationFrame(() => this.gameLoop());
        this.gameEnvironment.frameRateManager.update(); 
        if(this.gameEnvironment.keyBoardController.isKeyPressed(`a`)){
            this.gameEnvironment.viewBoxWidth -= this.gameEnvironment.viewBoxWidth/10
        }
        if(this.gameEnvironment.keyBoardController.isKeyPressed(`d`)){
            this.gameEnvironment.viewBoxWidth += this.gameEnvironment.viewBoxWidth/10
        }

        
        //if(this.actualMission)
        this.rocket.handleKeyboardInput(this.gameEnvironment.keyBoardController.getKeysPressed())
        
        //  this.background.refresh(this.objectMap);
        this.rocket.setScale(this.gameEnvironment.viewBoxWidth/100)
        //this.gameEnvironment.drawBackground()
        this.updateElements();
        
        switch(this.windowing){
            case `centered`:
            this.gameEnvironment.viewBoxLeft = this.rocket.position.x - this.gameEnvironment.viewBoxWidth/ 2;
            this.gameEnvironment.viewBoxTop = this.rocket.position.y - this.gameEnvironment.viewBoxHeight/ 2;
            //console.log(this.gameEnvironment.viewBoxHeight)
            break;
        }
        
    //erstelle die Logik der einzelnen Missionen
        

        switch(this.actualMission){
            case ``:
                if(!this.started){
                    this.gameEnvironment.windowSmoothly("parabolic", 10, 400, this.rocket.position, .8)
                }
                
                this.gameEnvironment.setArrow2(this.dummy.direction.angle,1)
                this.dummy.rotation += 1;
                this.dummy.update()

                
                
                if(!this.rocketAppeared)
                    this.rocket.rotation += .1
                this.started = true;
                setTimeout(()=>{
                    if(this.rocket.rotation > 0){ 
                        this.rocket.rotation -= .2
                        if(this.rocket.rotation < 0){
                            this.rocket.rotation = 0
                        }
                    }
                    if(!this.rocketAppeared)
                        this.gameEnvironment.setMessage(`Welcome to Space Patrol. Commander ${this.rocketId}!`, 2, 0, (showm) =>{})
                    this.rocketAppeared = true
                    
                }, 8000)
                if(this.rocket.svgElem){ 
                    this.gameEnvironment.playIntro(this.rocket.svgElem)
                }
            break;

            case `collisionTest`:
           
                if (this.rocket.summits){ 
                    this.objectMap.forEach((object, key) =>{
                        if(key.includes("meteor") && object.scale < 5){
                            object.setScale(object.scale + .1)
                            
                        }
                    })
                }
            break;

            case `goddog`:
                this.rocket.rotation = 0
                //this.gameEnvironment.windowSmoothly(2, 500, this.bromber!.position.toPoint())
                if(!this.message&&this.messageCount == 0){
                    this.gameEnvironment.windowSmoothly("linear", 5, 450, this.rocket.position.toPoint())
                    this.windowing = ""
                    this.rocket.velocity = new Vector(0,0);
                    this.gameEnvironment.setMessage(`Ich begrüße Sie herzlich, Commander. Dies ist Ihre Rakete und wir sind Ihre Crew. 
                    Wir begleiten Sie bei Ihrer Reise durch den Raum. 
                    Steuern Sie die Rakete mit den Pfeiltasten.`, this.defaultMessageDuration, 1, (shown) =>{
                        this.message = true;
                        
                    })
                    this.messageCount++
                    
                }
                
                if(this.message && this.messageCount == 1){
                    
                    this.windowing = "";
                    this.message = false;
                    this.gameEnvironment.windowSmoothly("parabolic", 2, 2000, this.godPlanet!.position.toPoint())
                    this.gameEnvironment.setMessage(`Ihre Aufgabe ist es, diesen Planeten zu reparieren.`, 
                    this.defaultMessageDuration,
                    1,
                    (shown)=>{
                        this.message = true
                    })
                    this.messageCount++
                }
                 

                if(this.message && this.messageCount == 2){
                    this.message = false;
                    this.gameEnvironment.windowSmoothly("parabolic", 2, 1000, this.bromber!.position.toPoint())
                    
                    this.gameEnvironment.setMessage(`Dabei wird Ihnen dieses Raumschiff wertvolle Hilfe leisten.`,
                    this.defaultMessageDuration/3, 
                    undefined, 
                    (shown)=>{
                        this.message = true; 
                    })
                    this.messageCount++
                }
                
                
                if(this.message && this.messageCount == 3){
                    this.message = false;
                    this.gameEnvironment.windowSmoothly("parabolic",
                                                         2, this.godPlanet?.distance(this.bromber?.position!)!* 5, 
                                                         {x: (this.bromber!.position.x - this.godPlanet!.position.x) / 2 + this.godPlanet!.position.x,
                                                            y: (this.bromber!.position.y - this.bromber!.position.y) / 2 + this.godPlanet!.position.y},
                                                        .8)
                    this.gameEnvironment.setMessage(`In dieser Umgebung werden Sie die Rakete steuern...`,
                    this.defaultMessageDuration, 
                    1, 
                    (shown)=>{
                        this.message = true
                    });
                    
                    this.messageCount++;
                    
                }
                

                if(this.message && this.messageCount == 4){
                    this.message = false;
                    this.windowing = `centered`
                    this.gameEnvironment.windowSmoothly("linear", 2, 800, this.rocket.position.toPoint(), .8)
                    this.gameEnvironment.setMessage(`Nur Mut, Commander. Beschleunigen Sie die Rakete, 
                    bis der weiße Geschwindigkeitspfeil größer 
                    als der Richtungspfeil ist`,
                    this.defaultMessageDuration, 
                    1, 
                    (shown)=>{
                        this.message = true
                    });
                    
                    this.messageCount++;
                    this.enableSpeedTest = true;
                }

                if(this.message && this.messageCount == 5 && this.enableSpeedTest && this.rocket.velocity.length > 10 ){ 
                    this.message = false;
                    this.gameEnvironment.setMessage(`Krass, Commander. Sie sind richtig schnell. Bremsen Sie mal ab.`,
                    this.defaultMessageDuration, 
                    0, (shown)=>{
                    this.message = true;
                    })
                    this.gameEnvironment.windowSmoothly("parabolic", 5, 800, this.rocket.position, .6)
                    this.windowing = "centered"
                    this.speedTest = true
                    this.messageCount++ 
                }
                
                //if(this.speedTest  && !this.message7){
                if(this.message && this.messageCount == 6 && this.rocket.velocity.length < 1){ 
                    this.message = false;
                    this.gameEnvironment.setMessage(`Ok, Ok. Sie haben die Rakete im Griff. Zum Glück fliegen wir nur mit Stadtgas.`,
                    this.defaultMessageDuration, 
                    0, 
                    (shown)=>{
                        this.message = true;
                    })
                    this.enableBromberMission = true;  
                    this.messageCount++
                }
                
                //if(this.enableBromberMission && !this.message8){
                if(this.messageCount == 7 && this.message){ 
                    this.message = false;
                    this.windowing = ""
                    this.gameEnvironment.setMessage(`Wir haben ein Signal erhalten. 
                                                        Ein nahegelegenes Schiff ruft uns. 
                                                        Wollen wir dem Signal folgen?`, 
                                                        this.defaultMessageDuration, 
                                                        1, 
                                                        (shown)=>{
                        
                        this.message = true;
                    });
                    this.gameEnvironment.windowSmoothly("parabolic", 5, this.rocket.distance(this.bromber!.position), 
                                                        {x: (this.bromber!.position.x - this.rocket.position.x)/2 + this.rocket.position.x, 
                                                        y: (this.bromber!.position.y - this.rocket.position.y)/2 + this.rocket.position.y})
                    this.gameEnvironment.displayOptions(["Ja", "Nein"], this);
                    this.gameEnvironment.waitForDecision = true;

                    this.messageCount++
                    
                }

                if( this.messageCount == 8 && this.message && this.decision == "Ja"){
                    this.message = false;
                    this.gameEnvironment.windowSmoothly("parabolic", 3, 800, this.rocket.position, 1)
                    this.windowing = "centered"
                    this.gameEnvironment.setMessage(`Ok, der blaue Pfeil, der die Richtung der Rakete anzeigte, zeigt nun auf das Schiff, 
                                                    das wir erreichen wollen. Je größer der Pfeil, desto näher das Schiff! Auf gehts Commander, 
                                                    lassen Sie uns das Schiff erreichen!`, 20, 1, (shown)=>{
                        this.message = true;
                    })
                    
                    if(this.bromber)
                    this.selection = this.bromber;
                    this.messageCount++
                }

                if(this.messageCount==9 && this.message && this.rocket.position.distance(this.bromber!.position) < 100 && !this.bromberActivationSequence){
                    this.message = false;
                    this.gameEnvironment.setMessage("Commander, wir haben das Schiff gefunden. Es aktiviert seine Systeme!",15, 1, (shown)=>{
                        this.message = true
                    })
                    

                    //Activiere die Systeme des brombers
                    for(let i: number = 0; i<3; i++){
                        setInterval(() => {
                            this.bromber!.rotate(Math.random() * 20 - 10);
                            
                        },1000 + i*500)
                        if(i > 1){
                            this.bromber!.rotation = .5;
                            this.bromber?.accelerate(.3)
                            
                        }
                    }
                    
                    this.messageCount++
                    this.actualTimestamp = performance.now();
                    
                }
                
                if(this.messageCount == 10 && this.message && performance.now() > this.actualTimestamp + 2000){
                    this.message = false;
                    this.gameEnvironment.setMessage("Commander, das Schiff geht auf Kurs. Wir sollten ihm folgen!",15,1, (shown)=>{
                        this.enableDogMission = true;
                    })
                    this.bromber!.rotation = 0;
                    this.bromber!.direction = Vector.betweenPoints(this.bromber!.position, this.godPlanet!.position).normalize()
                    this.bromber?.accelerate(1.8);
                    this.gameEnvironment.setLabel1(`distance to god: ${this.rocket.distance(this.godPlanet!.position)}`)
                    this.gameEnvironment.windowSmoothly("parabolic", 2, this.godPlanet!.distance(this.bromber!.position), {x: (this.bromber!.position.x - this.godPlanet!.position.x)/2 +this.godPlanet!.position.x,
                                                                        y: (this.bromber!.position.y - this.godPlanet!.position.y)/2 +this.godPlanet!.position.y} )
                    this.selection = this.godPlanet!;
                    
                

                    if(this.bromber!.distance(this.godPlanet!.position) < 100 && this.bromber!.scale > .01){
                        
                        this.bromber!.setScale(this.bromber!.distance(this.godPlanet!.position)/100 * 0.3)
                    }
                        
                    
                    this.messageCount++
                }
                if (this.messageCount == 11 && this.rocket.distance(this.godPlanet!.position) < 250 ){
                    this.message = false;
                    this.gameEnvironment.windowSmoothly("parabolic", 3, 1200, this.godPlanet!.position)
                    this.gameEnvironment.setMessage(`Krass, Commander! Wir stehen hier mitten im Weltraum. Direkt vor uns befindet sich 
                                                    ein riesiges supermassereiches schwarzes Loch!`,20, 1, (shown)=>{
                        this.message = true
                        
                        })
                
                    //Setze einen Timer, bewege den dog Planet geschmeidig aus dem godPlanet heraus und lass ihn abdriften
                    setTimeout(()=> {
                        for(let i: number = 0; i<200; i++){
                            setTimeout(() =>{
                                this.dogPlanet!.setScale(i/199);           // Object is possibly 'null'... - Object wird drei Zeilen weiter oben definiert!
                            },i*100);
                        }
                    },2000);
            
                    setTimeout(() => {
                        for(let i:number = 0; i<20; i++){
                            setTimeout(() =>{
                            this.dogPlanet!.accelerate(Math.pow(i/2,2)/500); //s.a.
                            },i*100);
                        }
            
                    }, 13000); // miliseconds
                    this.messageCount++
                    this.actualTimestamp = performance.now();
                }
                if(this.message == true && this.messageCount == 12){ 
                    
                    
                    if(performance.now() > this.actualTimestamp + 2000){ 
                        this.gameEnvironment.setMessage("Da fliegt es hin, das dicke Ei! Wir sollten es zurückholen. Aber wie? Commander. Ich habs. Wir brauchen ein geeignetes Gerät!",20, 1, (shown)=>{
                        
                        })
                    }
                    
                }
                break;
            
        }

    }
    

    private updateElements(){
        // use a bulky form of typeassertion to avoid Typescript complaining "Property 'direction' does not exist on type 'never'."
        const selectionWithDirection = this.selection as { direction: { angle: number } };
        const rocketWithPosition = this.rocket as { position: Vector  };
        const selectionWithPosition = this.selection as { position: Vector };

        let arrow2Direction;
        let arrow2ScaleFactor; 

        // let god Planet be appended first
        if(this.godPlanet){ 
            if(this.godPlanet.defsElem)
                this.gameEnvironment.svgElement.appendChild(this.godPlanet.defsElem)
            if(this.godPlanet.gElem)
                this.gameEnvironment.svgElement.appendChild(this.godPlanet.gElem)
        }
        this.objectMap.forEach((object, key) => {

            object.update()
            
            if(this.godPlanet){ 
                if(key != "godPlanet" && object.distance(this.godPlanet.position) < 100 && object.distance(this.godPlanet.position) > 10){
                    object.setScale(object.scale * object.distance(this.godPlanet.position) / 100)
                }

                //dispose the object
       /*         if(object.scale < .01){
                    object = null
                }
                */
          
            }

            //check if the meteors are still inside the frame, otherwise place them inside again
            if(this.gameEnvironment.bgImage && key.includes("meteor")){
                if (object.position.x < this.gameEnvironment.bgImage?.getBBox().x){
                    object.position = Vector.fromPoint({x: this.gameEnvironment.bgImage.getBBox().x + this.gameEnvironment.bgImage.getBBox().width,
                                                        y: object.position.y})
                }
                if (object.position.x > this.gameEnvironment.bgImage?.getBBox().x + this.gameEnvironment.bgImage.getBBox().width){
                    object.position = Vector.fromPoint({x: this.gameEnvironment.bgImage.getBBox().x,
                                                        y: object.position.y})
                }
                if (object.position.y < this.gameEnvironment.bgImage?.getBBox().y){
                    object.position = Vector.fromPoint({x: object.position.x,
                                                        y: this.gameEnvironment.bgImage.getBBox().y + this.gameEnvironment.bgImage.getBBox().height})
                }
                
                if (object.position.y > this.gameEnvironment.bgImage?.getBBox().y + this.gameEnvironment.bgImage.getBBox().height){
                    object.position = Vector.fromPoint({x: object.position.x,
                                                        y: this.gameEnvironment.bgImage.getBBox().y})
                }
            }
            //be sure rockets svg is appended at last and planet are already appended
            if(key !="rokket" && key !="godPlanet"){ 
                if(object.defsElem)
                    this.gameEnvironment.svgElement.appendChild(object.defsElem)
                if(object.gElem)
                    this.gameEnvironment.svgElement.appendChild(object.gElem)
            }
                 
        })

        if(this.rocket.defsElem)
            this.gameEnvironment.svgElement.appendChild(this.rocket.defsElem)
         if(this.rocket.gElem)
            this.gameEnvironment.svgElement.appendChild(this.rocket.gElem)
        /*
        this.objectMap.forEach((object, key) => {
            if(key != "rokket"){
                object.update();
                if(object.defsElem)
                    for( let i = 0; i < object.defsElem?.length; i++)
                        this.gameEnvironment.svgElement.appendChild(object.defsElem[i])
                if(object.gElem)
                    this.gameEnvironment.svgElement.appendChild(object.gElem);
                  
            }
            
        });
        this.rocket.update()
        if(this.rocket.defsElem)
                    for( let i = 0; i < this.rocket.defsElem?.length; i++)
                        this.gameEnvironment.svgElement.appendChild(this.rocket.defsElem[i])
                
        this.gameEnvironment.svgElement.appendChild(this.rocket.gElem!);
        */
        //this.bromber!.rotationPivot = {x:100, y:100}
/*
        this.gameEnvironment.setLabel1("number of meteors: "+ this.meteor.length)
        this.gameEnvironment.setLabel2("viewBoxWidth:"+this.gameEnvironment.viewBoxWidth)
        this.gameEnvironment.setLabel3("rocket position x: "+this.rocket.position.x.toFixed(0) + "y: "+this.rocket.position.y.toFixed(0))
        this.gameEnvironment.setLabel4("distance to meteor1: "+this.rocket.distance(this.meteor[0].position).toFixed(0))
        this.gameEnvironment.setArrow1(this.rocket.velocity.angle + 90, this.rocket.velocity.length)
   */     
        if(this.selection == this.rocket && this.actualMission){
            this.gameEnvironment.setArrow2(this.selection.direction.angle + 90, 1)
            //this.gameEnvironment.setLabel4(`Bromber Position: ${this.bromber?.position.x}, ${this.bromber?.position.y}`);
        }
        else if(this.actualMission){// set the scale of the arrow proportional to the distance to the selected object
            arrow2ScaleFactor = 1000 / Vector.betweenPoints(rocketWithPosition.position, selectionWithPosition.position).length //see bulky statement above
            // range maxScaleFActor and minScaleFactor between some Values
            if(arrow2ScaleFactor <.2)
                arrow2ScaleFactor = .2;
            if(arrow2ScaleFactor >2)
                arrow2ScaleFactor = 2;
            
            arrow2Direction = Vector.betweenPoints(this.rocket.position, this.selection.position).angle + 90
            this.gameEnvironment.setArrow2(arrow2Direction, arrow2ScaleFactor) 
            //console.log(Vector.betweenPoints(this.rocket.position, this.selection.position).angle)
            //this.gameEnvironment.setLabel4(Vector.betweenPoints(this.rocket.position, this.selection.position).length.toFixed(2))
        }
    }
}

console.log("SpaceGame loads")
const game = new SpaceGame();
game.init(); // Aufruf der init-Methode, um das Spiel zu starten


