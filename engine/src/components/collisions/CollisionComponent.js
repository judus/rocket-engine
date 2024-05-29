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
        const boundary = new Rectangle(this.entity.pos.x - 100, this.entity.pos.y - 100, 200, 200); // Define the query boundary
        const quadTree = new QuadTree(boundary, 4); // Create a local quad tree

        otherEntities.forEach(ne => {
            quadTree.insert(ne); // Insert nearby entities into the quad tree
        });

        const potentialColliders = quadTree.query(boundary); // Query the quad tree for potential colliders

        potentialColliders.forEach(other => {
            if(this.entity !== other && this.checkCollision(other).collided) {
                this.handleCollision(other, {collided: true});
            }
        });
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

        // Check outer bounding box
        if(detectionLevel >= DetectionTypes.OUTER_BOX) { // DetectionTypes.OUTER_BOX = 1
            collisionResult = CollisionDetector.checkBoundingBoxCollision(
                this.entity,
                otherEntity
            );
            if(!collisionResult.collided) return collisionResult;
        }

        // Check sub bounding boxes
        if(detectionLevel >= DetectionTypes.SUB_BOXES) { // DetectionTypes.SUB_BOXES = 2
            collisionResult = CollisionDetector.checkSubBoxCollision(
                this.entity,
                otherEntity
            );
            if(!collisionResult.collided) return collisionResult;
        }

        // Check either main polygon...
        if(detectionLevel === DetectionTypes.POLYGON) { // DetectionTypes.POLYGON = 3
            collisionResult = CollisionDetector.checkPolygonCollision(
                this.entity,
                otherEntity
            );
            return collisionResult;
        }

        // ... or check frame polygon
        if(detectionLevel === DetectionTypes.FRAME_POLYGON) { // DetectionTypes.FRAME_POLYGON = 4
            collisionResult = CollisionDetector.checkFramePolygonCollision(
                this.entity,
                otherEntity
            );
            return collisionResult;
        }

        return {collided: false};
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
