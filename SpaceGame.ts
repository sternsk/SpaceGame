class SpaceGame {
    gameEnvironment= new GameEnvironment();
    frameRateManager = new FrameRateManager();

    //allocate controlvariables for possible missions
    defaultMessageDuration = 2;
    
    mission: string = "goddog"; //Testmission
    windowing: string = "centered"; //preparing for different screenbehaviour
    dogProcessRunning = false;
    message = false;
    message1 = false;
    message2 = false; 
    message3 = false; 
    message4 = false; 
    message5 = false; 
    message6 = false; 
    message7 = false; 
    message8 = false; 
    message8a = false; 
    message9 = false; 
    messageCount = 0;

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

    // and a selected spaceObject to focus
    selection: SpaceObject;
    
    //allocate an ObjectMap to store the initialized Objects for rendering
    objectMap = new Map<string, SpaceObject>;

    constructor(mission: string) {
        this.rocket = new RainbowRocket();
        this.rocket.position = Vector.fromPoint ({x: 0, y:100})
        this.rocket.direction = Vector.fromPoint({x:1, y:-1})
        
        this.rocket.setScale(5);
        // set selection = rocket for default
        this.selection = this.rocket;
        
        //
        if (mission === "goddog") {             //Initialisierung der Mission "goddog" und den entsprechenden SpaceObjects
            this.godPlanet = new SpaceObject(
            Vector.fromPoint({x:-3000,y:500}),          //Position
            new Vector(0,0),                       //velocity
            new Vector(1,0),                    //direction
            .3,                                 //rotation
            undefined,                          //svgElement
            "../resources/gravityPlanet07.png" 
            )
            
            this.dogPlanet = new SpaceObject(
            Vector.fromPoint({x:-3000,y:500}),          //position
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
                Vector.fromPoint({x: 1000, y:100}),
                new Vector(0,0),
                Vector.fromLengthAndAngle(1,0),
                0,
                undefined, 
                "../resources/spacecraft031.png"
            )
            this.bromber.setScale(.3)

            
            //Stelle sicher, dass die SpaceObjects in der richtigen Reihenfolge gerendert werden
            this.objectMap.set('godPlanet', this.godPlanet);
            this.objectMap.set("dogPlanet", this.dogPlanet);
            this.objectMap.set("bromber", this.bromber);
            this.objectMap.set(`rokket`, this.rocket)
            }
    }

    private gameLoop(){
        
        requestAnimationFrame(() => this.gameLoop());
        this.frameRateManager.update(); 
        //console.log(this.frameRateManager.getFPS())
        
        this.rocket.handleKeyboardInput(this.gameEnvironment.keyBoardController.getKeysPressed())
        
    //  this.background.refresh(this.objectMap);
        this.updateElements();
        
    //erstelle die Logik der einzelnen Missionen
        switch(this.mission){
            
            case `goddog`:
                
                switch(this.windowing){
                    case `centered`:
                    this.gameEnvironment.viewBoxLeft = this.rocket.position.x - this.gameEnvironment.viewBoxWidth/ 2;
                    this.gameEnvironment.viewBoxTop = this.rocket.position.y - this.gameEnvironment.viewBoxHeight/ 2;
                    break;
                }
                
                
                if(!this.message&&this.messageCount == 0){
                    //this.gameEnvironment.windowSmoothly(2, this.frameRateManager.getFPS(), 8000, this.rocket.position.toPoint())
                
                    this.gameEnvironment.setMessage(`Ich begrüße Sie herzlich, Commander. Dies ist Ihre Rakete und wir sind Ihre Crew. 
                    Wir begleiten Sie bei Ihrer Reise durch den Raum. 
                    Steuern Sie die Rakete mit den Pfeiltasten.`, this.defaultMessageDuration, 1, (shown) =>{
                        this.message = true;
                        
                    })
                    this.messageCount++
                    
                }
                
                if(this.message && this.messageCount == 1){
                    
                    this.message = false;
                    this.gameEnvironment.setMessage(`Am linken Bildschirmrand sehen Sie eine Reihe von Kontrollinstrumenten.`, 
                    this.defaultMessageDuration,
                    1,
                    (shown)=>{
                        this.message = true
                    })
                    this.messageCount++
                }
                 

                if(this.message && this.messageCount == 2){
                    this.message = false;
                    this.gameEnvironment.setMessage(`Damit meine ich nicht die html-Links zu den anderen Seiten dieser websperiments.`,
                    this.defaultMessageDuration/2, 
                    undefined, 
                    (shown)=>{
                        this.message = true; 
                    })
                    this.messageCount++
                }
                
                
                if(this.message && this.messageCount == 3){
                    this.message = false;
                    this.gameEnvironment.setMessage(`Der blaue Pfeil zeigt die Richtung der Rakete und der weiße Pfeil die Flugrichtung. 
                    Die Größe des weißen Pfeils 
                    zeigt die Geschwindigkeit an. Wenn Sie stehen, ist kein weißer Pfeil zu sehen.`,
                    this.defaultMessageDuration, 
                    1, 
                    (shown)=>{
                        this.message = true
                    });
                    
                    this.messageCount++;
                    
                }
                

                if(this.message && this.messageCount == 4){
                    this.message = false;
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
                    1, (shown)=>{
                    this.message = true;
                    })
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
                    this.gameEnvironment.setMessage(`Wir haben ein Signal erhalten. 
                                                        Ein nahegelegenes Schiff ruft uns. 
                                                        Wollen wir dem Signal folgen?`, 
                                                        3, 
                                                        1, 
                                                        (shown)=>{
                        
                        this.message = true;
                    });
                    this.gameEnvironment.displayOptions(["Ja", "Nein"], this);
                    this.gameEnvironment.waitForDecision = true;

                    this.messageCount++
                    
                }

                if( this.messageCount == 8 && this.message && this.decision == "Ja"){
                    this.message = false;
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
                    this.bromber!.direction = Vector.betweenPoints(this.bromber!.position, this.godPlanet!.position).normalize()
                    this.bromber?.accelerate(1.8);
                    this.gameEnvironment.setLabel1(`distance to god: ${this.rocket.distance(this.godPlanet!.position)}`)
                    this.selection = this.godPlanet!;
                    
                

                    if(this.bromber!.distance(this.godPlanet!.position) < 100 && this.bromber!.scale > .01){
                        
                        this.bromber!.setScale(this.bromber!.distance(this.godPlanet!.position)/100 * 0.3)
                    }
                        
                    
                    this.messageCount++
                }
                if (this.messageCount == 11 && this.rocket.distance(this.godPlanet!.position) < 100 ){
                    this.message = false;
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
    

    public init(){
        /* füge die SVG Elemente der Spielfiguren ins gameEnvironment
        this.objectMap.forEach((object, key) => {
            if (object.svgElem){
                this.gameEnvironment.svgElement.appendChild(object.svgElem);
            }
        });*/
        // insert the gameEnvironment svg to svg Container
        document.getElementById('svgContainer')!.appendChild(this.gameEnvironment.svgElement);
        
        
        this.gameLoop();
    }
   
    private updateElements(){
        // use a bulky form of typeassertion to avoid Typescript complaining "Property 'direction' does not exist on type 'never'."
        const selectionWithDirection = this.selection as { direction: { angle: number } };
        const rocketWithPosition = this.rocket as { position: Vector  };
        const selectionWithPosition = this.selection as { position: Vector };

        let arrow2Direction;
        let arrow2ScaleFactor; 

        this.objectMap.forEach((object, key) => {
           // if(key != "bromber")
            object.update();
            if(object.svgElem){
                this.gameEnvironment.svgElement.appendChild(object.svgElem);
            }
        });
        //this.bromber!.rotationPivot = {x:100, y:100}

        //this.gameEnvironment.setLabel1(`Bromber velocity: ${this.bromber!.velocity.length.toFixed(2)}`)
        //this.gameEnvironment.setLabel2(`Bromber direction length: ${this.bromber!.direction.length.toFixed(2)}`) //Die Verwendung von Backticks (`) anstelle von einfachen oder doppelten Anführungszeichen ermöglicht die direkte Einfügung von JavaScript-Ausdrücken innerhalb der Zeichenkette. Beide Methoden erreichen dasselbe Ziel, aber der zweite Ausdruck mit Template Literal ist in der Regel leserlicher und einfacher zu handhaben, besonders wenn komplexe Ausdrücke oder mehrere Variablen eingefügt werden müssen. Template Literals bieten auch eine verbesserte Lesbarkeit, da sie mehrzeilige Zeichenketten unterstützen, ohne dass Escape-Zeichen erforderlich sind.
        //this.gameEnvironment.setLabel3(`God Pos: ${this.godPlanet!.position.x.toFixed(0)}, ${this.godPlanet!.position.y.toFixed(0)}`)
        this.gameEnvironment.setArrow1(this.rocket.velocity.angle + 90, this.rocket.velocity.length)
        
        if(this.selection == this.rocket){
            this.gameEnvironment.setArrow2(this.selection.direction.angle + 90, 1)
            //this.gameEnvironment.setLabel4(`Bromber Position: ${this.bromber?.position.x}, ${this.bromber?.position.y}`);
        }
        else {// set the scale of the arrow proportional to the distance to the selected object
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


// Initialisiere das Spiel, wenn die Seite geladen ist
window.onload = () => {
    const game = new SpaceGame("goddog");
    game.init(); // Aufruf der init-Methode, um das Spiel zu starten
};

