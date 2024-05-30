import BaseComponent from "../../abstracts/BaseComponent.js";
import DefaultCollisionResponse from "./DefaultCollisionResponse.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";
import CollisionDetector from "../../physics/collisions/CollisionDetector.js";
import Rectangle from "../../utils/maths/Rectangle.js";
import QuadTree from "../../services/QuadTree.js";
import EntityTransform from "../../services/EntityTransform.js";

export default class CollisionComponent extends BaseComponent {
    constructor(collisionResponse = null, debug = false) {
        super();
        this.collidingEntities = [];
        this.debug = debug;
        this.collisionResponse = collisionResponse || new DefaultCollisionResponse();
        this.quadTree = null;
    }

    initializeQuadTree(entities) {
        const boundary = new Rectangle(this.entity.pos.x - 240, this.entity.pos.y - 310, 480, 620);
        this.quadTree = new QuadTree(boundary, 2);
        entities.forEach(entity => this.quadTree.insert(entity));
    }

    check(entities) {
        this.initializeQuadTree(entities);

        const boundary = new Rectangle(this.entity.pos.x - 240, this.entity.pos.y - 310, 480, 620);
        this.quadTree.query(boundary).forEach(candidate => {
            if(this.entity !== candidate) {
                const collisionResult = this.checkCollision(this.entity, candidate);
                if(collisionResult.collided) {
                    this.handleCollision(this.entity, candidate, collisionResult);
                }
            }
        });

        this.entity.quadTree = this.quadTree; // Store the quad tree in the entity for future reference
    }

    checkCollision(entity, candidate) {
        if(!entity || !candidate) {
            console.error(`Invalid entity or candidate for collision check`);
            return {collided: false};
        }

        console.log(entity);
        const detectionLevel = entity.collisionDetection || DetectionTypes.OUTER_BOX;
        let collisionResult = {collided: false};

        // Check outer bounding box
        if(detectionLevel >= DetectionTypes.OUTER_BOX) {
            this.updateBoundingBox(entity);
            collisionResult = CollisionDetector.checkBoundingBoxCollision(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check sub bounding boxes
        if(detectionLevel >= DetectionTypes.SUB_BOXES) {
            this.updateSubBoundingBoxes(entity);
            collisionResult = CollisionDetector.checkSubBoxCollision(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check either main entity polygon or current sprite sheet frame polygon
        if(detectionLevel === DetectionTypes.POLYGON) {
            this.updateEntityPolygon(entity);
            collisionResult = CollisionDetector.checkEntityPolygonCollision(entity, candidate);
        } else if(detectionLevel === DetectionTypes.FRAME_POLYGON) {
            this.updateSpriteSheetFramePolygon(entity);
            collisionResult = CollisionDetector.checkFramePolygonCollision(entity, candidate);
        }

        return collisionResult;
    }

    updateBoundingBox(entity) {
        EntityTransform.updateBoundingBox(entity, entity.boundingBox);
    }

    updateSubBoundingBoxes(entity) {
        entity.collisionBoxes.forEach(box => EntityTransform.updateVertices(entity, box));
    }

    updateEntityPolygon(entity) {
        EntityTransform.updateVertices(entity, entity.polygon);
    }

    updateSpriteSheetFramePolygon(entity) {
        const currentFrame = entity.getComponent('sprite').getFrame();
        EntityTransform.updateVertices(entity, entity.frames[currentFrame]);
    }

    handleCollision(entity, otherEntity, collisionResult) {
        this.collisionResponse.handleCollision(entity, otherEntity, collisionResult);
        otherEntity.onCollision(entity, collisionResult);

        if(this.debug) {
            console.log(`${entity.id} collided with ${otherEntity.id}`);
        }
    }
}
