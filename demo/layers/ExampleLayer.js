import BaseLayer from "../../engine/src/scenes/BaseLayer.js";

export default class ExampleLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    getEntities(scene) {
        // Return entities to render for this layer
        return scene.engine.service('entityManager').getEntitiesByType('exampleType');
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();

        // Set a background color
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw a simple rectangle
        this.context.fillStyle = '#FF9900';
        this.context.fillRect(50, 50, 100, 100);

        // Draw a simple circle
        this.context.beginPath();
        this.context.arc(200, 200, 50, 0, 2 * Math.PI, false);
        this.context.fillStyle = '#0099FF';
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = '#003300';
        this.context.stroke();

        const camera = scene.camera;

        this.getEntities(scene).forEach(entity => {
            const renderComponent = entity.getComponent('render');
            const positionComponent = entity.getComponent('position');
            if(renderComponent && positionComponent) {
                this.context.drawImage(
                    renderComponent.sprite,
                    positionComponent.x - camera.pos.x,
                    positionComponent.y - camera.pos.y
                );
            }
        });
    }
}
