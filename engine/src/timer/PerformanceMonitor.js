// PerformanceMonitor.js
import PerformanceMonitorUI from "./PerformanceMonitorUI.js";

export default class PerformanceMonitor {
    constructor(logFrequency = 60) {
        this.timers = new Map();
        this.logFrequency = logFrequency;
        this.ui = new PerformanceMonitorUI();
        this.lastLogTime = performance.now();
        this.totalFrames = 0;
        this.fps = 0;
    }

    startTimer(name) {
        if(!this.timers.has(name)) {
            this.timers.set(name, {
                totalLoops: 0,
                totalTime: 0,
                averageTime: 0,
                startTime: 0,
            });
        }
        const timer = this.timers.get(name);
        timer.startTime = performance.now();
    }

    stopTimer(name) {
        if(!this.timers.has(name)) return;

        const timer = this.timers.get(name);
        const endTime = performance.now();
        const duration = endTime - timer.startTime;

        timer.totalLoops++;
        timer.totalTime += duration;
        timer.averageTime += (duration - timer.averageTime) / timer.totalLoops;

        if(timer.totalLoops % this.logFrequency === 0) {
            this.updateUI();
        }
    }

    incrementFrame() {
        this.totalFrames++;
        const currentTime = performance.now();
        const elapsedSeconds = (currentTime - this.lastLogTime) / 1000;

        if(elapsedSeconds >= 1) {
            this.fps = this.totalFrames / elapsedSeconds;
            this.totalFrames = 0;
            this.lastLogTime = currentTime;
            this.updateUI();
        }
    }

    updateUI() {
        const metrics = {};
        this.timers.forEach((timer, name) => {
            metrics[name] = timer;
        });
        metrics['fps'] = {averageTime: this.fps};

        this.ui.update(metrics);
    }

    resetTimer(name) {
        if(this.timers.has(name)) {
            this.timers.set(name, {
                totalLoops: 0,
                totalTime: 0,
                averageTime: 0,
                startTime: 0,
            });
        }
    }

    resetAllTimers() {
        this.timers.forEach((_, name) => this.resetTimer(name));
        this.totalFrames = 0;
        this.lastLogTime = performance.now();
    }
}
