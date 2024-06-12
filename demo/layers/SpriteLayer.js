import BaseLayer from "../../engine/src/scenes/BaseLayer.js";
import SpriteComponent from "../../engine/src/sprites/SpriteComponent.js";

export default class SpriteLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.entities = [];
    }

    getEntities(scene) {
        return scene.dataStoreManager.getStore('entities').getEntitiesInArea(scene.camera.getArea());
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();
        this.getEntities(scene).forEach(entity => {
            entity.hasComponent('spriteQueue', (component) => {
                component.render(deltaTime, this.context, entity, scene.camera);
            });
            entity.hasComponent('sprite', (component) => {
                component.render(deltaTime, this.context, entity, scene.camera);
            });
        });
    }
}