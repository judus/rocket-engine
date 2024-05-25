import {isCollidingSAT} from './collisionUtils.js';

export default class UnifiedCollisionSystem {
    constructor() {
    }

    update(entities) {
        for(let i = 0; i < entities.length; i++) {
            const entityA = entities[i];
            const collisionComponentA = entityA.getComponent('collision');
            if(!collisionComponentA) continue;

            collisionComponentA.collidingEntities = []; // Reset colliding entities

            for(let j = i + 1; j < entities.length; j++) {
                const entityB = entities[j];
                const collisionComponentB = entityB.getComponent('collision');
                if(!collisionComponentB) continue;

                const collisionResult = collisionComponentA.checkCollision(entityB);
                if(collisionResult.collided) {
                    collisionComponentA.collidingEntities.push(entityB);
                    collisionComponentB.collidingEntities.push(entityA);
                }
            }
        }

        // After updating the colliding entities, handle collisions
        for(const entity of entities) {
            const collisionComponent = entity.getComponent('collision');
            if(collisionComponent) {
                collisionComponent.handleCollisions();
            }
        }
    }
}
