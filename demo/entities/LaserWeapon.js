import Weapon from "./Weapon.js";
import Vector3D from "../../engine/src/utils/maths/Vector3D.js";

export default class LaserWeapon extends Weapon {
    constructor(engine, config, x, y, id = null, ownerId = null) {
        config = {
            ...config,
            width: 12,
            height: 46,
            pos: new Vector3D(100, 100, 0)
        };

        super(engine, config, ownerId, id);

        // this.spriteSheet = this.engine.spriteSheetManager().getSpriteSheet('gunship-fighter-3-weapontype-3');
        // this.addComponent('sprite', new SpriteComponent(this.spriteSheet, 0), 1 / 60);
    }

    fire() {
        super.fire();
    }
}
