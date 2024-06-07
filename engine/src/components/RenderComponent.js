import BaseComponent from "../abstracts/BaseComponent.js";
import EntityTransform from "../services/EntityTransform.js";

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
        //console.log('Rendering in RenderComponent');
        if(this.renderFunction) {
            //console.log('Executing render function');
            this.renderFunction(deltaTime, context, camera);
        }
        if(this.drawBoundingBoxes) {
            this.drawDebugPolygon(context, camera);
            this.drawDebugFramePolygons(context, camera);
            this.drawDebugBoundingBoxes(context, camera);
            this.drawDebugSubBoundingBoxes(context, camera);
            this.drawDebugQuadTree(context, camera);
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

        if(this.entity.boundingBox) {
            const {width, height} = this.entity.boundingBox;
            const vertices = [
                {x: -width / 2, y: -height / 2},
                {x: width / 2, y: -height / 2},
                {x: width / 2, y: height / 2},
                {x: -width / 2, y: height / 2}
            ];

            const transformedVertices = EntityTransform.updateVertices(this.entity, vertices);

            context.save();
            context.strokeStyle = 'rgba(132,255,24,0.8)';
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(
                (transformedVertices[0].x - camera.pos.x) * camera.zoomLevel,
                (transformedVertices[0].y - camera.pos.y) * camera.zoomLevel
            );

            for(let i = 1; i < transformedVertices.length; i++) {
                context.lineTo(
                    (transformedVertices[i].x - camera.pos.x) * camera.zoomLevel,
                    (transformedVertices[i].y - camera.pos.y) * camera.zoomLevel
                );
            }

            context.closePath();
            context.stroke();
            context.restore();
        }
    }

    drawDebugSubBoundingBoxes(context, camera) {
        if(this.entity.collisionBoxes) {
            context.save();
            context.strokeStyle = '#00c4ff';
            context.lineWidth = 1;

            for(const subBox of this.entity.collisionBoxes) {
                const vertices = [
                    {x: subBox.x - subBox.width / 2, y: subBox.y - subBox.height / 2},
                    {x: subBox.x + subBox.width / 2, y: subBox.y - subBox.height / 2},
                    {x: subBox.x + subBox.width / 2, y: subBox.y + subBox.height / 2},
                    {x: subBox.x - subBox.width / 2, y: subBox.y + subBox.height / 2}
                ];

                const transformedVertices = EntityTransform.updateVertices(this.entity, vertices);

                context.beginPath();
                context.moveTo(
                    (transformedVertices[0].x - camera.pos.x) * camera.zoomLevel,
                    (transformedVertices[0].y - camera.pos.y) * camera.zoomLevel
                );

                for(let i = 1; i < transformedVertices.length; i++) {
                    context.lineTo(
                        (transformedVertices[i].x - camera.pos.x) * camera.zoomLevel,
                        (transformedVertices[i].y - camera.pos.y) * camera.zoomLevel
                    );
                }

                context.closePath();
                context.stroke();
            }

            context.restore();
        }
    }

    drawDebugPolygon(context, camera) {

        if(this.entity.polygon) {
            const transformedVertices = EntityTransform.updateVertices(this.entity, this.entity.polygon);

            context.save();
            context.strokeStyle = 'red';
            context.lineWidth = 1;
            context.beginPath();

            context.moveTo(
                (transformedVertices[0].x - camera.pos.x) * camera.zoomLevel,
                (transformedVertices[0].y - camera.pos.y) * camera.zoomLevel
            );

            for(let i = 1; i < transformedVertices.length; i++) {
                context.lineTo(
                    (transformedVertices[i].x - camera.pos.x) * camera.zoomLevel,
                    (transformedVertices[i].y - camera.pos.y) * camera.zoomLevel
                );
            }

            context.closePath();
            context.stroke();
            context.restore();
        }
    }

    drawDebugFramePolygons(context, camera) {

        // if(this.entity.frames) {
        //     context.save();
        //     context.strokeStyle = 'yellow';
        //     context.fillStyle = 'rgba(255, 255, 0, 0.5)'; // Semi-transparent yellow
        //     context.lineWidth = 1;
        //
        //     for(const framePolygon of this.entity.frames) {
        //         if(framePolygon.length > 0) {
        //             const transformedVertices = EntityTransform.updateVertices(this.entity, framePolygon);
        //
        //             context.beginPath();
        //             context.moveTo(
        //                 (transformedVertices[0].x - camera.pos.x) * camera.zoomLevel,
        //                 (transformedVertices[0].y - camera.pos.y) * camera.zoomLevel
        //             );
        //
        //             for(let i = 1; i < transformedVertices.length; i++) {
        //                 context.lineTo(
        //                     (transformedVertices[i].x - camera.pos.x) * camera.zoomLevel,
        //                     (transformedVertices[i].y - camera.pos.y) * camera.zoomLevel
        //                 );
        //             }
        //
        //             context.closePath();
        //             context.fill(); // Fill the polygon
        //             context.stroke(); // Draw the contour
        //         }
        //     }
        //
        //     context.restore();
        // }
    }

    drawDebugQuadTree(context, camera) {
        const quadTree = this.entity.quadTree;
        if(quadTree) {
            quadTree.draw(context, camera);
        }
    }
}
