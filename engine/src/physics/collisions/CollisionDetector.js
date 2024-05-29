import Polygon from "../../utils/maths/Polygon.js";

export default class CollisionDetector {
    /**
     * Checks for bounding box collision between two entities
     * @param {Entity} entityA - The first entity
     * @param {Entity} entityB - The second entity
     * @returns {Object} - Collision result
     */
    static checkBoundingBoxCollision(entityA, entityB) {
        if(!entityB.definition) {
            console.log(entityB);
            return {collided: false};
        }

        if(!entityB.definition.collisionData) {
            console.log(entityB.definition);
            return {collided: false};
        }

        const boxA = entityA.definition.collisionData.boundingBox;
        const boxB = entityB.definition.collisionData.boundingBox;

        const collided = !(boxA.x + boxA.width < boxB.x ||
            boxA.x > boxB.x + boxB.width ||
            boxA.y + boxA.height < boxB.y ||
            boxA.y > boxB.y + boxB.height);

        return {collided};
    }

    /**
     * Checks for collision between sub-boxes of two entities
     * @param {Entity} entityA - The first entity
     * @param {Entity} entityB - The second entity
     * @returns {Object} - Collision result
     */
    static checkSubBoxCollision(entityA, entityB) {
        for(const boxA of entityA.definition.collisionData.subBoundingBoxes) {
            for(const boxB of entityB.definition.collisionData.subBoundingBoxes) {
                const collided = !(boxA.x + boxA.width < boxB.x ||
                    boxA.x > boxB.x + boxB.width ||
                    boxA.y + boxA.height < boxB.y ||
                    boxA.y > boxB.y + boxB.height);

                if(collided) {
                    return {collided};
                }
            }
        }
        return {collided: false};
    }

    /**
     * Checks for polygon collision between two entities
     * @param {Entity} entityA - The first entity
     * @param {Entity} entityB - The second entity
     * @returns {Object} - Collision result
     */
    static checkPolygonCollision(entityA, entityB) {
        const polygonA = new Polygon(entityA.definition.polygon.vertices);
        const polygonB = new Polygon(entityB.definition.polygon.vertices);

        const collided = this.polygonCollision(polygonA, polygonB);
        return {collided};
    }

    /**
     * Checks for frame polygon collision between two entities
     * @param {Entity} entityA - The first entity
     * @param {Entity} entityB - The second entity
     * @returns {Object} - Collision result
     */
    static checkFramePolygonCollision(entityA, entityB) {
        const frameIndex = entityA.getComponent('sprite').getFrame();
        const polygonA = new Polygon(entityA.definition.collisionData.framePolygons[frameIndex]);
        const polygonB = new Polygon(entityB.definition.collisionData.framePolygons[frameIndex]);

        const collided = this.polygonCollision(polygonA, polygonB);
        return {collided};
    }

    /**
     * Checks for polygon collision using the Separating Axis Theorem (SAT)
     * @param {Polygon} polygonA - The first polygon
     * @param {Polygon} polygonB - The second polygon
     * @returns {boolean} - Whether the polygons collided
     */
    static polygonCollision(polygonA, polygonB) {
        const polygons = [polygonA, polygonB];
        for(let i = 0; i < polygons.length; i++) {
            const polygon = polygons[i];
            for(let i1 = 0; i1 < polygon.vertices.length; i1++) {
                const i2 = (i1 + 1) % polygon.vertices.length;
                const p1 = polygon.vertices[i1];
                const p2 = polygon.vertices[i2];
                const normal = {x: p2.y - p1.y, y: p1.x - p2.x};
                let minA, maxA, minB, maxB;
                for(let j = 0; j < polygonA.vertices.length; j++) {
                    const projected = normal.x * polygonA.vertices[j].x + normal.y * polygonA.vertices[j].y;
                    if(minA === undefined || projected < minA) {
                        minA = projected;
                    }
                    if(maxA === undefined || projected > maxA) {
                        maxA = projected;
                    }
                }
                for(let j = 0; j < polygonB.vertices.length; j++) {
                    const projected = normal.x * polygonB.vertices[j].x + normal.y * polygonB.vertices[j].y;
                    if(minB === undefined || projected < minB) {
                        minB = projected;
                    }
                    if(maxB === undefined || projected > maxB) {
                        maxB = projected;
                    }
                }
                if(maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    }
}
