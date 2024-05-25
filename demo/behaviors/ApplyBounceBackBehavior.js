import Behavior from "../../engine/src/behaviors/Behavior.js";

export default class ApplyBounceBackBehavior extends Behavior {
    constructor(bounceFactor = 0.5) {
        super();
        this.bounceFactor = bounceFactor;
    }

    perform(entity) {
        const movementComponent = entity.getComponent('movement');
        if(movementComponent) {
            movementComponent.vel.x = -movementComponent.vel.x * this.bounceFactor;
            movementComponent.vel.y = -movementComponent.vel.y * this.bounceFactor;
        }
    }

    isComplete(entity) {
        // This behavior is considered complete immediately after it's performed
        return true;
    }
}
