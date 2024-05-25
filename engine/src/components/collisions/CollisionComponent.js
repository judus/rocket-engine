import DefaultCollisionResponse from "./DefaultCollisionResponse.js";
import BaseComponent from "../../abstracts/BaseComponent.js";
import CollisionDetector from "../../physics/collisions/CollisionDetector.js";

export default class CollisionComponent extends BaseComponent {
    constructor(type = 'box' || 'polygon', debug = false, collisionResponse = null) {
        super();
        this.collidingEntities = [];
        this.type = type;
        this.debug = debug;
        this.collisionResponse = collisionResponse || new DefaultCollisionResponse();
    }

    checkCollision(otherEntity) {
        if(!this.entity) {
            console.error(`This entity is invalid or has been removed`);
            return false;
        }

        if(!otherEntity) {
            console.error(`Other entity is null`);
            return false;
        }

        const collisionResult = CollisionDetector.checkCollision(this.entity, otherEntity);

        if(collisionResult && collisionResult.collided && this.debug) {
            console.log(`Collision detected between ${this.entity.id} and ${otherEntity.id}`);
        }

        return collisionResult || {collided: false};
    }

    handleCollisions() {
        this.collidingEntities = this.collidingEntities.filter(entity => entity);

        for(const otherEntity of this.collidingEntities) {
            const collisionResult = this.checkCollision(otherEntity);
            if(collisionResult.collided) {
                this.handleCollision(otherEntity, collisionResult);
            }
        }
    }

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
