import BaseComponent from "../../abstracts/BaseComponent.js";

export default class WeaponSystemComponent extends BaseComponent {
    constructor() {
        super();
        this.weaponGroups = {};
        this.activeGroup = null;
    }

    createWeaponGroup(groupKey, weaponIndices) {
        this.weaponGroups[groupKey] = weaponIndices;
        this.entity.eventBus.emit('weaponGroups.update', this.weaponGroups);
    }

    switchGroup(groupKey) {
        if(this.weaponGroups[groupKey]) {
            this.activeGroup = groupKey;
            this.entity.eventBus.emit('activeGroup.update', groupKey);
        } else {
            console.warn(`Weapon group ${groupKey} does not exist.`);
        }
    }

    fire() {
        if(this.activeGroup) {
            const weaponIndices = this.weaponGroups[this.activeGroup];
            if(weaponIndices) {
                weaponIndices.forEach(index => {
                    const weaponMounts = this.entity.getComponent('mounts').getMounts('weapon');
                    const mount = weaponMounts[index];
                    if(mount && mount.currentEntity) {
                        mount.currentEntity.fire();
                    }
                });
            }
        }
    }

    getWeaponGroups() {
        return this.weaponGroups;
    }

    getActiveGroup() {
        return this.activeGroup;
    }

    update(deltaTime) {
        // Update logic for the weapon system if necessary
    }
}
