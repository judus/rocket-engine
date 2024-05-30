import BaseComponent from '../../abstracts/BaseComponent.js';
import MovementState from './MovementState.js';

export default class KeyboardMovementComponent extends BaseComponent {
    constructor(movementStates = {}, options = {}) {
        super();

        // Initialize movement states
        this.states = {};
        this.currentState = null;

        // Add movement states to KeyboardMovementComponent
        movementStates.forEach(state => {
            this.addState(new MovementState(state));
        });

        this.direction = {dx: 0, dy: 0};
    }

    addState(state) {
        this.states[state.name] = state;
    }

    setState(stateName) {
        if(this.states[stateName]) {
            this.currentState = this.states[stateName];
        } else {
            console.warn(`State ${stateName} not found`);
        }
        return this;
    }

    update(deltaTime) {
        if(!this.entity || !this.entity.pos || !this.currentState) {
            console.warn("Entity, entity position, or current state is not defined");
            return;
        }

        const {vel, drag, rotationSpeed, pos} = this.entity;
        const {maxSpeed} = this.currentState;

        // Apply thrust based on dy input
        this.applyThrust(deltaTime);

        // Update rotation based on dx input
        this.updateRotation(deltaTime);

        // Apply drag to velocity
        vel.x *= drag;
        vel.y *= drag;

        // Cap the velocity at the current state's maxSpeed
        const speed = Math.sqrt(vel.x ** 2 + vel.y ** 2);
        if(speed > maxSpeed) {
            const scale = maxSpeed / speed;
            vel.x *= scale;
            vel.y *= scale;
        }

        // Update the entity's position based on velocity
        pos.set(pos.x + vel.x * deltaTime, pos.y + vel.y * deltaTime);
    }

    applyThrust(deltaTime) {
        const {vel} = this.entity;
        const thrust = this.direction.dy;

        if(thrust !== 0) {
            vel.x += Math.cos(this.entity.rotation) * thrust * deltaTime;
            vel.y += Math.sin(this.entity.rotation) * thrust * deltaTime;
        }
    }

    updateRotation(deltaTime) {
        const {rotationSpeed} = this.entity;
        const {dx} = this.direction;

        if(dx !== 0) {
            this.entity.rotation += dx * rotationSpeed * deltaTime;

            // Normalize the rotation angle to the range [-PI, PI]
            this.entity.rotation = (this.entity.rotation + Math.PI) % (2 * Math.PI) - Math.PI;
        }
    }

    setDirection(dx, dy) {
        console.log(dx, dy); // 0, -1 means forward, e.g. my w key
                             // 0, 1 means backward, e.g. my s key
                             // -1, 0 means turn counterclockwise
                             // 1, 0 means turn clockwise

        this.direction.dx = dx;
        this.direction.dy = dy;
    }
}
