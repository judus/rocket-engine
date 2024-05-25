import EntityFactory from './EntityFactory.js';
import SeededRandom from "./utils/SeededRandom.js";
import EntityDefinitions from './EntityDefinitions.js';

export default class EntityInitialization {
    constructor(dataStoreManager, eventBus, seed = 12345) {
        this.dataStoreManager = dataStoreManager;
        this.eventBus = eventBus;
        this.seededRandom = new SeededRandom(seed);
        this.entityDefinitions = new EntityDefinitions();
        this.entityFactory = new EntityFactory(dataStoreManager, eventBus);

        // Initialize faction data store
        this.initializeFactions();
    }

    initializeFactions() {
        for(const factionKey in this.entityDefinitions.definitions.factions) {
            const factionDefinition = this.entityDefinitions.definitions.factions[factionKey];
            this.entityFactory.createFaction(factionDefinition);
        }
        console.log(this.dataStoreManager.getStore('global'));
    }

    createEntities() {
        // Predefined entities
        this.entityFactory.createPlayer(0, 0);

        // New Procedure for creating stations and their ships
        const factionStore = this.dataStoreManager.getStore('global');

        for(let i = 0; i < 200; i++) {  // Adjust the number of stations if needed
            // Stations
            const stationX = this.seededRandom.between(-10000, 10000);
            const stationY = this.seededRandom.between(-10000, 10000);
            const stationDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.stations));
            const randomFactionDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.factions));
            const randomFaction = factionStore.get(randomFactionDefinition.id);

            if (!randomFaction) {
                throw new Error(`Faction ${randomFactionDefinition.id} not found`);
            }

            const stationId = `station-${i}`;

            const station = this.entityFactory.createStationFromDefinition(stationDefinition, stationX, stationY, stationId, randomFaction);

            // Ships for each station
            for(let j = 0; j < 5; j++) {  // Each station gets 5 ships
                const shipX = this.seededRandom.between(stationX - 500, stationX + 500);
                const shipY = this.seededRandom.between(stationY - 500, stationY + 500);
                const shipDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.starships));
                const shipId = `ship-${i}-${j}`;

                this.entityFactory.createShipFromDefinition(shipDefinition, shipX, shipY, shipId, randomFaction, station);
            }
        }

        // Asteroids
        for(let i = 0; i < 5000; i++) {  // Adjust the number of asteroids if needed
            const asteroidX = this.seededRandom.between(-10000, 10000);
            const asteroidY = this.seededRandom.between(-10000, 10000);
            const asteroidDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.asteroids));
            const asteroidId = `asteroid-${i}`;
            const scale = this.seededRandom.from([0.3, 0.4, 10, 15], [1000, 1000, 50, 10]);

            this.entityFactory.createAsteroidFromDefinition(asteroidDefinition, asteroidX, asteroidY, asteroidId, scale);
        }


    }
}
