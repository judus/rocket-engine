import BaseComponent from './BaseComponent.js';
const weaponTypes = {
    laserCannon: {
        projectileType: 'laserBeam',
        fireRate: 5,
        damage: 15,
        color: 'blue',
        size: 3,
        lifetime: 2,
        reach: 200,
        influencedByShipVelocity: false
    },
    machineGun: {
        projectileType: 'bullet',
        fireRate: 10,
        damage: 5,
        color: 'yellow',
        size: 1,
        lifetime: 1,
        reach: 100,
        influencedByShipVelocity: true
    }
};

const projectileTypes = {
    laserBeam: {
        color: 'blue',
        size: 3,
        lifetime: 2,
        reach: 200,
        damage: 15,
        influencedByShipVelocity: false
    },
    bullet: {
        color: 'yellow',
        size: 1,
        lifetime: 1,
        reach: 100,
        damage: 5,
        influencedByShipVelocity: true
    }
};


export default class WeaponSystemComponent extends BaseComponent {
    constructor(eventBus, dataStoreManager) {
        super(eventBus, dataStoreManager);
        this.eventBus = eventBus;
        this.dataStoreManager = dataStoreManager;
        this.weapons = []; // List of weapon slots
        this.weaponGroups = {}; // Weapon groups for different configurations
        this.currentGroup = 'default'; // Current active weapon group
    }

    // Add a weapon to a specific slot
    addWeapon(slot, weaponType) {
        this.weapons[slot] = weaponType;
    }

    // Configure weapon groups
    configureGroup(groupName, slots) {
        this.weaponGroups[groupName] = slots;
    }

    // Set the current weapon group
    setGroup(groupName) {
        if(this.weaponGroups[groupName]) {
            this.currentGroup = groupName;
        } else {
            console.error(`Weapon group ${groupName} does not exist`);
        }
    }

    // Fire all weapons in the current group
    fire(scopedMouse) {
        const slots = this.weaponGroups[this.currentGroup];
        if(!slots) {
            console.error(`Weapon group ${this.currentGroup} is empty or does not exist`);
            return;
        }

        slots.forEach(slot => {
            const weaponType = this.weapons[slot];
            if(weaponType) {
                this.fireWeapon(weaponType, scopedMouse);
            }
        });
    }

    // Fire a specific weapon type
    fireWeapon(weaponType, scopedMouse) {
        const weapon = weaponTypes[weaponType];
        if(!weapon) {
            console.error(`Weapon type ${weaponType} does not exist`);
            return;
        }

        const attackComponent = this.entity.getComponent('attack');
        if(attackComponent) {
            attackComponent.attack(scopedMouse, projectileTypes[weapon.projectileType]);
        }
    }
}
