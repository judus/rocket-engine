import AccelerationProfile from './AccelerationProfile.js';
import DecelerationProfile from './DecelerationProfile.js';
import BaseComponent from "../../abstracts/BaseComponent.js";
import MovementState from "./MovementState.js";

export default class MovementComponent extends BaseComponent {
    constructor(movementStates = {}, options = {}) {
        super();

        // Initialize movement states
        this.states = {};
        this.currentState = null;

        // Add movement states to MovementComponent
        movementStates.forEach(state => {
            this.addState(new MovementState(state));
        });
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
            return;
        }

        // Adjust acceleration using the AccelerationProfile
        const adjustedAcc = this.currentState.accelerationProfile.adjustAcceleration(this.entity.vel);

        // Apply adjusted acceleration to velocity
        this.entity.vel.x += this.entity.acc.x * adjustedAcc * deltaTime;
        this.entity.vel.y += this.entity.acc.y * adjustedAcc * deltaTime;

        // Apply drag to velocity
        this.entity.vel.x *= this.entity.drag;
        this.entity.vel.y *= this.entity.drag;

        // Adjust deceleration using the DecelerationProfile
        const adjustedDec = this.currentState.decelerationProfile.adjustDeceleration(this.entity.vel);

        // Apply deceleration if there's no acceleration
        if(this.entity.acc.x === 0) {
            if(this.entity.vel.x > 0) {
                this.entity.vel.x = Math.max(this.entity.vel.x - adjustedDec * deltaTime, 0);
            } else {
                this.entity.vel.x = Math.min(this.entity.vel.x + adjustedDec * deltaTime, 0);
            }
        }

        if(this.entity.acc.y === 0) {
            if(this.entity.vel.y > 0) {
                this.entity.vel.y = Math.max(this.entity.vel.y - adjustedDec * deltaTime, 0);
            } else {
                this.entity.vel.y = Math.min(this.entity.vel.y + adjustedDec * deltaTime, 0);
            }
        }

        // Cap the velocity at the current state's maxSpeed
        const speed = Math.sqrt(this.entity.vel.x ** 2 + this.entity.vel.y ** 2);
        if(speed > this.currentState.maxSpeed) {
            const scale = this.currentState.maxSpeed / speed;
            this.entity.vel.x *= scale;
            this.entity.vel.y *= scale;
        }

        // Update the entity's position based on velocity
        this.entity.pos.set(
            this.entity.pos.x + this.entity.vel.x * deltaTime,
            this.entity.pos.y + this.entity.vel.y * deltaTime
        );

        // Update the rotation towards the direction of velocity
        if(this.entity.vel.x !== 0 || this.entity.vel.y !== 0) {
            const targetRotation = Math.atan2(this.entity.vel.y, this.entity.vel.x); // Ensure no offset
            let rotationDiff = targetRotation - this.entity.rotation;

            // Normalize the rotation difference to the range [-PI, PI]
            rotationDiff = (rotationDiff + Math.PI) % (2 * Math.PI) - Math.PI;

            // Apply the rotation speed to the current rotation
            if(Math.abs(rotationDiff) > this.entity.rotationSpeed * deltaTime) {
                if(rotationDiff > 0) {
                    this.entity.rotation += this.entity.rotationSpeed * deltaTime;
                } else {
                    this.entity.rotation -= this.entity.rotationSpeed * deltaTime;
                }
            } else {
                this.entity.rotation = targetRotation; // If close enough, snap to target rotation
            }

            // Normalize the rotation angle to the range [-PI, PI]
            this.entity.rotation = (this.entity.rotation + Math.PI) % (2 * Math.PI) - Math.PI;
        }
    }

    setInput(dx, dy) {
        this.entity.acc.x = dx;
        this.entity.acc.y = dy;
    }

    setAcceleration(ax, ay) {
        this.entity.acc.x = ax;
        this.entity.acc.y = ay;
    }
}
