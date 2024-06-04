import BaseComponent from "../abstracts/BaseComponent.js";

export default class SpriteComponent extends BaseComponent {
    constructor(spriteSheet, frameIndex = 0) {
        super();
        this.spriteSheet = spriteSheet;
        this.frameIndex = frameIndex;
    }

    setFrame(index) {
        this.frameIndex = index;
    }

    getFrame() {
        return this.spriteSheet.getFrame(this.frameIndex);
    }

    render(deltaTime, context, entity, camera) {
        this.renderSprite(deltaTime, context, entity, camera);
        this.renderChildren(deltaTime, context, entity, camera);
    }

    renderSprite(deltaTime, context, entity, camera) {
        const spriteSheet = this.spriteSheet;
        if(spriteSheet && spriteSheet.isLoaded) {

            const frame = this.getFrame();
            const zoomLevel = camera.zoomLevel;
            const cameraPos = camera.pos;

            // Calculate draw position
            const drawX = (entity.pos.x - cameraPos.x) * zoomLevel;
            const drawY = (entity.pos.y - cameraPos.y) * zoomLevel;

            const width = spriteSheet.frameWidth * zoomLevel;
            const height = spriteSheet.frameHeight * zoomLevel;

            // Save context state
            context.save();

            // Translate to the entity's position
            context.translate(drawX, drawY);

            // Rotate the context
            context.rotate(entity.rotation);

            // Draw the sprite centered on the entity's position
            context.drawImage(
                spriteSheet.imageBitmap,
                frame.x, frame.y, spriteSheet.frameWidth, spriteSheet.frameHeight,
                -width / 2, -height / 2, width, height
            );

            // Restore context state
            context.restore();
        }
    }

    renderChildren(deltaTime, context, entity, camera) {
        entity.children.forEach(child => {
            child.hasComponent('sprite', (component) => {
                component.render(deltaTime, context, child, camera);
            });
        });
    }
}
