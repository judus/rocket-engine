import AttackComponent from "./AttackComponent.js";

export default class ShipAttackComponent extends AttackComponent {
    constructor() {
        super();
    }

    attack(scopedMouse, camera) {
        console.log('ShipAttackComponent.attack() called.');
        this.entity.hasComponent('weaponSystem', (component) => {
            component.fire();
        }, () => {
            console.warn('No weapon system found on this entity.');
        });
    }
}
