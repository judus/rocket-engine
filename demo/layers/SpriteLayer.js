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
            const spriteComponent = entity.getComponent(SpriteComponent);
            if(spriteComponent) {
                const spriteSheet = spriteComponent.spriteSheet;
                if(spriteSheet.isLoaded()) {
                    const frame = spriteComponent.getFrame();
                    const camera = scene.camera;
                    const zoomLevel = camera.zoomLevel;
                    const cameraPos = camera.pos;

                    const x = (entity.position.x - cameraPos.x) * zoomLevel;
                    const y = (entity.position.y - cameraPos.y) * zoomLevel;
                    const width = spriteSheet.frameWidth * zoomLevel;
                    const height = spriteSheet.frameHeight * zoomLevel;

                    this.context.drawImage(
                        spriteSheet.image,
                        frame.x, frame.y, spriteSheet.frameWidth, spriteSheet.frameHeight,
                        x, y, width, height
                    );
                } else {
                    // Retry rendering after the image has loaded
                    spriteSheet.image.onload = () => {
                        this.render(scene, deltaTime, tickCount, totalTime);
                    };
                }
            }
        });
    }
}
