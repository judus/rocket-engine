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
        return this;
    }

    applyThrust(entity, thrustDirection, powerPercentage) {
        //console.log(powerPercentage);
        if(thrustDirection.magnitude() === 0) return;

        const efficiency = this.stateModifiers.efficiency || 1;
        const maxThrust = this.stateModifiers.maxThrust || 10000;

        const thrustPower = maxThrust * powerPercentage * efficiency;
        //console.log('thrustPower', thrustPower);

        const thrustMagnitude = Math.min(thrustPower, maxThrust);
        const thrust = thrustDirection.normalize().multiply(thrustMagnitude);
        //console.log('thrust', thrust);

        const energyRequired = thrustMagnitude / efficiency;
        //console.log(`Thrust magnitude: ${thrustMagnitude}, Efficiency: ${efficiency}, EnergyRequired: ${energyRequired}`);

        const powerPlant = entity.getComponent('powerPlant');

        if(powerPlant && powerPlant.consume(energyRequired)) {
            //console.log('Engine calls applyForce with thrust', thrust);
            CustomPhysics2D.applyForce(entity, thrust);
        } else {
            //console.log(`Insufficient energy to apply thrust. Required: ${energyRequired}, Available: ${powerPlant ? powerPlant.energy : 'N/A'}`);
        }
    }

    applyTorque(entity, torqueDirection, powerPercentage) {
        if(powerPercentage === 0) return;

        const efficiency = this.stateModifiers.efficiency || 1;
        const maxTorque = this.stateModifiers.maxTorque || 10000;

        const torquePower = maxTorque * powerPercentage * efficiency;
        const torqueMagnitude = Math.min(torquePower, maxTorque);
        const torque = torqueDirection * torqueMagnitude;

        const energyRequired = torqueMagnitude / efficiency;
        const powerPlant = entity.getComponent('powerPlant');

        //console.log(`Torque magnitude: ${torqueMagnitude}, Efficiency: ${efficiency}, EnergyRequired: ${energyRequired}`);

        if(powerPlant && powerPlant.consume(energyRequired)) {
            //console.log('Engine calls applyTorque with torque', torque);
            CustomPhysics2D.applyTorque(entity, torque);
        } else {
            console.log("Insufficient energy to apply torque");
        }
    }
}
