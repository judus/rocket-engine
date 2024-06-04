import BaseLayer from "../../engine/src/scenes/BaseLayer.js";
import SpriteComponent from "../../engine/src/sprites/SpriteComponent.js";

export default class SpriteLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
        this.entities = [];
    }

    getEntities(scene) {
        if (this.entities.length === 0) {
            this.entities = scene.dataStoreManager.getStore('entities').getEntitiesInArea(scene.camera.getArea());
        }
        return this.entities;
    }

    render(scene, deltaTime, tickCount, totalTime) {


        this.clear();
        this.getEntities(scene).forEach(entity => {
            entity.hasComponent('sprite', (component) => {
                component.render(deltaTime, this.context, entity, scene.camera);
            });
        });
    }
}
