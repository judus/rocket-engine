import StarShip from "../entities/StarShip.js";
import LaserWeapon from "../entities/LaserWeapon.js";
import Projectile from "../../engine/src/entities/Projectile.js";
import Faction from "../entities/Faction.js";
import Station from "../entities/Station.js";
import Asteroid from "../entities/Asteroid.js";
import KineticWeapon from "../entities/KineticWeapon.js";

export default class EntityClasses {
    static classMap = {
        asteroid: Asteroid,
        faction: Faction,
        kinetic: KineticWeapon,
        laser: LaserWeapon,
        starship: StarShip,
        station: Station,
        projectile: Projectile,
    }

    static getClass(classReference) {
        const entityClass = this.classMap[classReference];
        if(!entityClass) {
            throw new Error(`Entity class for type ${classReference} not found.`);
        }
        return entityClass;
    }
}