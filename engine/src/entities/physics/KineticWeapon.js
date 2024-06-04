import Weapon from "./Weapon.js";

export default class KineticWeapon extends Weapon {
    constructor(engine, id = null) {
        const config = {
            type: 'kinetic',
            damage: 15,
            energyConsumption: 2,
            rateOfFire: 1000, // ms
            width: 2,
            height: 2,
            pos: {x: 0, y: 0, z: 0}
        };
        super(engine, config, id);
    }

    fire() {
        super.fire();
        console.log('Boom! Kinetic projectile launched.');
    }
}
