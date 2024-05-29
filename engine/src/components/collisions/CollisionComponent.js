import BaseComponent from "../../abstracts/BaseComponent.js";
import DefaultCollisionResponse from "./DefaultCollisionResponse.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";
import CollisionDetector from "../../physics/collisions/CollisionDetector.js";
import Rectangle from "../../utils/maths/Rectangle.js";
import QuadTree from "../../services/QuadTree.js";

export default class CollisionComponent extends BaseComponent {
    constructor(collisionResponse = null, debug = false) {
        super();
        this.collidingEntities = [];
        this.debug = debug;
        this.collisionResponse = collisionResponse || new DefaultCollisionResponse();
    }

    check(otherEntities) {
        const boundary = new Rectangle(this.entity.pos.x - 240, this.entity.pos.y - 310, 480, 620);
        const quadTree = new QuadTree(boundary, 2); // Create a local quad tree

        otherEntities.forEach(ne => {
            quadTree.insert(ne); // Insert nearby entities into the quad tree
        });

        const potentialColliders = quadTree.query(boundary); // Query the quad tree for potential colliders

        potentialColliders.forEach(other => {
            if(this.entity !== other && this.checkCollision(other).collided) {
                this.handleCollision(other, {collided: true});
            }
        });

        this.entity.quadTree = quadTree; // Store the quad tree in the entity for future reference
    }

    checkCollision(otherEntity) {
        if(!this.entity) {
            console.error(`This entity is invalid or has been removed`);
            return {collided: false};
        }

        if(!otherEntity) {
            console.error(`Other entity is null`);
            return {collided: false};
        }

        const detectionLevel = this.entity.definition.collisionDetection || DetectionTypes.OUTER_BOX;
        let collisionResult;

        // Apply transform to collision data before checking collision
        const transformComponent = this.entity.getComponent('transform');
        const otherTransformComponent = otherEntity.getComponent('transform');

        if(!transformComponent || !otherTransformComponent) {
            console.error(`Missing transform component on one of the entities`);
            return {collided: false};
        }

        // Check outer bounding box
        if(detectionLevel >= DetectionTypes.OUTER_BOX) { // DetectionTypes.OUTER_BOX = 1
            collisionResult = CollisionDetector.checkBoundingBoxCollision(
                this.applyTransformToBoundingBox(this.entity, transformComponent),
                this.applyTransformToBoundingBox(otherEntity, otherTransformComponent)
            );
            if(!collisionResult.collided) return collisionResult;
        }

        // Check sub bounding boxes
        if(detectionLevel >= DetectionTypes.SUB_BOXES) { // DetectionTypes.SUB_BOXES = 2
            collisionResult = CollisionDetector.checkSubBoxCollision(
                this.applyTransformToSubBoundingBoxes(this.entity, transformComponent),
                this.applyTransformToSubBoundingBoxes(otherEntity, otherTransformComponent)
            );
            if(!collisionResult.collided) return collisionResult;
        }

        // Check either main polygon...
        if(detectionLevel === DetectionTypes.POLYGON) { // DetectionTypes.POLYGON = 3
            collisionResult = CollisionDetector.checkPolygonCollision(
                this.applyTransformToPolygon(this.entity, transformComponent),
                this.applyTransformToPolygon(otherEntity, otherTransformComponent)
            );
            return collisionResult;
        }

        // ... or check frame polygon
        if(detectionLevel === DetectionTypes.FRAME_POLYGON) { // DetectionTypes.FRAME_POLYGON = 4
            collisionResult = CollisionDetector.checkFramePolygonCollision(
                this.applyTransformToFramePolygon(this.entity, transformComponent),
                this.applyTransformToFramePolygon(otherEntity, otherTransformComponent)
            );
            return collisionResult;
        }

        return {collided: false};
    }

    applyTransformToBoundingBox(entity, transformComponent) {
        const collisionData = entity.definition.collisionData;
        if(!collisionData || !collisionData.boundingBox) return null;

        const {width, height} = collisionData.boundingBox;
        const transformedVertices = transformComponent.applyTransform([
            {x: 0, y: 0},
            {x: width, y: 0},
            {x: width, y: height},
            {x: 0, y: height}
        ]);

        const minX = Math.min(...transformedVertices.map(v => v.x));
        const minY = Math.min(...transformedVertices.map(v => v.y));
        const maxX = Math.max(...transformedVertices.map(v => v.x));
        const maxY = Math.max(...transformedVertices.map(v => v.y));

        return {
            left: minX,
            top: minY,
            right: maxX,
            bottom: maxY
        };
    }

    applyTransformToSubBoundingBoxes(entity, transformComponent) {
        const collisionData = entity.definition.collisionData;
        if(!collisionData || !collisionData.subBoundingBoxes) return null;

        return collisionData.subBoundingBoxes.map(box => {
            const transformedVertices = transformComponent.applyTransform([
                {x: box.x, y: box.y},
                {x: box.x + box.width, y: box.y},
                {x: box.x + box.width, y: box.y + box.height},
                {x: box.x, y: box.y + box.height}
            ]);

            const minX = Math.min(...transformedVertices.map(v => v.x));
            const minY = Math.min(...transformedVertices.map(v => v.y));
            const maxX = Math.max(...transformedVertices.map(v => v.x));
            const maxY = Math.max(...transformedVertices.map(v => v.y));

            return {
                left: minX,
                top: minY,
                right: maxX,
                bottom: maxY
            };
        });
    }

    applyTransformToPolygon(entity, transformComponent) {
        const collisionData = entity.definition.collisionData;
        if(!collisionData || !collisionData.polygon) return null;

        return transformComponent.applyTransform(collisionData.polygon);
    }

    applyTransformToFramePolygon(entity, transformComponent) {
        const collisionData = entity.definition.collisionData;
        if(!collisionData || !collisionData.framePolygons) return null;

        // Assuming we want to transform the current frame's polygon
        const currentFramePolygon = collisionData.framePolygons[0];
        return transformComponent.applyTransform(currentFramePolygon);
    }

    /**
     * Handles collision with a specific entity
     * @param {Entity} otherEntity - The entity that collided with this one
     * @param {Object} collisionResult - The result of the collision
     */
    handleCollision(otherEntity, collisionResult) {
        this.collisionResponse.handleCollision(this.entity, otherEntity, collisionResult);
        otherEntity.onCollision(this.entity, collisionResult);

        if(this.debug) {
            console.log(`${this.entity.id} collided with ${otherEntity.id}`);
            const renderComponent = this.entity.getComponent('render');
            if(renderComponent) {
                renderComponent.color = 'red'; // Example visual feedback for collision
            }
        }
    }
}
