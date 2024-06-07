import BaseComponent from "../../abstracts/BaseComponent.js";
import DefaultCollisionResponse from "./DefaultCollisionResponse.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";
import CollisionDetector from "../../physics/collisions/CollisionDetector.js";
import Rectangle from "../../utils/maths/Rectangle.js";
import QuadTree from "../../services/QuadTree.js";
import DrawingService from "../../services/DrawingService.js";

export default class CollisionComponent extends BaseComponent {
    constructor(collisionResponse = null, debug = false) {
        super();
        this.collidingEntities = [];
        this.debug = debug;
        this.collisionResponse = collisionResponse || new DefaultCollisionResponse();
        this.quadTree = null;
    }

    initializeQuadTree(entities) {
        const sizeX = this.entity.width;
        const sizeY = this.entity.height;
        const length = Math.sqrt(sizeX * sizeX + sizeY * sizeY) * 1.5;

        const boundary = new Rectangle(this.entity.pos.x - length / 2, this.entity.pos.y - length / 2, length, length);
        this.quadTree = new QuadTree(boundary, 1);
        entities.forEach(entity => {
            console.log('Inserting entity into quad tree');
            this.quadTree.insert(entity)
        });
    }

    // TODO: Update the engine or the entity to support this method
    // update(deltaTime) {
    //     const entities = this.entity.entityManager.getAllEntities();
    //     this.check(entities);
    // }

    check(entities) {
        this.initializeQuadTree(entities);

        const sizeX = this.entity.width;
        const sizeY = this.entity.height;
        const length = Math.sqrt(sizeX * sizeX + sizeY * sizeY) * 1.5;

        const boundary = new Rectangle(this.entity.pos.x - length / 2, this.entity.pos.y - length / 2, length, length);
        this.quadTree.query(boundary).forEach(candidate => {
            if(this.entity !== candidate) {
                const collisionResult = this.checkCollision(this.entity, candidate);
                if(collisionResult.collided) {
                    this.handleCollision(this.entity, candidate, collisionResult);
                }
            }
        });

        // Store the quad tree in the entity for future reference
        this.entity.quadTree = this.quadTree;
    }

    checkCollision(entity, candidate) {
        if(!entity || !candidate) {
            console.error(`Invalid entity or candidate for collision check`);
            return {collided: false};
        }

        const detectionLevel = entity.collisionDetection || DetectionTypes.OUTER_BOX;
        let collisionResult = {collided: false};

        // Check outer bounding box with OBB for precise detection
        if(detectionLevel === DetectionTypes.OUTER_BOX) {
            collisionResult = CollisionDetector.checkBoundingBoxOBB(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check bounding box with AABB for pre-check in detailed detection
        if(detectionLevel > DetectionTypes.OUTER_BOX) {
            collisionResult = CollisionDetector.checkBoundingBoxAABB(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check sub bounding boxes
        if(detectionLevel >= DetectionTypes.SUB_BOXES) {
            collisionResult = CollisionDetector.checkCollisionBoxes(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check either the entity polygon or the current sprite sheet frame polygon
        if(detectionLevel === DetectionTypes.POLYGON) {
            collisionResult = CollisionDetector.checkPolygon(entity, candidate);
        } else if(detectionLevel === DetectionTypes.FRAME_POLYGON) {
            collisionResult = CollisionDetector.checkPolygon(entity, candidate); // Assuming same method for both
        }

        return collisionResult;
    }


    handleCollision(entity, otherEntity, collisionResult) {
        this.collisionResponse.handleCollision(entity, otherEntity, collisionResult);
        otherEntity.onCollision(entity, collisionResult);

        if(this.debug) {
            console.log(`${entity.id} collided with ${otherEntity.id}`);
        }
    }

    render(context, camera) {
        if(this.debug) {
            console.log('Rendering collision data...');
            // Draw the quad tree
            this.drawQuadTree(context, this.quadTree, camera);

            // Draw the bounding box
            this.drawBoundingBoxes(context, camera);

            // Draw the collision boxes if any
            this.drawCollisionBoxes(context, camera);

            // Draw the sprite frame polygon
            if(this.entity.framePolygons.length) {
                this.drawSpriteFramePolygon(context, camera);
            }
        }
    }

    drawQuadTree(context, quadTree, camera) {
        this.entity.quadTree.draw(context, camera);
    }

    drawBoundingBoxes(context, camera) {
        const detectionLevel = this.entity.collisionDetection || DetectionTypes.OUTER_BOX;

        if(detectionLevel === DetectionTypes.OUTER_BOX) {
            console.log('Drawing OBB bounding box');
            DrawingService.drawBoundingBoxOBB(context, this.entity.boundingBox, camera);
        } else {
            console.log('Drawing AABB bounding box');
            DrawingService.drawBoundingBoxAABB(context, this.entity.boundingBox, camera);
        }
    }

    drawCollisionBoxes(context, camera) {
        DrawingService.drawCollisionBoxes(context, this.entity.collisionBoxes, camera);
    }

    drawSpriteFramePolygon(context, camera) {
        DrawingService.drawPolygon(context, this.entity.framePolygon || this.entity.polygon, camera);
    }
}
