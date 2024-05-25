export default class BaseLayer {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.lazy = false;
    }

    getEntities(scene) {
        return []; // Fetch entities for this layer
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();

        const camera = scene.camera;
        this.getEntities(scene).forEach(entity => {
            const renderComponent = entity.getComponent('render');
            if(renderComponent) {
                renderComponent.render(deltaTime, this.context, scene.camera);
            }
        });
    }
}
