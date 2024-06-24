import AttackComponent from "../../engine/src/components/AttackComponent.js";

export default class ShipAttackComponent extends AttackComponent {
    constructor() {
        super();
    }

    attack(scopedMouse, camera) {
        this.entity.hasComponent('weaponSystem', (component) => {
            component.fire();
        }, () => {
            console.warn('No weapon system found on this entity.');
        });
    }
}
