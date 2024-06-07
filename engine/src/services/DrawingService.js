export default class DrawingService {
    /**
     * Draws an axis-aligned bounding box (AABB).
     * @param {CanvasRenderingContext2D} context - The canvas rendering context.
     * @param {Object} boundingBox - The AABB to draw.
     * @param {CameraECS} camera - The camera to consider for drawing.
     * @param {string} color - The color to use for drawing.
     */
    static drawBoundingBoxAABB(context, boundingBox, camera, color = 'rgba(0, 255, 0, 0.5)') {
        const zoom = camera.zoomLevel;
        const x = (boundingBox.x - camera.pos.x) * zoom;
        const y = (boundingBox.y - camera.pos.y) * zoom;
        const width = boundingBox.width * zoom;
        const height = boundingBox.height * zoom;

        context.strokeStyle = color;
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);
    }

    /**
     * Draws an oriented bounding box (OBB).
     * @param {CanvasRenderingContext2D} context - The canvas rendering context.
     * @param {Object} boundingBox - The OBB to draw.
     * @param {CameraECS} camera - The camera to consider for drawing.
     * @param {string} color - The color to use for drawing.
     */
    static drawBoundingBoxOBB(context, boundingBox, camera, color = 'rgba(0, 255, 0, 0.5)') {
        const zoom = camera.zoomLevel;
        context.strokeStyle = color;
        context.lineWidth = 2;

        const {corners} = boundingBox;
        context.beginPath();

        corners.forEach((corner, index) => {
            const x = (corner.x - camera.pos.x) * zoom;
            const y = (corner.y - camera.pos.y) * zoom;
            if(index === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        });

        context.closePath();
        context.stroke();
    }


    /**
     * Draws collision boxes.
     * @param {CanvasRenderingContext2D} context - The canvas rendering context.
     * @param {Array} collisionBoxes - The collision boxes to draw.
     * @param {CameraECS} camera - The camera to consider for drawing.
     * @param {string} color - The color to use for drawing.
     */
    static drawCollisionBoxes(context, collisionBoxes, camera, color = 'rgba(190,0,0,0.5)') {
        context.save();
        context.strokeStyle = color;
        context.lineWidth = 1;

        collisionBoxes.forEach(box => {
            DrawingService.drawBoundingBoxOBB(context, box, camera, color);
        });

        context.restore();
    }

    /**
     * Draws a polygon.
     * @param {CanvasRenderingContext2D} context - The canvas rendering context.
     * @param {Array} polygon - The vertices of the polygon to draw.
     * @param {CameraECS} camera - The camera to consider for drawing.
     * @param {string} color - The color to use for drawing.
     */
    static drawPolygon(context, polygon, camera, color = 'rgb(194,151,53)') {
        const zoom = camera.zoomLevel;
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.beginPath();

        polygon.forEach((vertex, index) => {
            const x = (vertex.x - camera.pos.x) * zoom;
            const y = (vertex.y - camera.pos.y) * zoom;
            if(index === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        });

        context.closePath();
        context.stroke();
    }
}
