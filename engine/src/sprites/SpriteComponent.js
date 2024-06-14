import BaseComponent from "../abstracts/BaseComponent.js";

export default class SpriteComponent extends BaseComponent {
    constructor(spriteDefinition, frameIndex = 0, renderOrder = 0) {
        super();
        this.spriteDefinition = spriteDefinition;
        this.spriteSheet = null;
        this.frameIndex = frameIndex;
        this.renderOrder = renderOrder;
        this.compile = spriteDefinition.static || true;
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
}
