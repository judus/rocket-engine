import Weapon from "./Weapon.js";
import Vector3D from "../../utils/maths/Vector3D.js";

export default class KineticWeapon extends Weapon {
    constructor(engine, id = null) {
        const config = {
            type: 'kinetic',
            damage: 15,
            energyConsumption: 2,
            rateOfFire: 1000, // ms
            width: 2,
            height: 2,
            pos: new Vector3D(100, 100, 0)
        };
        super(engine, config, id);
    }

    fire() {
        super.fire();
        console.log('Boom! Kinetic projectile launched.');
    }
}
