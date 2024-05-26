import BaseComponent from "../abstracts/BaseComponent.js";

export default class RenderComponent extends BaseComponent {
    /**
     * RenderComponent constructor.
     * @param {Function} renderFunction - The function to execute during rendering.
     * @param drawBoundingBoxes
     */
    constructor(renderFunction, drawBoundingBoxes = false) {
        super();
        this.renderFunction = renderFunction;
        this.drawBoundingBoxes = drawBoundingBoxes;
    }

    /**
     * Renders the entity using the provided render function.
     * @param {number} deltaTime - The time elapsed since the last render.
     * @param {CanvasRenderingContext2D} context - The rendering context.
     * @param {Camera} camera - The camera to render relative to.
     */
    render(deltaTime, context, camera) {
        if(this.renderFunction) {
            this.renderFunction(deltaTime, context, this.entity, camera);
        }
        if(this.drawBoundingBoxes) {
            this.drawDebugBoundingBoxes(context, camera);
        }
    }

    /**
     * Optional update method override.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        // Logic to update render component each frame (if needed)
    }

    /**
     * Optional method to handle messages, can be overridden by subclasses.
     * @param {string} message - The message to handle.
     * @param {Object} data - The data associated with the message.
     */
    receiveMessage(message, data) {
        // Logic to handle messages sent to the component (if needed)
    }

    /**
     * Called when the component is added to an entity.
     */
    onAdd(entity) {
        // Logic to execute when the component is added to an entity
        this.entity = entity || null;
    }

    /**
     * Called when the component is removed from an entity.
     */
    onRemove() {
        // Logic to execute when the component is removed from an entity
    }

    drawDebugBoundingBoxes(context, camera) {
        const boundingBoxComponent = this.entity.getComponent('boundingBox');
        const transformComponent = this.entity.getComponent('transform');

        if(boundingBoxComponent && transformComponent) {
            const bounds = boundingBoxComponent.getBounds(this.entity.pos, this.entity.rotation);

            for(const bound of bounds) {
                context.save();
                context.strokeStyle = 'lime';
                context.lineWidth = 1;
                context.strokeRect(
                    (bound.left - camera.pos.x) * camera.zoomLevel,
                    (bound.top - camera.pos.y) * camera.zoomLevel,
                    (bound.right - bound.left) * camera.zoomLevel,
                    (bound.bottom - bound.top) * camera.zoomLevel
                );
                context.restore();
            }
        }
    }
}
