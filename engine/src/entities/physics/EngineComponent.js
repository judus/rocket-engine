import BaseComponent from '../../abstracts/BaseComponent.js';
import CustomPhysics2D from "../../physics/CustomPhysics2D.js";

export default class EngineComponent extends BaseComponent {
    constructor(engineProfile) {
        super();
        this.engineProfile = engineProfile;
        this.stateModifiers = {};
    }

    setState(name) {
        this.stateModifiers = this.engineProfile.states[name] || {};
    }

    applyThrust(entity, thrustDirection, power) {
        const efficiency = this.stateModifiers.efficiency || 1;
        const maxThrust = this.stateModifiers.maxThrust || 1000;

        const thrustPower = power * efficiency;
        const thrustMagnitude = thrustPower / thrustDirection.magnitude();

        const limitedThrustMagnitude = Math.min(thrustMagnitude, maxThrust);
        const thrust = thrustDirection.normalize().multiply(limitedThrustMagnitude);

        const energyRequired = limitedThrustMagnitude * thrustDirection.magnitude() / efficiency;
        const powerPlant = entity.getComponent('powerPlant');
        if(powerPlant && powerPlant.consume(energyRequired)) {
            CustomPhysics2D.applyForce(entity, thrust);
        } else {
            console.log("Insufficient energy to apply thrust");
        }
    }

    applyTorque(entity, torqueDirection, power) {
        const efficiency = this.stateModifiers.efficiency || 1;
        const maxTorque = this.stateModifiers.maxTorque || 500;

        const torquePower = power * efficiency;
        const torqueMagnitude = torquePower / Math.abs(torqueDirection);

        const limitedTorqueMagnitude = Math.min(torqueMagnitude, maxTorque);
        const torque = torqueDirection * limitedTorqueMagnitude;

        const energyRequired = limitedTorqueMagnitude * Math.abs(torqueDirection) / efficiency;
        const powerPlant = entity.getComponent('powerPlant');
        if(powerPlant && powerPlant.consume(energyRequired)) {
            CustomPhysics2D.applyTorque(entity, torque);
        } else {
            console.log("Insufficient energy to apply torque");
        }
    }
}
