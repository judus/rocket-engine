import BaseComponent from "../../abstracts/BaseComponent.js";

export default class WeaponSystemComponent extends BaseComponent {
    constructor() {
        super();
        this.weaponGroups = {};
        this.activeGroups = new Set();
    }

    createWeaponGroup(groupKey, weaponIndices) {
        this.weaponGroups[groupKey] = weaponIndices;
    }

    switchGroup(groupKey) {
        if(this.activeGroups.has(groupKey)) {
            this.activeGroups.delete(groupKey);
        } else {
            this.activeGroups.add(groupKey);
        }
    }

    fire() {
        this.activeGroups.forEach(groupKey => {
            const weaponIndices = this.weaponGroups[groupKey];
            if(weaponIndices) {
                weaponIndices.forEach(index => {
                    const weaponMounts = this.entity.getComponent('mounts').getMounts('weapon');
                    const mount = weaponMounts[index];
                    if(mount && mount.currentEntity) {
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
