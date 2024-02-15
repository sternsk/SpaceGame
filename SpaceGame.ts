class SpaceGame {
    gameEnvironment= new GameEnvironment();

    //allocate controlvariables for possible missions
    mission: string = "goddog"; //Testmission
    dogProcessRunning = false;
    initialMessageShown = false;
    message2 = false; 
    message3 = false; 
    message4 = false; 
    message5 = false; 
    message6 = false; 
    message7 = false; 
    message8 = false; 
    enableSpeedTest = false;
    speedTest = false; 
    enableBromberMission = false;
    enableDogMission = false;

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
        this.rocket.position = new Vector ({x: 0, y:0})
        this.rocket.direction = new Vector({x:1, y:-1})
        this.rocket.setScale(5);
        // set selection = rocket for default
        this.selection = this.rocket;
        
        
        if (mission === "goddog") {             //Initialisierung der Mission "goddog"
            
            
            this.godPlanet = new SpaceObject(
            new Vector({x:-500,y:0}),          //Position
            new Vector(),                       //velocity
            new Vector(1,0),                    //direction
            .3,                                 //rotation
            undefined,                          //svgElement
            "../resources/gravityPlanet07.png" 
            )
            
            
            this.dogPlanet = new SpaceObject(
            new Vector({x:-500,y:0}),          //position
            new Vector(),                       //velocity
            new Vector(1,0),                    //direction
            1,                                  //rotation
            undefined,                          //svgElement
            "../resources/gravityPlanet06.png"  //image-URI
            )
            this.dogPlanet.mass = 20;
            this.dogPlanet.setScale(0.5);        
            
            //Der soll später Motorradgeräusche machen
            this.bromber = new SpaceObject(
                Vector.fromPoint({x: 1000, y:0}),
                new Vector(),
                Vector.fromLengthAndAngle(1,0),
                1,
                undefined, 
                "../resources/spacecraft031.png"
            )
            this.bromber.setScale(1)
            this.selection = this.bromber;
            console.log("selection set to bromber")

            
            //Stelle sicher, dass die SpaceObjects in der richtigen Reihenfolge gerendert werden
            this.objectMap.set('godPlanet', this.godPlanet);
            this.objectMap.set("dogPlanet", this.dogPlanet);
            this.objectMap.set("bromber", this.bromber);
            this.objectMap.set(`rokket`, this.rocket)
            }
    }

    private gameLoop(){
        
        requestAnimationFrame(() => this.gameLoop());
        this.rocket.handleKeyboardInput(this.gameEnvironment.keyBoardController.getKeysPressed())
       
    //  this.background.refresh(this.objectMap);
        this.updateElements();

        switch(this.mission){
            
            case `goddog`:
                this.gameEnvironment.viewBoxLeft = this.rocket.position.x - this.gameEnvironment.viewBoxWidth/ 2;
                this.gameEnvironment.viewBoxTop = this.rocket.position.y - this.gameEnvironment.viewBoxHeight/ 2;

                if(!this.initialMessageShown){
                    setTimeout(()=> {
                        this.gameEnvironment.setMessage(`Ich begrüße Sie herzlich, Commander. Dies ist Ihre Rakete und wir sind Ihre Crew. 
                        Wir begleiten Sie bei Ihrer Reise durch den Raum. 
                        Steuern Sie die Rakete mit den Pfeiltasten.`)
                    },8000);
                }
                this.initialMessageShown = true;

                if(!this.message2){
                    setTimeout(()=> {
                        this.gameEnvironment.setMessage(`Am linken Bildschirmrand sehen Sie eine Reihe von Kontrollinstrumenten. 
                        `)
                    },29000);
                }
                this.message2 = true; 

                if(!this.message3){
                    setTimeout(()=> {
                        this.gameEnvironment.setMessage(`Damit meine ich nicht die html-Links zu den anderen Seiten dieser websperiments. 
                        `)
                    },50000);
                }
                this.message3 = true; 
                
                if(!this.message4){
                    setTimeout(()=> {
                        this.gameEnvironment.setMessage(`Der blaue Pfeil zeigt die Richtung der Rakete und der weiße Pfeil die Flugrichtung. Die Größe des weißen Pfeils 
                        zeigt die Geschwindigkeit an. Wenn Sie stehen, ist kein weißer Pfeil zu sehen.`)
                    },71000);
                }
                this.message4 = true; 

                if(!this.message5){
                    setTimeout(()=> {
                        this.gameEnvironment.setMessage(`Nur Mut, Commander. Beschleunigen Sie die Rakete, bis der weiße Geschwindigkeitspfeil größer 
                        als der Richtungspfeil ist`)
                    },92000);
                    this.message5 = true;
                    this.enableSpeedTest = true;
                }

                if(this.rocket.velocity.length > 30 && !this.message6 && this.enableSpeedTest){
                        this.gameEnvironment.setMessage(`Krass, Commander. Sie sind richtig schnell. Bremsen Sie mal ab.`)
                        this.speedTest = true
                        this.message6 = true; 
                        
                }
                
                if(this.speedTest && this.rocket.velocity.length < 1 && !this.message7){
                    this.gameEnvironment.setMessage(`Ok, Ok. Sie haben die Rakete im Griff. Zum Glück fliegen wir mit Stadtgas.`)
                    this.message7 = true;
                    this.enableBromberMission = true;  
                    }
                
                if(this.enableBromberMission && !this.message8){
                    this.gameEnvironment.setMessage(`Wir haben ein Signal erhalten. Ein nahegelegenes Schiff ruft uns. Wollen wir dem Signal folgen?`);
                    this.gameEnvironment.setMessage(`Ok, der blaue Pfeil, der die Richtung der Rakete anzeigte, zeigt nun auf das Schiff, 
                                                    das wir erreichen wollen. Je größer der Pfeil, desto näher das Schiff! Auf gehts Commander, 
                                                    lassen Sie uns das Schiff erreichen!`)
                    if(this.bromber){
                    this.selection = this.bromber;
                    
                    this.message8 = true;
                    }

                }

                
                if (this.rocket.distance(this.godPlanet!.position) < 100 && !this.dogProcessRunning && this.enableDogMission){
                    this.dogProcessRunning = true;
                    this.gameEnvironment.setMessage(`Krass, Commander! Wir stehen hier mitten im Weltraum. Direkt vor uns befindet sich 
                                                    ein riesiges supermassereiches schwarzes Loch!`)
                
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

        console.log(this.rocket.direction.angle)

        this.objectMap.forEach((object, key) => {
           // if(key != "bromber")
            object.update();
            if(object.svgElem){
                this.gameEnvironment.svgElement.appendChild(object.svgElem);
            }
        });
        //this.bromber!.rotationPivot = {x:100, y:100}

        this.gameEnvironment.setLabel1("Rocket Direction:"+this.rocket.direction.angle.toFixed(0))
        this.gameEnvironment.setLabel2(`Bromber Postion: ${this.bromber!.position.x.toFixed(0)}, ${this.bromber!.position.y.toFixed(0)}`) //Die Verwendung von Backticks (`) anstelle von einfachen oder doppelten Anführungszeichen ermöglicht die direkte Einfügung von JavaScript-Ausdrücken innerhalb der Zeichenkette. Beide Methoden erreichen dasselbe Ziel, aber der zweite Ausdruck mit Template Literal ist in der Regel leserlicher und einfacher zu handhaben, besonders wenn komplexe Ausdrücke oder mehrere Variablen eingefügt werden müssen. Template Literals bieten auch eine verbesserte Lesbarkeit, da sie mehrzeilige Zeichenketten unterstützen, ohne dass Escape-Zeichen erforderlich sind.
        this.gameEnvironment.setLabel3(`Selection Pos: ${this.selection.position.x.toFixed(0)}, ${this.selection.position.y.toFixed(0)}`)
        this.gameEnvironment.setArrow1(this.rocket.velocity.angle/Math.PI*180 + 90, this.rocket.velocity.length)
        this.gameEnvironment.setLabel4(Vector.betweenPoints(this.rocket.position, this.selection.position).length.toFixed(2))
        if(this.selection == this.rocket){
            this.gameEnvironment.setArrow2(this.selection.direction.angle/Math.PI*180 + 90, 1)
        }
        else {// set the scale of the arrow proportional to the distance to the selected object
            arrow2ScaleFactor = 1000 / Vector.betweenPoints(rocketWithPosition.position, selectionWithPosition.position).length //see bulky statement above
            if(arrow2ScaleFactor <.2)
                arrow2ScaleFactor = .2;
            if(arrow2ScaleFactor >2)
                arrow2ScaleFactor = 2;
            
            arrow2Direction = Vector.betweenPoints(this.rocket.position, this.selection.position).angle/Math.PI*180 + 90
            this.gameEnvironment.setArrow2(arrow2Direction, arrow2ScaleFactor) 
            //console.log(Vector.betweenPoints(this.rocket.position, this.selection.position).angle)
        }
    }
}


// Initialisiere das Spiel, wenn die Seite geladen ist
window.onload = () => {
    const game = new SpaceGame("goddog");
    game.init(); // Aufruf der init-Methode, um das Spiel zu starten
};

