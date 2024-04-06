// Definieren Sie eine Funktion, um den Server zu kontaktieren
async function contactServer() {
    // Die URL Ihres Servers
    const url = 'http://localhost:8080/api/main/startGame';

    // Die ausgewählte Rakete und ID des Spielers
    const selectedRocket = (document.getElementById('rocketSelect') as HTMLSelectElement).value;
    const playerId = (document.getElementById('rocketId') as HTMLInputElement).value;

    // Die Daten, die an den Server gesendet werden sollen
    const data = {
        rocket: selectedRocket,
        playerId: playerId
    };

    // Konfigurieren Sie die Anfrageoptionen
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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

        // Hier können Sie die Antwort weiter verarbeiten
        console.log('Game started:', responseData);

        // Weiterleitung zur Spielseite oder andere Aktionen hier
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event Listener für den Start-Button hinzufügen
document.getElementById('startButton')!.addEventListener('click', contactServer);
