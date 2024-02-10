class KeyboardController {
    private keysPressed: {[key: string]: boolean} = {};

    constructor() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        this.keysPressed[event.key] = true;
        event.preventDefault(); // Verhindert Standardverhalten
    }

    private handleKeyUp(event: KeyboardEvent): void {
        this.keysPressed[event.key] = false;
    }

    // Methode, um den Zustand einer Taste abzufragen
    public isKeyPressed(key: string): boolean {
        return this.keysPressed[key] || false;
    }

    public getKeysPressed(): {[key: string]: boolean} {
        return this.keysPressed;
    }
    // ... (Andere Methoden und Logik)
}
