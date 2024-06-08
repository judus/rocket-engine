import BaseComponent from "../../abstracts/BaseComponent.js";
import DefaultCollisionResponse from "./DefaultCollisionResponse.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";
import CollisionDetector from "../../physics/collisions/CollisionDetector.js";
import Rectangle from "../../utils/maths/Rectangle.js";
import QuadTree from "../../services/QuadTree.js";
import DrawingService from "../../services/DrawingService.js";

const MIN_QUADTREE_SIZE = 300;

export default class CollisionComponent extends BaseComponent {
    constructor(collisionResponse = null, debug = false) {
        super();
        this.collidingEntities = [];
        this.debug = debug;
        this.collisionResponse = collisionResponse || new DefaultCollisionResponse();
        this.quadTree = null;
    }

    initializeQuadTree(entities) {
        if(!this.isValidEntity(this.entity)) return;

        const boundary = this.calculateBoundary(this.entity);
        this.quadTree = new QuadTree(boundary, 1);
        entities.forEach(entity => {
            this.quadTree.insert(entity);
        });
    }

    check(entities) {
        if(!this.isValidEntity(this.entity)) return;

        this.initializeQuadTree(entities);

        const boundary = this.calculateBoundary(this.entity);
        this.quadTree.query(boundary).forEach(candidate => {

            if(this.entity !== candidate && this.entity.id !== candidate.ownerId && this.entity.ownerId !== candidate.id && this.entity.ownerId !== candidate.ownerId) {
                console.log('checking for detection', this.entity, candidate);

                const collisionResult = this.checkCollision(this.entity, candidate);
                if(collisionResult.collided) {
                    this.handleCollision(this.entity, candidate, collisionResult);
                }
            }
        });

        this.entity.quadTree = this.quadTree;
    }

    calculateBoundary(entity) {
        const sizeX = entity.width * entity.scale;
        const sizeY = entity.height * entity.scale;
        let length = Math.sqrt(sizeX * sizeX + sizeY * sizeY) * 1.5;

        // Ensure the boundary length is at least MIN_QUADTREE_SIZE
        if(length < MIN_QUADTREE_SIZE) {
            length = MIN_QUADTREE_SIZE;
        }

        return new Rectangle(entity.pos.x - length / 2, entity.pos.y - length / 2, length, length);
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

        // Check collision boxes only if not doing polygonal checks
        if(detectionLevel >= DetectionTypes.SUB_BOXES && detectionLevel < DetectionTypes.POLYGON) {
            collisionResult = CollisionDetector.checkCollisionBoxes(entity, candidate);
            if(!collisionResult.collided) return collisionResult;
        }

        // Check either the entity polygon or the current sprite sheet frame polygon
        if(detectionLevel >= DetectionTypes.POLYGON) {
            collisionResult = CollisionDetector.checkPolygon(entity, candidate);
        } else if(detectionLevel === DetectionTypes.FRAME_POLYGON) {
            collisionResult = CollisionDetector.checkPolygon(entity, candidate);
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
            if(!this.isValidEntity(this.entity)) return;

            this.drawQuadTree(context, this.quadTree, camera);
            this.drawBoundingBoxes(context, camera);
            this.drawCollisionBoxes(context, camera);

            if(this.entity.framePolygons && this.entity.framePolygons.length) {
                this.drawSpriteFramePolygon(context, camera);
            }
        }
    }

    drawQuadTree(context, quadTree, camera) {
        if(quadTree) {
            quadTree.draw(context, camera);
        }
    }

    drawBoundingBoxes(context, camera) {
        const detectionLevel = this.entity.collisionDetection || DetectionTypes.OUTER_BOX;

        if(detectionLevel === DetectionTypes.OUTER_BOX && this.isValidBoundingBoxOBB(this.entity.boundingBox)) {
            DrawingService.drawBoundingBoxOBB(context, this.entity.boundingBox, camera);
        } else if(this.isValidBoundingBoxAABB(this.entity.boundingBox)) {
            DrawingService.drawBoundingBoxAABB(context, this.entity.boundingBox, camera);
        }
    }

    drawCollisionBoxes(context, camera) {
        if(this.isValidCollisionBoxes(this.entity.collisionBoxes)) {
            DrawingService.drawCollisionBoxes(context, this.entity.collisionBoxes, camera);
        }
    }

    drawSpriteFramePolygon(context, camera) {
        if(this.isValidPolygon(this.entity.framePolygon || this.entity.polygon)) {
            DrawingService.drawPolygon(context, this.entity.framePolygon || this.entity.polygon, camera);
        }
    }

    isValidEntity(entity) {
        return entity && entity.width && entity.height && entity.pos;
    }

    isValidBoundingBoxOBB(boundingBox) {
        return boundingBox && Array.isArray(boundingBox.corners) && boundingBox.corners.length === 4;
    }

    isValidBoundingBoxAABB(boundingBox) {
        return boundingBox && typeof boundingBox.x === 'number' && typeof boundingBox.y === 'number' &&
            typeof boundingBox.width === 'number' && typeof boundingBox.height === 'number';
    }

    isValidCollisionBoxes(collisionBoxes) {
        return Array.isArray(collisionBoxes) && collisionBoxes.length > 0 && collisionBoxes.every(box => this.isValidBoundingBoxOBB(box));
    }

    isValidPolygon(polygon) {
        return Array.isArray(polygon) && polygon.length > 0;
    }
}
