import Player from './Player.js';
import Station from './Station.js';
import SpatialHashGrid2DDataStore from "../../engine/src/datastores/SpatialHashGrid2DDataStore.js";
import ProjectilePool from "../../engine/src/datastores/ProjectilePool.js";
import ProjectileGrid from "../../engine/src/datastores/ProjectileGrid.js";
import ParticleGrid from "../../engine/src/datastores/ParticleGrid.js";
import ParticleSystem from "../../engine/src/particles/ParticleSystem.js";

export default class EntityFactory {
    constructor(engine) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStoreManager = this.engine.dataStoreManager();

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
        const asteroid = new definition.entityClass(this.dataStoreManager, this.eventBus, definition, x, y, id, scale);
        this.dataStoreManager.getStore('entities').set(asteroid.id, asteroid);
        return asteroid;
    }

    createPlayer(definition, x, y) {
        const player = new Player(this.engine, definition, x, y, 'player');
        this.dataStoreManager.getStore('entities').set(player.id, player);
        return player;
    }
}

