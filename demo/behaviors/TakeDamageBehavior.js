import Behavior from "../../engine/src/behaviors/Behavior.js";
export default class TakeDamageBehavior extends Behavior {
    constructor(damage) {
        super();
        this.damage = damage;
    }

    perform(entity) {
        const healthComponent = entity.getComponent('health');
        if(healthComponent) {
            healthComponent.takeDamage(this.damage);
        }
    }
}
