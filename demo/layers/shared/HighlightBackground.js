import BaseLayer from "../../../engine/src/scenes/BaseLayer.js";

export default class HighlightBackground extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    getEntities(scene) {
        return scene.dataStoreManager.getStore('entities').getEntitiesInArea(scene.camera.getArea());
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();
        this.getEntities(scene).forEach(entity => {
            if(entity.getComponent) {
                const component = entity.getComponent('highlight');
                if(component) {
                    component.render(deltaTime, this.context, scene.camera);
                }
            }
        });
    }
}
