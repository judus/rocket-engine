import BaseComponent from '../../abstracts/BaseComponent.js';
import Vector3D from "../../utils/maths/Vector3D.js";

export default class EngineControllerComponent extends BaseComponent {
    constructor() {
        super();
        this.profile = 'arcade';
        this.autoOrient = true;
        this.target = null;


        this.currentInput = {ad: 0, ws: 0};
    }

    setInput(ad, ws) {
        this.currentInput = {ad, ws};
    }

    setArcadeInput(ad, ws) {
        const thrustDirection = new Vector3D(ad, ws, 0); // Map input directly to x and y axis
        const thrustMagnitude = thrustDirection.magnitude();

        if(thrustMagnitude > 0) {
            if(thrustMagnitude > 1) {
                thrustDirection.normalize();
            }

            const powerPercentage = thrustMagnitude; // Power percentage based on input magnitude (0 to 1)
            this.applyThrust(thrustDirection, powerPercentage);
        }
    }

    setAdvancedInput(ad, ws) {
        // Apply torque for rotation
        if(ad !== 0) {
            const torqueDirection = ad > 0 ? 1 : -1; // Clockwise or counterclockwise
            const powerPercentage = Math.abs(ad);
            this.applyTorque(torqueDirection, powerPercentage);
        }

        // Apply thrust based on the current orientation
        if(ws !== 0) {
            const directionMultiplier = ws > 0 ? -1 : 1; // Reversed: forward thrust with S, backward thrust with W
            const thrustDirection = new Vector3D(
                Math.cos(this.entity.orientation) * directionMultiplier,
                Math.sin(this.entity.orientation) * directionMultiplier,
                0
            );
            const powerPercentage = Math.abs(ws); // Power percentage based on input magnitude (0 to 1)
            this.applyThrust(thrustDirection, powerPercentage);
        }
    }

    applyThrust(thrustDirection, powerPercentage) {
        this.entity.hasComponent('engine', (engine) => {
            engine.applyThrust(this.entity, thrustDirection, powerPercentage);
        }, () => {
            console.log("No engine attached to apply thrust");
        });
    }

    applyTorque(torqueDirection, powerPercentage) {
        this.entity.hasComponent('engine', (engine) => {
            //console.log('Applying torque', torqueDirection, powerPercentage);
            engine.applyTorque(this.entity, torqueDirection, powerPercentage);
        }, () => {
            console.log("No engine attached to apply thrust");
        });
    }

    update(deltaTime) {
        const {ad, ws} = this.currentInput;
        if(this.profile === 'arcade') {
            this.setArcadeInput(ad, ws);
            this.handleAutoOrientation();
        } else if(this.profile === 'advanced') {
            this.setAdvancedInput(ad, ws);
            this.entity.rotation = this.entity.orientation;
        }
    }

    handleAutoOrientation() {
        if(this.autoOrient) {
            if(this.target) {
                const directionToTarget = this.target.pos.subtract(this.entity.pos).normalize();
                this.entity.rotation = Math.atan2(directionToTarget.y, directionToTarget.x);
            } else if(this.entity.velocity.magnitude() > 0) {
                //console.log("Auto orienting based on velocity");
                const direction = this.entity.velocity.normalize();
                this.entity.rotation = Math.atan2(direction.y, direction.x);
            }
        }
    }

    setProfile(profile) {
        this.profile = profile;
    }

    switchProfile() {
        this.profile = this.profile === 'arcade' ? 'advanced' : 'arcade';
        this.entity.eventBus.emit('component.engineController.mode', this.profile);

        //console.log('Switched profile to', this.profile);
    }


    switchOrientationMode() {
        this.autoOrient = this.autoOrient !== true;
        //console.log(`Switched auto orientation ${this.autoOrient?'ON':'OFF'}`);
    }
}
