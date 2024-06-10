export default class LayerManager {
    constructor(width = 800, height = 600) {
        this.layers = new Map();
        this.width = width;
        this.height = height;
    }

    addLayer(name, LayerClass) {
        const canvas = new OffscreenCanvas(this.width, this.height);
        const context = canvas.getContext('2d');
        context.imageSmoothingEnabled = false;
        const layer = new LayerClass(canvas, context);
        this.layers.set(name, layer);
    }

    getLayer(name) {
        return this.layers.get(name);
    }

    renderAll(scene, deltaTime, tickCount, totalTime) {
        this.layers.forEach(layer => layer.render(scene, deltaTime, tickCount, totalTime));
    }

    clearAll() {
        this.layers.forEach(layer => layer.clear());
    }
}
