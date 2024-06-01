import BaseComponent from '../../abstracts/BaseComponent.js';
import Vector3D from "../../utils/maths/Vector3D.js";

export default class EngineControllerComponent extends BaseComponent {
    constructor() {
        super();
        this.profile = 'arcade';
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
        if(ws !== 0) {
            const torquePercentage = Math.abs(ws); // Power percentage based on input magnitude (0 to 1)
            const torqueDirection = ws > 0 ? 1 : -1; // Clockwise or counterclockwise
            this.applyTorque(torqueDirection, torquePercentage);
        }

        if(ad !== 0) {
            const thrustDirection = new Vector3D(Math.cos(this.entity.orientation), Math.sin(this.entity.orientation), 0);
            const powerPercentage = Math.abs(ad); // Power percentage based on input magnitude (0 to 1)
            this.applyThrust(thrustDirection.multiply(ad), powerPercentage);
        }
    }

    applyThrust(thrustDirection, powerPercentage) {
        const engine = this.entity.getComponent('engine');
        if(engine) {
            engine.applyThrust(this.entity, thrustDirection, powerPercentage);
        } else {
            console.log("No engine attached to apply thrust");
        }
    }

    applyTorque(torqueDirection, powerPercentage) {
        const engine = this.entity.getComponent('engine');
        if(engine) {
            engine.applyTorque(this.entity, torqueDirection, powerPercentage);
        } else {
            console.log("No engine attached to apply torque");
        }
    }

    setProfile(profile) {
        this.profile = profile;
    }

    update(deltaTime) {
        const {ad, ws} = this.currentInput;
        if(this.profile === 'arcade') {
            this.setArcadeInput(ad, ws);
        } else if(this.profile === 'advanced') {
            this.setAdvancedInput(ad, ws);
        }
    }
}
