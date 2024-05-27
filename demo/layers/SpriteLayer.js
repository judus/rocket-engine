import BaseLayer from "../../engine/src/scenes/BaseLayer.js";
import SpriteComponent from "../../engine/src/sprites/SpriteComponent.js";

export default class SpriteLayer extends BaseLayer {
    constructor(canvas, context) {
        super(canvas, context);
    }

    getEntities(scene) {
        return scene.dataStoreManager.getStore('entities').getEntitiesInArea(scene.camera.getArea());
    }

    render(scene, deltaTime, tickCount, totalTime) {
        this.clear();
        this.getEntities(scene).forEach(entity => {
            const spriteComponent = entity.getComponent('sprite');
            if(spriteComponent) {
                const spriteSheet = spriteComponent.spriteSheet;
                if(spriteSheet.isLoaded()) {
                    const frame = spriteComponent.getFrame();
                    const camera = scene.camera;
                    const zoomLevel = camera.zoomLevel;
                    const cameraPos = camera.pos;

                    // Calculate draw position
                    const drawX = (entity.pos.x - cameraPos.x) * zoomLevel;
                    const drawY = (entity.pos.y - cameraPos.y) * zoomLevel;

                    const width = spriteSheet.frameWidth * zoomLevel;
                    const height = spriteSheet.frameHeight * zoomLevel;

                    // Save context state
                    this.context.save();

                    // Translate to the entity's position
                    this.context.translate(drawX, drawY);

                    // Rotate the context
                    this.context.rotate(entity.rotation);

                    // Draw the sprite centered on the entity's position
                    this.context.drawImage(
                        spriteSheet.imageBitmap,
                        frame.x, frame.y, spriteSheet.frameWidth, spriteSheet.frameHeight,
                        -width / 2, -height / 2, width, height
                    );

                    // Restore context state
                    this.context.restore();
                }
            }
        });
    }
}
