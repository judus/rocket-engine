import BaseComponent from "../../abstracts/BaseComponent.js";
import CollisionDataUpdateService from "../../physics/collisions/CollisionDataUpdateService.js";
import DetectionTypes from "../../physics/collisions/DetectionTypes.js";

export default class CollisionDataComponent extends BaseComponent {
    constructor(debug = false) {
        super();
        this.debug = debug;
    }

    update(deltaTime) {
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
            if (entity.framePolygons.length) {
                CollisionDataUpdateService.updateFramePolygon(entity);
            }
        }

        if(this.debug) {
            console.log(`Updated collision data for entity ${entity.id}`);
        }
    }
}
