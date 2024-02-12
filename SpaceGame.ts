class SpaceGame {
    gameEnvironment= new GameEnvironment();

    mission: string = "goddog"; //Testmission
    dogProcessRunning = false;

    rocket: RainbowRocket;
    godPlanet: SpaceObject | null = null; 
    dogPlanet: SpaceObject | null = null;
    
    objectMap = new Map<string, SpaceObject>;

    constructor(mission: string) {
        this.rocket = new RainbowRocket();
        this.rocket.position = new Vector ({x: -300, y:300})
        this.rocket.direction = new Vector({x:1, y:-1})
        this.rocket.scale(5);
        
        
        if (mission === "goddog") {             //Initialisierung der Mission "goddog"
            
            this.godPlanet = new SpaceObject(
            new Vector({x:-20,y:-20}),          //Position
            new Vector(),                       //velocity
            new Vector(1,0),                    //direction
            .3,                                 //rotation
            undefined,                          //svgElement
            "../resources/gravityPlanet07.png" 
            )
            
            
            this.dogPlanet = new SpaceObject(
            new Vector({x:-20,y:-20}),          //position
            new Vector(),                       //velocity
            new Vector(1,0),                    //direction
            1,                                  //rotation
            undefined,                          //svgElement
            "../resources/gravityPlanet06.png"  //image-URI
            )
            //this.godPlanet.setImageWidth(300); // is undefined by default
            this.dogPlanet.mass = 20;
            this.dogPlanet.scale(0);
            
            //Stelle sicher, dass die SpaceObjects in der richtigen Reihenfolge gerendert werden
            this.objectMap.set('godPlanet', this.godPlanet);
            this.objectMap.set("dogPlanet", this.dogPlanet);
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
                if (this.rocket.distance(this.dogPlanet!.position) < 100 && !this.dogProcessRunning){
                    this.dogProcessRunning = true;
                    this.gameEnvironment.setMessage(`Krass, Commander! Wir stehen hier mitten im Weltraum direkt vor einem riesigen supermassereichen schwarzem Loch!`)
                
                    //Setze einen Timer, bewege den dog Planet geschmeidig aus dem godPlanet heraus und lass ihn abdriften
                    setTimeout(()=> {
                        for(let i: number = 0; i<200; i++){
                            setTimeout(() =>{
                                this.dogPlanet!.scale(i/199);           // Object is possibly 'null'... - Object wird drei Zeilen weiter oben definiert!
                            },i*100);
                        }
                    },1000);
            
                    setTimeout(() => {
                        for(let i:number = 0; i<20; i++){
                            setTimeout(() =>{
                            this.dogPlanet!.accelerate(Math.pow(i/2,2)/500); //s.a.
                            },i*100);
                        }
            
                    }, 13000); // miliseconds
                }
            
        }


    }

    public init(){
        // füge die SVG Elemente der Spielfiguren ins gameEnvironment
        this.objectMap.forEach((object, key) => {
            if (object.svgElem){
                this.gameEnvironment.svgElement.appendChild(object.svgElem);
            }
        });
        document.getElementById('svgContainer')!.appendChild(this.gameEnvironment.svgElement);
        
        
        this.gameLoop();
    }
   
    private updateElements(){
        this.objectMap.forEach((object, key) => {
            object.update();
            if(object.svgElem){
                this.gameEnvironment.svgElement.appendChild(object.svgElem);
            }
        });
        this.gameEnvironment.setLabel1("Distance to dog:"+this.rocket.distance(this.dogPlanet!.position).toFixed(2).toString())
        this.gameEnvironment.setLabel2(`yPosition: ${this.rocket.position.y.toFixed(2)}`) //Die Verwendung von Backticks (`) anstelle von einfachen oder doppelten Anführungszeichen ermöglicht die direkte Einfügung von JavaScript-Ausdrücken innerhalb der Zeichenkette. Beide Methoden erreichen dasselbe Ziel, aber der zweite Ausdruck mit Template Literal ist in der Regel leserlicher und einfacher zu handhaben, besonders wenn komplexe Ausdrücke oder mehrere Variablen eingefügt werden müssen. Template Literals bieten auch eine verbesserte Lesbarkeit, da sie mehrzeilige Zeichenketten unterstützen, ohne dass Escape-Zeichen erforderlich sind.
        this.gameEnvironment.setLabel3(this.rocket.velocity.x.toFixed(2) + ', '+(this.rocket.velocity.y.toFixed(2)))
        this.gameEnvironment.setArrow1(this.rocket.velocity.angle/Math.PI*180 + 90, this.rocket.velocity.length)
        this.gameEnvironment.setLabel4((this.rocket.direction.angle/Math.PI*180).toFixed(0).toString())
        this.gameEnvironment.setArrow2(this.rocket.direction.angle/Math.PI*180 + 90, 1)
    }
}


// Initialisiere das Spiel, wenn die Seite geladen ist
window.onload = () => {
    const game = new SpaceGame("goddog");
    game.init(); // Aufruf der init-Methode, um das Spiel zu starten
};

