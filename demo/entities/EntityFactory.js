import Player from './Player.js';
import Station from './Station.js';
import SpatialHashGrid2DDataStore from "../../engine/src/datastores/SpatialHashGrid2DDataStore.js";
import ProjectilePool from "../../engine/src/datastores/ProjectilePool.js";
import ProjectileGrid from "../../engine/src/datastores/ProjectileGrid.js";
import ParticleGrid from "../../engine/src/datastores/ParticleGrid.js";
import ParticleSystem from "../../engine/src/particles/ParticleSystem.js";
import EntityDefinitions from "./EntityDefinitions.js";
import EntityClasses from "./EntityClasses.js";

export default class EntityFactory {
    constructor(engine) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStoreManager = this.engine.dataStoreManager();

    }

    createEntity(type, name, x = 0, y = 0, id = null) {
        const definition = EntityDefinitions.get(type, name);
        const entityClass = EntityClasses.getClass(definition.entityClass);
        return new entityClass(this.engine, definition, x, y, id);
    }

    createProjectile(name, initialPosition, velocity, ownerId) {
        const definition = EntityDefinitions.get('projectiles', name);
        const entityClass = EntityClasses.getClass(definition.entityClass);
        const config = {
            ...definition,
            pos: initialPosition,
            velocity: velocity
        };
        const projectile = new entityClass(this.engine, config);
        projectile.ownerId = ownerId;
        return projectile;
    }

}

