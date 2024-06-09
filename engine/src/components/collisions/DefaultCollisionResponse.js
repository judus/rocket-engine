import CollisionResponse from './CollisionResponse.js';
import SequentialBehavior from '../../behaviors/SequentialBehavior.js';
import ShowExplosionBehavior from "../../../../demo/behaviors/ShowExplosionBehavior.js";
import ApplyBounceBackBehavior from "../../../../demo/behaviors/ApplyBounceBackBehavior.js";
import TakeDamageBehavior from "../../../../demo/behaviors/TakeDamageBehavior.js";

export default class DefaultCollisionResponse extends CollisionResponse {
    constructor(particleSystem) {
        super();
        if(particleSystem) {
            this.behavior = new SequentialBehavior([
                new ShowExplosionBehavior(particleSystem),
                new ApplyBounceBackBehavior(0.5),
                new TakeDamageBehavior(10)
            ]);
        }
    }

    // handleCollision(entity, otherEntity, collisionResult) {
    //     console.log(`Default collision response: ${entity.id} collided with ${otherEntity.id}`);
    //     this.behavior.perform(entity);
    // }

    handleCollision(entity, otherEntity, collisionResult) {
        if(otherEntity.takeDamage) {
            otherEntity.takeDamage(entity.damage || 10); // Apply the entity's damage or a default value
        }

        if(entity.onCollision) {
            entity.onCollision(otherEntity, collisionResult);
        }
    }
}
