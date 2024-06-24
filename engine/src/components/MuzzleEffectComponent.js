import BaseComponent from "./BaseComponent.js";
import Vector3D from "../utils/maths/Vector3D.js";

export default class MuzzleEffectComponent extends BaseComponent {
    constructor(effectDefinition, muzzleOffset, initialRotation, parentEntity) {
        super();
        this.effectDefinition = effectDefinition;
        this.spriteSheet = null;
        this.frameIndex = 0;
        this.frameRate = effectDefinition.frameRate || 10;
        this.elapsedTime = 0;
        this.scale = effectDefinition.scale || 1;
        this.finished = true; // Start as finished to not play immediately
        this.muzzleOffset = muzzleOffset;
        this.absolutePosition = parentEntity && parentEntity.pos ? parentEntity.pos.clone().add(this.muzzleOffset) : new Vector3D(0, 0, 0);
        this.rotation = initialRotation;
        this.parentEntity = parentEntity;
    }

    onAdd(entity) {
        super.onAdd(entity);
        this.spriteSheet = entity.engine.spriteSheetManager().getSpriteSheet(this.effectDefinition.name);
    }

    play() {
        this.frameIndex = 0;
        this.elapsedTime = 0;
        this.finished = false;
    }

    update(deltaTime) {
        if(this.finished) return;

        this.elapsedTime += deltaTime;

        // Update the absolute position based on the parent's position and rotation
        if(this.parentEntity && this.parentEntity.pos) {
            const direction = new Vector3D(Math.cos(this.parentEntity.rotation), Math.sin(this.parentEntity.rotation));
            const offset = direction.multiply(this.muzzleOffset.x).add(new Vector3D(-direction.y, direction.x).multiply(this.muzzleOffset.y));
            this.absolutePosition = this.parentEntity.pos.clone().add(offset);
        }

        if(this.elapsedTime >= 1 / this.frameRate) {
            this.frameIndex++;
            this.elapsedTime = 0;

            if(this.frameIndex >= this.effectDefinition.frames) {
                this.finished = true;
            }
        }
    }

    render(deltaTime, context, entity, camera) {
        if(this.finished) return;

        const spriteSheet = this.spriteSheet;
        if(spriteSheet && spriteSheet.isLoaded() && this.absolutePosition) {
            const zoomLevel = camera.zoomLevel;
            const frame = spriteSheet.getFrame(this.frameIndex);

            if(!frame) {
                console.error(`Frame at index ${this.frameIndex} is undefined`);
                return;
            }

            const cameraPos = camera.pos;

            // Use the absolute position for rendering
            const drawX = (this.absolutePosition.x - cameraPos.x) * zoomLevel;
            const drawY = (this.absolutePosition.y - cameraPos.y) * zoomLevel;

            const width = spriteSheet.frameWidth * this.scale * zoomLevel;
            const height = spriteSheet.frameHeight * this.scale * zoomLevel;

            context.save();
            context.translate(drawX, drawY);
            context.rotate(this.rotation); // Rotate only by the muzzle flash's own rotation
            context.drawImage(
                spriteSheet.imageBitmap,
                frame.x, frame.y, spriteSheet.frameWidth, spriteSheet.frameHeight,
                -width / 2, -height / 2, width, height
            );
            context.restore();
        } else {
            console.error('Sprite sheet is not loaded or sprite sheet not defined, or absolute position is not available.');
        }
    }
}
