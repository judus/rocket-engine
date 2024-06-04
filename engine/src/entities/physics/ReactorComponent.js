import ShipComponent from './ShipComponent.js';
import {convertMegawattsToJoulesPerSecond} from '../../utils/powerConversion.js';

export default class ReactorComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        const profile = profiles[defaultProfile];
        this.label = 'Reactor';
        this.maxEnergy = convertMegawattsToJoulesPerSecond(profile.maxEnergyMW);
        this.energy = this.maxEnergy;
        this.rechargeRate = convertMegawattsToJoulesPerSecond(profile.rechargeRateMW);
    }

    setEnergyManager(energyManager) {
        this.energyManager = energyManager;
    }

    recharge(deltaTime) {
        this.energy = Math.min(this.maxEnergy, this.energy + this.rechargeRate * deltaTime);
        this.energyManager && this.energyManager.updateEnergy(this.energy);
        if(this.heatManager) {
            this.heatManager.addHeat(this.heatProductionRate * deltaTime);
        }
    }

    consume(amount) {
        if(this.energy >= amount) {
            this.energy -= amount;
            this.energyManager && this.energyManager.updateEnergy(this.energy);
            return true;
        }
        return false;
    }

    update(deltaTime) {
        this.recharge(deltaTime);
    }
}
