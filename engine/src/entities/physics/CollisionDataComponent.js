import BaseComponent from "../../abstracts/BaseComponent.js";
import CollisionDataUpdateService from "../../physics/collisions/CollisionDataUpdateService.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";

export default class CollisionDataComponent extends BaseComponent {
    constructor(isStatic = false, debug = false) {
        super();
        this.isStatic = isStatic;
        this.debug = debug;
    }

    initialize() {
        this.updateCollisionData(true);
    }

    updateCollisionData(isInitialization = false) {
        if(this.isStatic && !isInitialization) {
            return;
        }

        const entity = this.entity;
        const detectionLevel = entity.collisionDetection || DetectionTypes.OUTER_BOX;

        // Update polygon
        CollisionDataUpdateService.updatePolygon(entity);

        // Update bounding box
        if(detectionLevel === DetectionTypes.OUTER_BOX) {
            CollisionDataUpdateService.updateBoundingBoxOBB(entity);
        } else {
            CollisionDataUpdateService.updateBoundingBoxAABB(entity);
            // Update collision boxes
            CollisionDataUpdateService.updateCollisionBoxes(entity);

            // Update frame polygon if applicable
            if(entity.framePolygons && entity.framePolygons.length) {
                CollisionDataUpdateService.updateFramePolygon(entity);
            }
        }

        if(this.debug) {
            console.log(`${isInitialization ? 'Initialized' : 'Updated'} collision data for entity ${entity.id}`);
        }
    }

    update(deltaTime) {
        this.updateCollisionData();
    }
}
