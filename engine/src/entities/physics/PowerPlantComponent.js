import BaseComponent from '../../abstracts/BaseComponent.js';

export default class PowerPlantComponent extends BaseComponent {
    constructor(maxEnergy, rechargeRate) {
        super();
        this.maxEnergy = maxEnergy;
        this.energy = maxEnergy;
        this.rechargeRate = rechargeRate;
    }

    recharge(deltaTime) {
        this.energy = Math.min(this.maxEnergy, this.energy + this.rechargeRate * deltaTime);
    }

    consume(amount) {
        if(this.energy >= amount) {
            this.energy -= amount;
            return true;
        }
        return false;
    }

    update(deltaTime) {
        this.recharge(deltaTime);
    }
}
