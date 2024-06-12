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
        if(spriteSheet && spriteSheet.isLoaded()) {
            const zoomLevel = camera.zoomLevel;

            const frame = this.getFrame();
            if(!frame) {
                console.error(`Frame at index ${this.frameIndex} is undefined`);
                return;
            }

            const cameraPos = camera.pos;

            const drawX = (entity.pos.x - cameraPos.x) * zoomLevel;
            const drawY = (entity.pos.y - cameraPos.y) * zoomLevel;

            const width = spriteSheet.getScaledFrameWidth(zoomLevel);
            const height = spriteSheet.getScaledFrameHeight(zoomLevel);

            context.save();
            context.translate(drawX, drawY);
            context.rotate(entity.rotation);

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

    renderChildren(deltaTime, context, entity, camera) {
        entity.children.forEach(child => {
            child.hasComponent('sprite', (component) => {
                component.render(deltaTime, context, child, camera);
            });
        });
    }
}
