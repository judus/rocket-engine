import Weapon from "./Weapon.js";
import RenderComponent from "../../components/RenderComponent.js";
import Drawing from "../../services/Drawing.js";
import SpriteComponent from "../../sprites/SpriteComponent.js";
import Vector3D from "../../utils/maths/Vector3D.js";

export default class LaserWeapon extends Weapon {
    constructor(engine, id = null) {
        const config = {
            type: 'laser',
            damage: 10,
            energyConsumption: 5,
            rateOfFire: 500, // ms
            width: 12,
            height: 46,
            pos: new Vector3D(100, 100, 0)
        };

        super(engine, config, id);

        this.spriteSheet = this.engine.spriteSheetManager().getSpriteSheet('gunship-fighter-2-weapontype-1');
        this.addComponent('sprite', new SpriteComponent(this.spriteSheet, 0), 1 / 60);
    }

    fire() {
        super.fire();
        console.log('Pew Pew! Laser fired.');
    }
}
