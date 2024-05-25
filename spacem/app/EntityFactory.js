import Player from './Player.js';
import Enemy from './Enemy.js';
import Station from './Station.js';

export default class EntityFactory {
    constructor(dataStoreManager, eventBus) {
        this.dataStoreManager = dataStoreManager;
        this.eventBus = eventBus;
    }

    createStationFromDefinition(definition, x, y, id, faction) {
        const station = new definition.entityClass(this.dataStoreManager, this.eventBus, definition, x, y, id, faction);
        this.dataStoreManager.getStore('entities').set(station.id, station);
        faction.addStation(station);
        return station;
    }

    createShipFromDefinition(definition, x, y, id, faction, station) {
        const ship = new definition.entityClass(this.dataStoreManager, this.eventBus, definition, x, y, id, faction, station);
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

    createPlayer(x, y) {
        const player = new Player(this.dataStoreManager, this.eventBus, x, y, 'player');
        this.dataStoreManager.getStore('entities').set(player.id, player);
        return player;
    }
}

