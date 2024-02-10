class SpaceGame061{
    gameEnvironment: GameEnvironment;
    //background: GridBackground;
    
    godPlanet: SpaceObject; 
    dogPlanet: SpaceObject;
    rocket: RainbowRocket;

    objectMap = new Map<string, SpaceObject>();

    constructor() {

        this.gameEnvironment = new GameEnvironment();
        //this.background = new GridBackground(this.gameEnvironment.viewBoxWidth, this.gameEnvironment.viewBoxHeight, this.gameEnvironment.viewBoxLeft, this.gameEnvironment.viewBoxTop);
        
        this.godPlanet = new SpaceObject(
            new Vector({x:-20,y:-20}), 
            new Vector(), 
            new Vector(1,0),
            .3, 
            undefined, 
            "../resources/gravityPlanet07.png" 
        )
        this.objectMap.set('godPlanet', this.godPlanet);
        
        this.dogPlanet = new SpaceObject(
        new Vector({x:-20,y:-20}),
        new Vector(),
        new Vector(1,0),
        1,
        undefined,
        "../resources/gravityPlanet06.png"
        )
        //this.godPlanet.setImageWidth(300); // is undefined by default
        this.dogPlanet.mass = 20;
        this.dogPlanet.scale(0);
        
        this.objectMap.set("dogPlanet", this.dogPlanet);

        this.dogPlanet.rotationPivot = this.godPlanet.position.toPoint();

        this.rocket = new RainbowRocket();
        this.rocket.position = new Vector ({x: -300, y:300})
        this.rocket.direction = new Vector({x:1, y:-1})
        this.rocket.scale(5);

        this.objectMap.set('rokkett', this.rocket);
    
        setTimeout(()=> {
            for(let i: number = 0; i<200; i++){
                setTimeout(() =>{
                    this.dogPlanet.scale(i/199);
                },i*100);
            }
        },1000);

        setTimeout(() => {
            for(let i:number = 0; i<20; i++){
                setTimeout(() =>{
                this.dogPlanet.accelerate(Math.pow(i/2,2)/500);
                },i*100);
            }

        }, 13000); // miliseconds

        /*  
        for (i: number = 0; i<3; i++){
            this.gameEnvironment.showMessage(i);

        }
            krass, die Rakete erreicht ein unglaublich großes Etwas. 
            Commander, das sieht aus, wie ein scharzes Loch. 
            Commander, das schware Loch kippt um! Ich glaube, es spuckt etwas aus. Das ist ja unglaublich, es ist ein unglaublich 
            massereiches Element. Das müssen wir einfangen und wieder zurück bringen! Vielleicht können wir ein Wurmloch erzeugen und 
            so zu der Station auf der anderen Seite der Galaxis gelangen.
            Auf gehts, Commander!

        */
    }

    private gameLoop(){
        requestAnimationFrame(() => this.gameLoop());
        this.rocket.handleKeyboardInput(this.gameEnvironment.keyBoardController.getKeysPressed())
    //    this.background.refresh(this.objectMap);
        this.updateElements();
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
        this.gameEnvironment.setLabel1("xPosition: "+this.rocket.position.x.toFixed(2).toString())
        this.gameEnvironment.setLabel2(`yPosition: ${this.rocket.position.y.toFixed(2)}`) //Die Verwendung von Backticks (`) anstelle von einfachen oder doppelten Anführungszeichen ermöglicht die direkte Einfügung von JavaScript-Ausdrücken innerhalb der Zeichenkette. Beide Methoden erreichen dasselbe Ziel, aber der zweite Ausdruck mit Template Literal ist in der Regel leserlicher und einfacher zu handhaben, besonders wenn komplexe Ausdrücke oder mehrere Variablen eingefügt werden müssen. Template Literals bieten auch eine verbesserte Lesbarkeit, da sie mehrzeilige Zeichenketten unterstützen, ohne dass Escape-Zeichen erforderlich sind.
        this.gameEnvironment.setLabel3(this.rocket.velocity.x.toFixed(2) + ', '+(this.rocket.velocity.y.toFixed(2)))
        this.gameEnvironment.setArrow1(this.rocket.velocity.angle/Math.PI*180 + 90, this.rocket.velocity.length)
        this.gameEnvironment.setLabel4((this.rocket.direction.angle/Math.PI*180).toFixed(0).toString())
        this.gameEnvironment.setArrow2(this.rocket.direction.angle/Math.PI*180 + 90, 1)
    }
}


// Initialisiere das Spiel, wenn die Seite geladen ist
window.onload = () => {
    const game = new SpaceGame061();
    game.init(); // Aufruf der init-Methode, um das Spiel zu starten
};