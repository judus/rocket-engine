import Polygon from "../../utils/maths/Polygon.js";

export default class CollisionDetector {
    /**
     * Checks for collision between collision boxes of two entities
     * @param {Entity2D} entityA - The first entity
     * @param {Entity2D} entityB - The second entity
     * @returns {Object} - Collision result
     */
    static checkCollisionBoxes(entityA, entityB) {
        for(let boxA of entityA.collisionBoxes) {
            for(let boxB of entityB.collisionBoxes) {
                if(this.checkBoundingBoxAABB({boundingBox: boxA}, {boundingBox: boxB}).collided) {
                    return {collided: true};
                }
            }
        }
        return {collided: false};
    }

    /**
     * Checks for bounding box collision between two entities
     * @param {Entity2D} entityA - The first entity
     * @param {Entity2D} entityB - The second entity
     * @returns {Object} - Collision result
     */
    static checkBoundingBoxAABB(entityA, entityB) {
        const boxA = entityA.boundingBox;
        const boxB = entityB.boundingBox;
        return !(
            boxA.x + boxA.width < boxB.x ||
            boxA.x > boxB.x + boxB.width ||
            boxA.y + boxA.height < boxB.y ||
            boxA.y > boxB.y + boxB.height
        ) ? {collided: true} : {collided: false};
    }

    static checkBoundingBoxOBB(entityA, entityB) {
        const cornersA = entityA.boundingBox.corners;
        const cornersB = entityB.boundingBox.corners;

        const axes = [
            ...this.getAxesFromCorners(cornersA),
            ...this.getAxesFromCorners(cornersB)
        ];

        for(const axis of axes) {
            if(!this.isProjectionOverlap(cornersA, cornersB, axis)) {
                return {collided: false};
            }
        }
        return {collided: true};
    }

    static getAxesFromCorners(corners) {
        const axes = [];
        for(let i = 0; i < corners.length; i++) {
            const p1 = corners[i];
            const p2 = corners[(i + 1) % corners.length];
            const edge = {x: p2.x - p1.x, y: p2.y - p1.y};
            const normal = {x: -edge.y, y: edge.x};
            axes.push(normal);
        }
        return axes;
    }

    static isProjectionOverlap(cornersA, cornersB, axis) {
        const [minA, maxA] = this.projectCorners(cornersA, axis);
        const [minB, maxB] = this.projectCorners(cornersB, axis);

        return !(maxA < minB || maxB < minA);
    }

    static projectCorners(corners, axis) {
        const dots = corners.map(corner => corner.x * axis.x + corner.y * axis.y);
        return [Math.min(...dots), Math.max(...dots)];
    }

    /**
     * Checks for polygon collision between two entities
     * @param {Entity2D} entityA - The first entity
     * @param {Entity2D} entityB - The second entity
     * @returns {Object} - Collision result
     */
    static checkPolygon(entityA, entityB) {
        const polygonA = new Polygon(entityA.transformedPolygon || entityA.polygon);
        const polygonB = new Polygon(entityB.transformedPolygon || entityB.polygon);
        return polygonA.intersects(polygonB) ? {collided: true} : {collided: false};
    }

    /**
     * Checks if two bounding boxes overlap.
     * @param {Object} boxA - The first bounding box.
     * @param {Object} boxB - The second bounding box.
     * @returns {boolean} - True if they overlap, false otherwise.
     */
    static checkBoundingBoxOverlap(boxA, boxB) {
        return !(
            boxA.x + boxA.width < boxB.x ||
            boxA.x > boxB.x + boxB.width ||
            boxA.y + boxA.height < boxB.y ||
            boxA.y > boxB.y + boxB.height
        );
    }
}
