import Weapon from "./Weapon.js";

export default class KineticWeapon extends Weapon {
    constructor(engine, config, id = null) {
        super(engine, config, id);
    }

    fire() {
        console.log('KineticWeapon.fire() called.');
        super.fire();
    }
}
