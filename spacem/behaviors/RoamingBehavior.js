import Behavior from "./Behavior.js";

/*
const player = new Player(dataStoreManager, eventBus, x, y, id);

// Set to roaming behavior with a 100 unit radius and return speed of 50 units per second
const originalPosition = { x: player.pos.x, y: player.pos.y };
player.setBehavior(new RoamingBehavior(originalPosition, 100, 50));
 */

export default class RoamingBehavior extends Behavior {
    constructor(originalPosition, roamingRadius, returnSpeed) {
        super();
        this.originalPosition = originalPosition;
        this.roamingRadius = roamingRadius;
        this.returnSpeed = returnSpeed;
        this.currentTarget = this.getRandomTarget();
        this.state = 'roaming'; // can be 'roaming' or 'returning'
    }

    getRandomTarget() {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * this.roamingRadius;
        return {
            pos: {
                x: this.originalPosition.pos.x + distance * Math.cos(angle),
                y: this.originalPosition.pos.y + distance * Math.sin(angle)
            }
        };
    }

    perform(entity) {
        const transformComponent = entity.getComponent('transform');
        const movementComponent = entity.getComponent('movement');
        if(transformComponent && movementComponent) {
            const currentPosition = entity.pos;
            let target;

            if(this.state === 'roaming') {
                target = this.currentTarget;
                const distanceToTarget = Math.hypot(target.pos.x - currentPosition.x, target.pos.y - currentPosition.y);
                if(distanceToTarget < 5) { // Reached target
                    this.state = 'returning';
                }
            } else if(this.state === 'returning') {
                target = this.originalPosition;
                const distanceToOrigin = Math.hypot(target.pos.x - currentPosition.x, target.pos.y - currentPosition.y);
                if(distanceToOrigin < 5) { // Reached original position
                    this.state = 'roaming';
                    this.currentTarget = this.getRandomTarget();
                }
            }

            // Set direction towards target
            const dx = target.pos.x - currentPosition.x;
            const dy = target.pos.y - currentPosition.y;
            const angle = Math.atan2(dy, dx);

            const speed = this.state === 'returning' ? this.returnSpeed : movementComponent.currentState.maxSpeed;
            movementComponent.setDirection(Math.cos(angle) * (speed / 100), Math.sin(angle) * (speed / 100));

            // Update the rotation to face the target
            transformComponent.faceTarget(target);
        }
    }
}
