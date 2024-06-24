// EngineComponent.js
import ShipComponent from './ShipComponent.js';
import CustomPhysics2D from "../../engine/src/physics/CustomPhysics2D.js";

export default class EngineComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        this.label = 'Engine';
        this.stateModifiers = profiles[defaultProfile].states || {};
    }

    setState(name) {
        this.stateModifiers = this.profiles[this.currentProfile].states[name] || {};
        return this;
    }

    applyThrust(entity, thrustDirection, powerPercentage) {
        if(thrustDirection.magnitude() === 0) return;

        const efficiency = this.stateModifiers.efficiency || 1;
        const maxThrust = this.stateModifiers.maxThrust || 10000;

        const thrustPower = maxThrust * powerPercentage * efficiency;
        const thrustMagnitude = Math.min(thrustPower, maxThrust);
        const thrust = thrustDirection.normalize().multiply(thrustMagnitude);

        const energyRequired = thrustMagnitude / efficiency;
        const powerPlant = entity.getComponent('powerPlant');

        if(powerPlant && powerPlant.consume(energyRequired)) {
            CustomPhysics2D.applyForce(entity, thrust);
            if(this.heatManager) {
                this.heatManager.addHeat(this.heatProductionRate * powerPercentage);
            }
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

        if(powerPlant && powerPlant.consume(energyRequired)) {
            CustomPhysics2D.applyTorque(entity, torque);
            if(this.heatManager) {
                this.heatManager.addHeat(this.heatProductionRate * powerPercentage);
            }
        }
    }
}
