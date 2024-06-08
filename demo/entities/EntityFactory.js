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
        this.entityManager = this.engine.entityManager();

        this.dataStoreManager.create('global');
        this.dataStoreManager.create('entities', new SpatialHashGrid2DDataStore(this.eventBus, 100));

        // Initialize the particle system and register it in the global store
        this.dataStoreManager.create('particles', new ParticleGrid(this.eventBus, 100));
        const particleSystem = new ParticleSystem(this.dataStoreManager.getStore('particles'));
        this.dataStoreManager.getStore('global').set('particleSystem', particleSystem);

        // Initialize the projectile pool and register it in the projectile store
        const projectilePool = new ProjectilePool(100, particleSystem);
        this.dataStoreManager.create('projectiles', new ProjectileGrid(this.eventBus, 100, projectilePool));
    }

    createStationFromDefinition(definition, x, y, id, faction) {
        const station = new definition.entityClass(this.dataStoreManager, this.eventBus, definition, x, y, id, faction);
        this.dataStoreManager.getStore('entities').set(station.id, station);
        faction.addStation(station);
        return station;
    }

    createShipFromDefinition(definition, x, y, id, faction, station) {
        const ship = new definition.entityClass(this.engine, definition, x, y, id, faction, station);
        this.dataStoreManager.getStore('entities').set(ship.id, ship);
        faction.addShip(ship);
        station.addShip(ship);
        return ship;
    }

    createFaction(definition) {
        const faction = new definition.entityClass(definition.id, definition.name, definition.color, definition.emblemVertices);
        this.dataStoreManager.getStore('global').set(faction.id, faction);
        return faction;
    }

    createAsteroidFromDefinition(definition, x, y, id, scale) {
        const asteroid = new definition.entityClass(this.engine, definition, x, y, id, scale);
        //console.log(`Asteroid created: ${asteroid.id} at ${x}, ${y}`);
        return asteroid;

    }


    // createPlayer(_definition, x, y) {
    //     const definition = EntityDefinitions.get('starships', 'starship_type_3');
    //
    //     const player = new definition.entityClass(this.engine, definition, x, y, 'player');
    //     console.log(`Player created: ${player.id}`);
    //     return player;
    // }

    createEntity(type, name, x = 0, y = 0, id = null) {
        const definition = EntityDefinitions.get(type, name);
        const entityClass = EntityClasses.getClass(definition.entityClass);
        return new entityClass(this.engine, definition, x, y, id);
    }

}

