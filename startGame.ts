
const idInputElement = document.getElementById('rocketId')! as HTMLInputElement;
const colorSelector = document.getElementById(`colorSelector`)! as HTMLSelectElement;
const styleSelector = document.getElementById(`styleSelector`)! as HTMLSelectElement;
    //Diese Funktion gehört in den gameLoop, die Position der Rakten verändert sich fortlaufend!
    // Definieren Sie eine Funktion, die eine Anfrage an den Server stellt
    async function sendRocketStatus() {
        // Die URL Ihres Servers
        const url = 'http://localhost:8080/api/main/SynchronizeRocket';

        
// Die Daten, die an den Server gesendet werden sollen        
        const data = {
            rocketStatus: {
                rocketId: idInputElement.value,
                rocketColor: colorSelector.value,
                rocketStyle: styleSelector.value,
                position: {
                    x: 200,
                    y: 300
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
            mode: 'no-cors' // Setzen Sie den Modus auf 'no-cors'
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
    rocketPreviewElement.appendChild(Spacecraft.getCraftSvg(styleSelector.value))
    // Event Listener für den Start-Button hinzufügen
    // Nach Start Alle 100 Millisekunden eine Anfrage an den Server stellen
    document.getElementById('startButton')!.addEventListener('click', () =>{
        // Starten Sie das Spiel
        // sendRocketStatus();

        // Verbergen Sie die Startseite
        document.getElementById('startPage')!.style.display = 'none';

        // Einbinden der neuen CSS-Datei
        const newCssLink = document.createElement('link');
        newCssLink.rel = 'stylesheet';
        newCssLink.href = 'styles.css'; // Pfad zu Ihrer neuen CSS-Datei
        document.head.appendChild(newCssLink);

        // Entfernen Sie das "startGame.js" Script
        // removeScript('startGame.js');

        // Einbinden der neuen JavaScript-Dateien
        const scriptUrls = ['Vector.js', 
                            'KeyboardController.js', 
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

        // Zeigen Sie die Spielseite an
        document.getElementById('gamePage')!.style.display = 'block';

        // Alle 100 Millisekunden eine Anfrage an den Server stellen
        //setInterval(sendRocketStatus, 100)
    });
