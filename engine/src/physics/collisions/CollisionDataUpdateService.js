import Vector3D from "../../utils/maths/Vector3D.js";

export default class CollisionDataUpdateService {
    /**
     * Updates the oriented bounding box (OBB) of an entity.
     * @param {Entity2D} entity - The entity to update.
     */
    static updateBoundingBoxOBB(entity) {
        const halfWidth = (entity.width * entity.scale) / 2;
        const halfHeight = (entity.height * entity.scale) / 2;
        const rotatedBoundingBox = this.getRotatedBoundingBoxOBB(entity.pos, halfWidth, halfHeight, entity.rotation);
        entity.boundingBox = rotatedBoundingBox;
    }

    /**
     * Updates the axis-aligned bounding box (AABB) of an entity.
     * @param {Entity2D} entity - The entity to update.
     */
    static updateBoundingBoxAABB(entity) {
        const halfWidth = (entity.width * entity.scale) / 2;
        const halfHeight = (entity.height * entity.scale) / 2;
        const pos = entity.pos;

        const aabb = this.getRotatedBoundingBoxAABB(pos, halfWidth, halfHeight, entity.rotation);
        entity.boundingBox = {
            x: aabb.x,
            y: aabb.y,
            width: aabb.width,
            height: aabb.height,
            corners: aabb.corners // Ensure corners are included
        };
    }

    /**
     * Gets a rotated bounding box (OBB).
     * @param {Vector3D} pos - The position of the entity.
     * @param {number} halfWidth - Half the width of the bounding box.
     * @param {number} halfHeight - Half the height of the bounding box.
     * @param {number} orientation - The orientation of the entity.
     * @param {Object} [offset={x: 0, y: 0}] - The offset of the collision box.
     * @returns {Object} - The rotated bounding box with its corners.
     */
    static getRotatedBoundingBoxOBB(pos, halfWidth, halfHeight, orientation, offset = {x: 0, y: 0}) {
        const cos = Math.cos(orientation);
        const sin = Math.sin(orientation);
        const offsetX = offset.x || 0;
        const offsetY = offset.y || 0;

        const corners = [
            {x: -halfWidth + offsetX, y: -halfHeight + offsetY},
            {x: halfWidth + offsetX, y: -halfHeight + offsetY},
            {x: halfWidth + offsetX, y: halfHeight + offsetY},
            {x: -halfWidth + offsetX, y: halfHeight + offsetY}
        ];

        const rotatedCorners = corners.map(corner => ({
            x: cos * corner.x - sin * corner.y + pos.x,
            y: sin * corner.x + cos * corner.y + pos.y
        }));

        return {
            corners: rotatedCorners
        };
    }

    /**
     * Gets an axis-aligned bounding box (AABB) that encloses a rotated rectangle.
     * @param {Vector3D} pos - The position of the entity.
     * @param {number} halfWidth - Half the width of the bounding box.
     * @param {number} halfHeight - Half the height of the bounding box.
     * @param {number} orientation - The orientation of the entity.
     * @param {Object} [offset={x: 0, y: 0}] - The offset of the collision box.
     * @returns {Object} - The axis-aligned bounding box.d
     */
    static getRotatedBoundingBoxAABB(pos, halfWidth, halfHeight, orientation, offset = {x: 0, y: 0}) {
        const cos = Math.cos(orientation);
        const sin = Math.sin(orientation);
        const offsetX = offset.x || 0;
        const offsetY = offset.y || 0;

        const corners = [
            {x: -halfWidth + offsetX, y: -halfHeight + offsetY},
            {x: halfWidth + offsetX, y: -halfHeight + offsetY},
            {x: halfWidth + offsetX, y: halfHeight + offsetY},
            {x: -halfWidth + offsetX, y: halfHeight + offsetY}
        ];

        const rotatedCorners = corners.map(corner => ({
            x: cos * corner.x - sin * corner.y + pos.x,
            y: sin * corner.x + cos * corner.y + pos.y
        }));

        const minX = Math.min(...rotatedCorners.map(corner => corner.x));
        const minY = Math.min(...rotatedCorners.map(corner => corner.y));
        const maxX = Math.max(...rotatedCorners.map(corner => corner.x));
        const maxY = Math.max(...rotatedCorners.map(corner => corner.y));

        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
            corners: rotatedCorners
        };
    }

    /**
     * Updates the collision boxes of an entity.
     * @param {Entity2D} entity - The entity to update.
     */
    /**
     * Updates the collision boxes of an entity.
     * @param {Entity2D} entity - The entity to update.
     */
    static updateCollisionBoxes(entity) {
        if(!entity.initialCollisionBoxes) {
            entity.initialCollisionBoxes = entity.collisionBoxes.map(box => ({...box}));
        }

        entity.collisionBoxes = entity.initialCollisionBoxes.map(box => {
            const corners = [
                {x: (box.x - box.width / 2) * entity.scale, y: (box.y - box.height / 2) * entity.scale},
                {x: (box.x + box.width / 2) * entity.scale, y: (box.y - box.height / 2) * entity.scale},
                {x: (box.x + box.width / 2) * entity.scale, y: (box.y + box.height / 2) * entity.scale},
                {x: (box.x - box.width / 2) * entity.scale, y: (box.y + box.height / 2) * entity.scale}
            ];

            const rotatedCorners = corners.map(corner => {
                const rotatedCorner = this.rotatePoint(corner, entity.rotation);
                return {
                    x: entity.pos.x + rotatedCorner.x,
                    y: entity.pos.y + rotatedCorner.y
                };
            });

            const minX = Math.min(...rotatedCorners.map(corner => corner.x));
            const minY = Math.min(...rotatedCorners.map(corner => corner.y));
            const maxX = Math.max(...rotatedCorners.map(corner => corner.x));
            const maxY = Math.max(...rotatedCorners.map(corner => corner.y));

            return {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY,
                corners: rotatedCorners
            };
        });
    }


    /**
     * Rotates a point around the origin by the given angle.
     * @param {Object} point - The point to rotate, with x and y properties.
     * @param {number} angle - The angle to rotate by, in radians.
     * @returns {Object} - The rotated point.
     */
    static rotatePoint(point, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return {
            x: point.x * cos - point.y * sin,
            y: point.x * sin + point.y * cos
        };
    }


    /**
     * Updates the polygon of an entity.
     * @param {Entity2D} entity - The entity to update.
     */
    static updatePolygon(entity) {
        if(entity.polygon.length) {
            entity.transformedPolygon = this.transformPolygon(entity.polygon, entity.pos, entity.rotation, entity.scale);
        }
    }

    /**
     * Updates the frame polygon of an entity if applicable.
     * @param {Entity2D} entity - The entity to update.
     */
    static updateFramePolygon(entity) {
        if(entity.framePolygons) {
            const frame = entity.framePolygons[entity.spriteSheet.getFrame()];
            if(frame) {
                entity.framePolygons[entity.spriteSheet.getFrame()] = this.transformPolygon(frame, entity.pos, entity.rotation, entity.scale);
            }
        }
    }

    /**
     * Transforms a polygon based on position, orientation, and scale.
     * @param {Array} vertices - The vertices of the polygon.
     * @param {Vector3D} pos - The position of the entity.
     * @param {number} orientation - The orientation of the entity.
     * @param {number} scale - The scale of the entity.
     * @returns {Array} - The transformed polygon vertices.
     */
    static transformPolygon(vertices, pos, orientation, scale) {
        return vertices.map(vertex => {
            const rotated = new Vector3D(vertex.x, vertex.y).rotate(orientation);
            return {
                x: rotated.x * scale + pos.x,
                y: rotated.y * scale + pos.y
            };
        });
    }
}
