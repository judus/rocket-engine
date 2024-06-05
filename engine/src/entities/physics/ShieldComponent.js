// ShieldComponent.js
import ShipComponent from './ShipComponent.js';
import {convertMegawattsToJoulesPerSecond} from '../../utils/powerConversion.js';

export default class ShieldComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        const profile = profiles[defaultProfile];
        this.label = 'Shields';
        this.shieldStrength = profile.shieldStrength;
        this.rechargeRate = convertMegawattsToJoulesPerSecond(profile.rechargeRateMW); // Convert MW to J/s
        this.currentShield = this.shieldStrength;
    }

    recharge(deltaTime) {
        if(this.currentShield < this.shieldStrength) {
            this.currentShield = Math.min(this.shieldStrength, this.currentShield + this.rechargeRate * deltaTime);
        }
    }

    update(deltaTime) {
        if(this.isActive) {
            this.recharge(deltaTime);
        }
    }
}
