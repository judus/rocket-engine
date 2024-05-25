import BaseComponent from '../CameraComponent.js';
import MovementState from './MovementState.js';
import AccelerationProfile from './AccelerationProfile.js';
import DecelerationProfile from './DecelerationProfile.js';

export default class MovementComponent extends BaseComponent {
    constructor(options = {}) {
        super();

        // Define default properties and override with options
        this.vel = options.vel || {x: 0, y: 0}; // Velocity
        this.acc = options.acc || {x: 0, y: 0}; // Acceleration
        this.drag = options.drag || 0.99; // Drag (friction)
        this.rotation = 0; // Current rotation angle in radians
        this.rotationSpeed = options.rotationSpeed || Math.PI * 2; // Rotation speed in radians per second

        // Initialize movement states
        this.states = {};
        this.currentState = null;
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
    }

    update(deltaTime) {
        if(!this.entity || !this.entity.pos || !this.currentState) {
            return;
        }

        // Adjust acceleration using the AccelerationProfile
        const adjustedAcc = this.currentState.accelerationProfile.adjustAcceleration(this.vel);

        // Apply adjusted acceleration to velocity
        this.vel.x += this.acc.x * adjustedAcc * deltaTime;
        this.vel.y += this.acc.y * adjustedAcc * deltaTime;

        // Apply drag to velocity
        this.vel.x *= this.drag;
        this.vel.y *= this.drag;

        // Adjust deceleration using the DecelerationProfile
        const adjustedDec = this.currentState.decelerationProfile.adjustDeceleration(this.vel);

        // Apply deceleration if there's no acceleration
        if(this.acc.x === 0) {
            if(this.vel.x > 0) {
                this.vel.x = Math.max(this.vel.x - adjustedDec * deltaTime, 0);
            } else {
                this.vel.x = Math.min(this.vel.x + adjustedDec * deltaTime, 0);
            }
        }

        if(this.acc.y === 0) {
            if(this.vel.y > 0) {
                this.vel.y = Math.max(this.vel.y - adjustedDec * deltaTime, 0);
            } else {
                this.vel.y = Math.min(this.vel.y + adjustedDec * deltaTime, 0);
            }
        }

        // Cap the velocity at the current state's maxSpeed
        const speed = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2);
        if(speed > this.currentState.maxSpeed) {
            const scale = this.currentState.maxSpeed / speed;
            this.vel.x *= scale;
            this.vel.y *= scale;
        }

        // Update the entity's position based on velocity
        this.entity.pos.set(
            this.entity.pos.x + this.vel.x * deltaTime,
            this.entity.pos.y + this.vel.y * deltaTime
        );

        // Update the rotation towards the direction of velocity
        const targetRotation = Math.atan2(this.vel.y, this.vel.x);
        let rotationDiff = targetRotation - this.rotation;

        // Normalize the rotation difference to the range [-PI, PI]
        rotationDiff = (rotationDiff + Math.PI) % (2 * Math.PI) - Math.PI;

        // Apply the rotation speed to the current rotation
        if(Math.abs(rotationDiff) > this.rotationSpeed * deltaTime) {
            if(rotationDiff > 0) {
                this.rotation += this.rotationSpeed * deltaTime;
            } else {
                this.rotation -= this.rotationSpeed * deltaTime;
            }
        } else {
            this.rotation = targetRotation; // If close enough, snap to target rotation
        }

        // Normalize the rotation angle to the range [-PI, PI]
        this.rotation = (this.rotation + Math.PI) % (2 * Math.PI) - Math.PI;
    }

    setDirection(dx, dy) {
        this.acc.x = dx;
        this.acc.y = dy;
    }

    setAcceleration(ax, ay) {
        this.acc.x = ax;
        this.acc.y = ay;
    }
}
