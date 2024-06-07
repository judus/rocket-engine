import BaseLayer from "../../engine/src/scenes/BaseLayer.js";
import EngineParts from "../../engine/src/EngineParts.js";

export default class PolygonLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    getEntities(scene) {
        return scene.dataStoreManager.getStore('entities').getEntitiesInArea(scene.camera.getArea());
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();
        this.getEntities(scene).forEach(entity => {
            entity.hasComponent('render', (component) => {
                component.render(deltaTime, this.context, scene.camera);
            });
            entity.hasComponent('collision', (component) => {
                component.render(this.context, scene.camera);
            });
        });
    }
}
