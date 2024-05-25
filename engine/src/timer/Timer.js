import PerformanceMonitor from './PerformanceMonitor.js';

export default class Timer {
    constructor(fps = 60, showPerformanceMonitor = false) {
        this.fps = fps;
        this.deltaTime = 1 / this.fps;
        this.frameId = null;
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.tickCount = 0;
        this.showPerformanceMonitor = showPerformanceMonitor;

        if(this.showPerformanceMonitor) {
            this.performanceMonitor = new PerformanceMonitor(); // Instantiate performance monitor if flag is true
        }
    }

    tick = (currentTime) => {
        if(!this.lastTime) this.lastTime = currentTime;

        const elapsedTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.accumulatedTime += elapsedTime;

        // Prevent excessive accumulation of time
        const maxAccumulatedTime = this.deltaTime * 10; // e.g., limit to 10 frames worth
        if(this.accumulatedTime > maxAccumulatedTime) {
            this.accumulatedTime = maxAccumulatedTime;
        }

        // Ensure the scenes update runs at a fixed timestep
        while(this.accumulatedTime >= this.deltaTime) {
            if(this.showPerformanceMonitor) {
                this.performanceMonitor.startTimer('update');
            }
            this.updateCallback(this.deltaTime, this.tickCount, currentTime);
            if(this.showPerformanceMonitor) {
                this.performanceMonitor.stopTimer('update');
            }
            this.accumulatedTime -= this.deltaTime;
            this.tickCount++;
        }

        if(this.showPerformanceMonitor) {
            this.performanceMonitor.startTimer('render');
        }
        // Render with the interpolated state for smooth visuals
        this.renderCallback(this.accumulatedTime / this.deltaTime, this.tickCount, currentTime);
        if(this.showPerformanceMonitor) {
            this.performanceMonitor.stopTimer('render');
        }

        if(this.showPerformanceMonitor) {
            this.performanceMonitor.incrementFrame();
        }
        this.frameId = requestAnimationFrame(this.tick);
    }

    start(updateCallback, renderCallback) {
        this.updateCallback = updateCallback;
        this.renderCallback = renderCallback;
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.tickCount = 0;
        this.frameId = requestAnimationFrame(this.tick);
    }

    stop() {
        cancelAnimationFrame(this.frameId);
        this.lastTime = 0;
        this.accumulatedTime = 0;
        this.tickCount = 0;
    }
}
