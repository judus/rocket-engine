import BaseComponent from "../../abstracts/BaseComponent.js";
import SpriteComponent from "../../sprites/SpriteComponent.js";

export default class SpriteQueueComponent extends BaseComponent {
    constructor(spriteDefinitions = []) {
        super();
        this.spriteDefinitions = spriteDefinitions;
        this.renderQueue = [];
        this.compiledSprite = null;
        this.compiledSpriteWidth = 0;
        this.compiledSpriteHeight = 0;
        this.scale = 1;
    }

    onAdd(entity) {
        this.entity = entity;
        this.buildRenderQueue();
        this.compileSprites();
    }

    buildRenderQueue() {
        this.renderQueue = [];

        // Add ship's sprites
        this.spriteDefinitions.forEach((spriteDefinition, index) => {
            const spriteComponent = new SpriteComponent(
                spriteDefinition, 0, spriteDefinition.renderOrder
            );
            spriteComponent.onAdd(this.entity);
            this.renderQueue.push({spriteComponent, renderOrder: spriteDefinition.renderOrder});

            // Set the scale based on the first sprite definition
            if(index === 0) {
                this.scale = spriteComponent.spriteSheet.initialScale || 1;
            }
        });

        // Add children's sprites
        this.entity.children.forEach(child => {
            child.hasComponent('sprite', component => {
                this.renderQueue.push({spriteComponent: component, renderOrder: component.renderOrder});
            });
        });

        this.renderQueue.sort((a, b) => a.renderOrder - b.renderOrder);
    }

    updateRenderQueue() {
        this.buildRenderQueue();
        this.compileSprites();
    }

    compileSprites() {
        if(this.renderQueue.length === 0) return;

        // Determine the size of the compiled sprite
        const {width, height, offsetX, offsetY} = this.calculateSpriteDimensions();
        this.compiledSpriteWidth = width;
        this.compiledSpriteHeight = height;

        // Check if the dimensions are valid
        if(width <= 0 || height <= 0) {
            console.error(`Invalid canvas dimensions: width=${width}, height=${height}`);
            return;
        }

        const offscreenCanvas = new OffscreenCanvas(width, height);
        const context = offscreenCanvas.getContext('2d');


        this.renderQueue.forEach(({spriteComponent}) => {
            if(spriteComponent.compile) {
                this.renderToContext(spriteComponent, context, offsetX, offsetY);
            }
        });

        try {
            this.compiledSprite = offscreenCanvas.transferToImageBitmap();
            console.log('Successfully created compiled sprite.');
        } catch(error) {
            console.error('Error creating ImageBitmap:', error);
            console.error(`Canvas dimensions: width=${width}, height=${height}`);
        }
    }

    calculateSpriteDimensions() {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        this.renderQueue.forEach(({spriteComponent}) => {
            if(spriteComponent.compile) {
                const spriteSheet = spriteComponent.spriteSheet;
                if(spriteSheet && spriteSheet.isLoaded()) {
                    const frameWidth = spriteSheet.frameWidth;
                    const frameHeight = spriteSheet.frameHeight;

                    const entityPos = spriteComponent.entity.pos;
                    const halfWidth = frameWidth / 2;
                    const halfHeight = frameHeight / 2;

                    const left = entityPos.x / this.scale - halfWidth;
                    const right = entityPos.x / this.scale + halfWidth;
                    const top = entityPos.y / this.scale - halfHeight;
                    const bottom = entityPos.y / this.scale + halfHeight;

                    if(left < minX) minX = left;
                    if(right > maxX) maxX = right;
                    if(top < minY) minY = top;
                    if(bottom > maxY) maxY = bottom;
                }
            }
        });

        // Calculate dimensions with some buffer
        const width = Math.ceil(maxX - minX);
        const height = Math.ceil(maxY - minY);

        // Calculate offset to center the sprites
        const offsetX = -minX;
        const offsetY = -minY;

        return {
            width: Math.max(width, 1),  // Ensure at least 1px to avoid zero dimension issues
            height: Math.max(height, 1), // Ensure at least 1px to avoid zero dimension issues
            offsetX,
            offsetY
        };
    }

    renderToContext(spriteComponent, context, offsetX, offsetY) {
        const spriteSheet = spriteComponent.spriteSheet;
        if(spriteSheet && spriteSheet.isLoaded()) {
            const frame = spriteComponent.getFrame();

            if(!frame) {
                console.error(`Frame at index ${spriteComponent.frameIndex} is undefined`);
                return;
            }

            const drawX = spriteComponent.entity.pos.x / this.scale + offsetX;
            const drawY = spriteComponent.entity.pos.y / this.scale + offsetY;

            context.save();
            context.translate(drawX, drawY);
            context.rotate(spriteComponent.entity.rotation);

            context.drawImage(
                spriteSheet.imageBitmap,
                frame.x, frame.y, spriteSheet.frameWidth, spriteSheet.frameHeight,
                -spriteSheet.frameWidth / 2, -spriteSheet.frameHeight / 2,
                spriteSheet.frameWidth, spriteSheet.frameHeight
            );

            context.restore();
        } else {
            console.error('Sprite sheet is not loaded or sprite sheet not defined.');
        }
    }

    render(deltaTime, context, entity, camera) {
        if(this.compiledSprite) {
            this.renderCompiledSprite(context, entity, camera);
        }

        // Render non-compiled sprites
        this.renderQueue.forEach(({spriteComponent}) => {
            if(!spriteComponent.compile) {
                spriteComponent.render(deltaTime, context, spriteComponent.entity, camera);
            }
        });
    }

    renderCompiledSprite(context, entity, camera) {
        const zoomLevel = camera.zoomLevel;
        const cameraPos = camera.pos;
        const scale = entity.scale || 1;

        const drawX = (entity.pos.x - cameraPos.x) * zoomLevel;
        const drawY = (entity.pos.y - cameraPos.y) * zoomLevel;

        context.save();
        context.translate(drawX, drawY);
        context.rotate(entity.rotation);
        context.scale(zoomLevel * this.scale, zoomLevel * this.scale);

        context.drawImage(
            this.compiledSprite,
            -this.compiledSpriteWidth / 2, -this.compiledSpriteHeight / 2,
            this.compiledSpriteWidth, this.compiledSpriteHeight
        );

        context.restore();
    }
}
