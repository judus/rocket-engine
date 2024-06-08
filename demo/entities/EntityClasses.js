import StarShip from "../../engine/src/entities/physics/StarShip.js";
import LaserWeapon from "../../engine/src/entities/physics/LaserWeapon.js";

export default class EntityClasses {
    static classMap = {
        starship: StarShip,
        laser: LaserWeapon
    }

    static getClass(classReference) {
        const entityClass = this.classMap[classReference];
        if(!entityClass) {
            throw new Error(`Entity class for type ${classReference} not found.`);
        }
        return entityClass;
    }
}