import StarShip from "../../engine/src/entities/physics/StarShip.js";
import LaserWeapon from "../../engine/src/entities/physics/LaserWeapon.js";
import Projectile from "../../engine/src/entities/physics/Projectile.js";
import Faction from "./Faction.js";
import Station from "./Station.js";
import Asteroid from "../../engine/src/entities/physics/Asteroid.js";

export default class EntityClasses {
    static classMap = {
        asteroid: Asteroid,
        faction: Faction,
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