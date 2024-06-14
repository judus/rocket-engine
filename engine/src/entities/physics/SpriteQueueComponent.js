import BaseComponent from "../../abstracts/BaseComponent.js";
import SpriteComponent from "../../sprites/SpriteComponent.js";

export default class SpriteQueueComponent extends BaseComponent {
    constructor(spriteDefinitions = []) {
        super();
        this.spriteDefinitions = spriteDefinitions;
        this.renderQueue = [];
    }

    onAdd(entity) {
        this.entity = entity;
        this.buildRenderQueue();
    }

    buildRenderQueue() {
        this.renderQueue = [];

        // Add ship's sprites
        this.spriteDefinitions.forEach(spriteDefinition => {
            const spriteComponent = new SpriteComponent(spriteDefinition, 0, spriteDefinition.renderOrder);
            spriteComponent.onAdd(this.entity);
            this.renderQueue.push({spriteComponent, renderOrder: spriteDefinition.renderOrder});
        });

        // Add children's sprites
        this.entity.children.forEach(child => {
            child.hasComponent('sprite', component => {
                this.renderQueue.push({spriteComponent: component, renderOrder: component.renderOrder});
            });
        });

        // Sort render queue by render order
        this.renderQueue.sort((a, b) => a.renderOrder - b.renderOrder);
    }

    updateRenderQueue() {
        this.buildRenderQueue();
    }

    render(deltaTime, context, entity, camera) {
        this.renderQueue.forEach(({spriteComponent}) => {
            spriteComponent.render(deltaTime, context, spriteComponent.entity, camera);
        });
    }
}
