import BaseLayer from "../../engine/src/scenes/BaseLayer.js";

export default class ExampleLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    getEntities(scene) {
        return scene.engine.service('entityManager').getEntitiesByType('exampleType');
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();

        // Set a background color
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const camera = scene.camera;

        this.getEntities(scene).forEach(entity => {
            const renderComponent = entity.getComponent('render');
            if(renderComponent) {
                renderComponent.render(deltaTime, this.context, camera);
            }
        });
    }
}
