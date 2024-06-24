import ShipComponent from './ShipComponent.js';
import {convertMegawattsToJoulesPerSecond} from '../../engine/src/utils/powerConversion.js';

export default class ReactorComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        const profile = profiles[defaultProfile];
        this.label = 'Reactor';
        this.maxEnergy = convertMegawattsToJoulesPerSecond(profile.maxEnergyMW);
        this.rechargeRate = convertMegawattsToJoulesPerSecond(profile.rechargeRateMW);
        this.energy = this.maxEnergy;
    }

    setEnergyManager(energyManager) {
        this.energyManager = energyManager;
    }

    recharge(deltaTime) {
        if(this.isActive) {
            this.energy = Math.min(this.maxEnergy, this.energy + this.rechargeRate * deltaTime);
            this.energyManager && this.energyManager.updateEnergy(this.energy);
        }
    }

    consume(amount) {
        if(this.isActive && this.energy >= amount) {
            this.energy -= amount;
            this.energyManager && this.energyManager.updateEnergy(this.energy);
            return true;
        }
        return false;
    }

    update(deltaTime) {
        this.recharge(deltaTime);
        this.entity.eventBus.emit('reactor.update', this);
    }

    activate() {
        if(this.userRequestedState && !this.isActive) {
            this.isActive = true;
            console.log(`${this.label} activated`);
            this.entity.eventBus.emit('component.activate', {component: this});
        }
    }

    deactivate() {
        if(!this.userRequestedState && this.isActive) {
            this.isActive = false;
            console.log(`${this.label} deactivated`);
            this.entity.eventBus.emit('component.deactivate', {component: this});
            this.energyManager && this.energyManager.updateEnergy(0); // Ensure energy is set to 0 when deactivated
        }
    }
}
