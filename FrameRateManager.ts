class FrameRateManager {
    private frameCount: number;
    private lastFrameTime: number;
    private averageFrameTime: number;
    private fps: number;

    constructor() {
        this.frameCount = 0;
        this.lastFrameTime = performance.now();
        this.averageFrameTime = 0;
        this.fps = 60;
        
    }

    public update(): void {
        const currentTime = performance.now();
        const elapsed = currentTime - this.lastFrameTime;
        

        if (elapsed > 1000) { // Berechne FPS alle Sekunde
            this.fps = Math.round(this.frameCount / (elapsed / 1000));
            this.averageFrameTime = elapsed / this.frameCount;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
            
        }

        this.frameCount++;
    }

    public getFPS(): number {
        return this.fps;
    }

    public getAverageFrameTime(): number {
        return this.averageFrameTime;
    }
}



