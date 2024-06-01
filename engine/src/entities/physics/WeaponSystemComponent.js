import BaseComponent from "../../abstracts/BaseComponent.js";

export default class WeaponSystemComponent extends BaseComponent {
    constructor() {
        super();
        this.weaponGroups = Array(10).fill().map(() => ({active: false, weapons: []}));
    }

    createWeaponGroup(groupNumber, weaponIndices) {
        if(groupNumber < 0 || groupNumber > 9) {
            throw new Error('Group number must be between 0 and 9.');
        }
        this.weaponGroups[groupNumber].weapons = weaponIndices;
    }

    switchGroup(groupNumber) {
        console.log(groupNumber);

        if(groupNumber < 0 || groupNumber > 9) {
            throw new Error('Group number must be between 0 and 9.');
        }
        const group = this.weaponGroups[groupNumber];
        group.active = !group.active;

        const weaponMounts = this.entity.getComponent('mounts').getMounts('weapon');
        group.weapons.forEach(index => {
            const mount = weaponMounts[index];
            if(mount && mount.currentEntity) {
                if(group.active) {
                    console.log(`Activating weapon at mount ${mount.id}.`);
                    mount.currentEntity.activate();
                } else {
                    console.log(`Deactivating weapon at mount ${mount.id}.`);
                    mount.currentEntity.deactivate();
                }
            }
        });
    }

    fire() {
        console.log('WeaponSystemComponent.fire() called.');
        this.weaponGroups.forEach(group => {
            if(group.active) {
                group.weapons.forEach(index => {
                    const weaponMounts = this.entity.getComponent('mounts').getMounts('weapon');
                    const mount = weaponMounts[index];
                    if(mount && mount.currentEntity) {
                        console.log(`Firing weapon at mount ${mount.id}.`);
                        mount.currentEntity.fire();
                    }
                });
            }
        });
    }

    update(deltaTime) {
        // Update logic for the weapon system if necessary
    }
}
