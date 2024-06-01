import Weapon from "./Weapon.js";

export default class LaserWeapon extends Weapon {
    constructor(engine) {
        const config = {
            type: 'laser',
            damage: 10,
            energyConsumption: 5,
            rateOfFire: 500, // ms
            width: 1,
            height: 2,
            pos: {x: 0, y: 0, z: 0}
        };
        super(engine, config);
    }

    fire() {
        super.fire();
        console.log('Pew Pew! Laser fired.');
    }
}
