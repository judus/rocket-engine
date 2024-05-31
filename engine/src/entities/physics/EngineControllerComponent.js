import BaseComponent from '../../abstracts/BaseComponent.js';
import Vector3D from "../../utils/maths/Vector3D.js";

export default class EngineControllerComponent extends BaseComponent {
    constructor() {
        super();
        this.profile = 'arcade';
    }

    setInput(ad, ws) {
        if(this.profile === 'arcade') {
            this.setArcadeInput(ad, ws);
        } else if(this.profile === 'advanced') {
            this.setAdvancedInput(ad, ws);
        }
    }

    setArcadeInput(ad, ws) {
        const thrustDirection = new Vector3D(ad, ws, 0); // Map input directly to x and y axis
        const thrustMagnitude = thrustDirection.magnitude();

        if(thrustMagnitude > 1) {
            thrustDirection.normalize();
        }

        const thrustPower = thrustMagnitude;
        this.applyThrust(thrustDirection, thrustPower);
    }

    setAdvancedInput(ad, ws) {
        if(ws !== 0) {
            const torquePower = Math.abs(ws); // Rotate based on ws input
            const torqueDirection = ws > 0 ? 1 : -1; // Clockwise or counterclockwise
            this.applyTorque(torqueDirection, torquePower);
        }

        if(ad !== 0) {
            const thrustDirection = new Vector3D(Math.cos(this.entity.orientation), Math.sin(this.entity.orientation), 0);
            const thrustPower = Math.abs(ad); // Forward or backward thrust based on ad input
            this.applyThrust(thrustDirection.multiply(ad), thrustPower);
        }
    }

    applyThrust(thrustDirection, power) {
        const engine = this.entity.getComponent('engine');
        if(engine) {
            engine.applyThrust(this.entity, thrustDirection, power);
        } else {
            console.log("No engine attached to apply thrust");
        }
    }

    applyTorque(torqueDirection, power) {
        const engine = this.entity.getComponent('engine');
        if(engine) {
            engine.applyTorque(this.entity, torqueDirection, power);
        } else {
            console.log("No engine attached to apply torque");
        }
    }

    setProfile(profile) {
        this.profile = profile;
    }

    update(deltaTime) {
        // Update logic for the engine controller if needed
    }
}
