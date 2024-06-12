import BaseComponent from "../../abstracts/BaseComponent.js";

export default class QueueableSpriteComponent extends BaseComponent {
    constructor(spriteDefinition, frameIndex = 0, renderOrder = 0) {
        super();
        this.spriteDefinition = spriteDefinition;
        this.spriteSheet = null;
        this.frameIndex = frameIndex;
        this.renderOrder = renderOrder;
    }

    onAdd(entity) {
        super.onAdd(entity);
        this.spriteSheet = entity.engine.spriteSheetManager().getSpriteSheet(this.spriteDefinition.name);
    }

    setFrame(index) {
        this.frameIndex = index;
    }

    getFrame() {
        return this.spriteSheet.getFrame(this.frameIndex);
    }

    render(deltaTime, context, entity, camera) {
        // This method can be empty or log rendering for debugging purposes
        console.log(`Rendering sprite with render order: ${this.renderOrder}`);
    }
}
