// CargoBayComponent.js
import ShipComponent from './ShipComponent.js';

export default class CargoBayComponent extends ShipComponent {
    constructor(profiles, priority, defaultProfile = 'default') {
        super(profiles, defaultProfile, priority);
        this.label = 'Cargo Bay';
        this.cargo = [];
        this.capacity = profiles[defaultProfile].capacityMultiplier;
    }

    addCargo(item) {
        if(this.cargo.length < this.capacity) {
            this.cargo.push(item);
            console.log(`Added ${item.name} to cargo.`);
            return true;
        } else {
            console.warn('Cargo bay is full!');
            return false;
        }
    }

    removeCargo(item) {
        const index = this.cargo.indexOf(item);
        if(index !== -1) {
            this.cargo.splice(index, 1);
            console.log(`Removed ${item.name} from cargo.`);
            return true;
        } else {
            console.warn('Item not found in cargo!');
            return false;
        }
    }

    applyProfile(profileName) {
        const profile = this.profiles[profileName];
        if(profile) {
            this.currentProfile = profileName;
            this.energyCost = profile.energyCost;
            this.capacity = profile.capacityMultiplier;
            console.log(`Applied profile: ${profileName} to CargoBayComponent.`);
        } else {
            console.warn(`Profile ${profileName} not found!`);
        }
    }

    getCargoCount(itemType) {
        return this.cargo.filter(item => item.type === itemType).length;
    }
}
