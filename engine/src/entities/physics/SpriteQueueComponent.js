import BaseComponent from "../../abstracts/BaseComponent.js";
import QueueableSpriteComponent from "./QueueableSpriteComponent.js";

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
        // Clear existing queue
        this.renderQueue = [];

        // Add ship's sprites
        this.spriteDefinitions.forEach(spriteDefinition => {
            const spriteComponent = new QueueableSpriteComponent(spriteDefinition, 0, spriteDefinition.renderOrder);
            spriteComponent.onAdd(this.entity);
            this.renderQueue.push({spriteComponent, renderOrder: spriteDefinition.renderOrder});
        });

        // Add children's sprites
        this.entity.children.forEach(child => {
            child.hasComponent('queueableSprite', component => {
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
            this.renderSprite(deltaTime, context, spriteComponent, camera);
        });
    }

    renderSprite(deltaTime, context, spriteComponent, camera) {
        const spriteSheet = spriteComponent.spriteSheet;
        if(spriteSheet && spriteSheet.isLoaded()) {
            const zoomLevel = camera.zoomLevel;
            const frame = spriteComponent.getFrame();

            if(!frame) {
                console.error(`Frame at index ${spriteComponent.frameIndex} is undefined`);
                return;
            }

            const cameraPos = camera.pos;

            const drawX = (spriteComponent.entity.pos.x - cameraPos.x) * zoomLevel;
            const drawY = (spriteComponent.entity.pos.y - cameraPos.y) * zoomLevel;

            const width = spriteSheet.getScaledFrameWidth(zoomLevel);
            const height = spriteSheet.getScaledFrameHeight(zoomLevel);

            context.save();
            context.translate(drawX, drawY);
            context.rotate(spriteComponent.entity.rotation);

            context.drawImage(
                spriteSheet.imageBitmap,
                frame.x, frame.y, spriteSheet.frameWidth, spriteSheet.frameHeight,
                -width / 2, -height / 2, width, height
            );

            context.restore();
        } else {
            console.error('Sprite sheet is not loaded or sprite sheet not defined.');
        }
    }
}
