/*Um neben dem HTMLSelect-Element ein Vorschaufenster mit dem Raketentyp zu zeigen importiere ich die Klasse SpaceCraft und exportiere 
const typeSelector = document.getElementById(`typeSelector`)! as HTMLSelectElement, um den Typeselector global zu nutzen. 
Zum Beispiel um in SpaceCraft die Typbezogenen SVG-Elemente zu erzeugen. 
*/
import { Spacecraft } from "./Spacecraft.js";

export const typeSelector = document.getElementById(`typeSelector`)! as HTMLSelectElement;
export const colorSelector = document.getElementById(`colorSelector`)! as HTMLSelectElement;
export const idInputElement = document.getElementById('rocketId')! as HTMLInputElement;
    
    // Funktion zum Entfernen eines JavaScript-Scripts
    function removeScript(scriptName: string) {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            if (script.src.includes(scriptName)) {
                script.parentNode!.removeChild(script);
                break; // Brechen Sie die Schleife ab, sobald das Script gefunden und entfernt wurde
            }
        }
    }

    const rocketPreviewElement = document.createElementNS("http://www.w3.org/2000/svg", "svg") as SVGSVGElement
    rocketPreviewElement.setAttribute("style", "border: 2px solid brown")
    rocketPreviewElement.setAttribute("viewBox","-50,-50,100,100")
    
    document.getElementById("startPage")!.appendChild(rocketPreviewElement)
    //rocketPreviewElement.appendChild(Spacecraft.getCraftGElement(typeSelector.value))
    rocketPreviewElement.appendChild(Spacecraft.getCraftGElement(typeSelector.value))
    console.log(typeSelector.value)
    
    typeSelector.addEventListener(`change`, () =>{
        
        rocketPreviewElement.appendChild(Spacecraft.getCraftGElement(typeSelector.value))
    })

    // Event Listener für den Start-Button hinzufügen
    // Nach Start Alle 100 Millisekunden eine Anfrage an den Server stellen
    document.getElementById("button")?.addEventListener("click", startSpaceGame);
    // Starten Sie das Spiel
    // sendRocketStatus();
    


    async function startSpaceGame()  {
        let lib = await import("./library.js");
        // Zeigen Sie die Spielseite an
        document.getElementById('gamePage')!.style.display = 'block';
        console.log("gamepage shown")
        // Verbergen Sie die Startseite
        document.getElementById('startPage')!.style.display = 'none';
    }
    

    // Einbinden der neuen CSS-Datei
    /*const newCssLink = document.createElement('link');
    newCssLink.rel = 'stylesheet';
    newCssLink.href = 'styles.css'; // Pfad zu Ihrer neuen CSS-Datei
    document.head.appendChild(newCssLink);
        */
    // Entfernen Sie das "startGame.js" Script
    //removeScript('startGame.js');

    /* Einbinden der neuen JavaScript-Dateien
    const scriptUrls = ['   ', 
                        's', 
                        `SpaceObject.js`, 
                        `RainbowRocket.js`, 
                        `GameEnvironment.js`, 
                        `FrameRateManager.js`, 
                        `SpaceGame.js`]; // Array mit den Pfaden zu den neuen JavaScript-Dateien
    scriptUrls.forEach(url => {
        const script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    });
*/
    

    // Alle 100 Millisekunden eine Anfrage an den Server stellen
    //setInterval(sendRocketStatus, 100)

