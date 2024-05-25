// PerformanceMonitorUI.js
export default class PerformanceMonitorUI {
    constructor() {
        this.createUI();
    }

    createUI() {
        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.top = '10px';
        this.container.style.left = '10px';
        this.container.style.zIndex = '1000';
        this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.container.style.color = 'white';
        this.container.style.padding = '10px';
        this.container.style.fontFamily = 'monospace';
        this.container.style.fontSize = '12px';

        this.fpsElement = document.createElement('div');
        this.updateTimeElement = document.createElement('div');
        this.renderTimeElement = document.createElement('div');

        this.container.appendChild(this.fpsElement);
        this.container.appendChild(this.updateTimeElement);
        this.container.appendChild(this.renderTimeElement);

        document.body.appendChild(this.container);
    }

    update(metrics) {
        // Ensure values are defined before calling toFixed
        const getFormattedTime = (time) => (typeof time === 'number' ? time.toFixed(2) : 'N/A');

        const updateTime = metrics.update ? metrics.update.averageTime : null;
        const renderTime = metrics.render ? metrics.render.averageTime : null;
        const theoreticalFps = updateTime && renderTime ? 1000 / (updateTime + renderTime) : null;

        this.fpsElement.textContent = `FPS: ${getFormattedTime(metrics.fps ? metrics.fps.averageTime : null)} (${theoreticalFps ? theoreticalFps.toFixed(2) : 'N/A'})`;
        this.updateTimeElement.textContent = `Update Time: ${getFormattedTime(metrics.update ? metrics.update.averageTime : null)} ms`;
        this.renderTimeElement.textContent = `Render Time: ${getFormattedTime(metrics.render ? metrics.render.averageTime : null)} ms`;
    }
}
