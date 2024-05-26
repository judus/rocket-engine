import BaseLayer from "../../engine/src/scenes/BaseLayer.js";

export default class ExampleLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    getEntities(scene) {
        return scene.dataStoreManager.getStore('entities').getEntitiesInArea(scene.camera.getArea());
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();
        this.getEntities(scene).forEach(entity => {
            if (entity.getComponent) {
                const renderComponent = entity.getComponent('render');
                if(renderComponent) {
                    renderComponent.render(deltaTime, this.context, scene.camera);
                }
            }
        });
    }
}
