import Behavior from './Behavior.js';

export default class FaceVelocityBehavior extends Behavior {
    perform(entity) {
        const transformComponent = entity.getComponent('transform');
        const movementComponent = entity.getComponent('movement');
        if(transformComponent && movementComponent) {
            transformComponent.faceVelocity(movementComponent.vel);
        }
    }
}