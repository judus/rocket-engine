import EntityFactory from './EntityFactory.js';
import EntityDefinitions from './EntityDefinitions.js';
import SeededRandom from "../../engine/src/utils/noise/SeededRandom.js";
import CollisionShapeGenerator from "../../engine/src/physics/collisions/CollisionShapeGenerator.js";
import Polygon from "../../engine/src/utils/maths/Polygon.js";
import EntityManager from "../../engine/src/entities/EntityManager.js";

export default class EntityInitialization {
    constructor(engine, seed = 12345) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStoreManager = this.engine.dataStoreManager();
        this.seededRandom = new SeededRandom(seed);
        this.entityDefinitions = new EntityDefinitions();
        this.entityFactory = new EntityFactory(engine);
        this.entityManager = new EntityManager(this.dataStoreManager);
    }

    initializeFactions() {
        this.dataStoreManager.create('global');

        for(const factionKey in EntityDefinitions.definitions.factions) {
            console.log(`Creating faction: ${factionKey}`);
            const faction = this.entityFactory.createEntity('factions', factionKey);
            this.dataStoreManager.getStore('global').set(factionKey, faction);
        }
    }

    async preloadSprites() {
        const spriteSheetManager = this.engine.service('spriteSheetManager');
        const promises = [];

        for(const type in EntityDefinitions.definitions) {
            const entities = EntityDefinitions.definitions[type];
            for(const key in entities) {
                const definition = entities[key];
                if(definition.sprite) {
                    const {name, image, width, height, orientation} = definition.sprite;
                    promises.push(spriteSheetManager.loadSpriteSheet(name, image, width, height, orientation));
                }
            }
        }
        //console.log(EntityDefinitions.definitions.weapons.laser);

        await Promise.all(promises);
    }

    async initializeEntityDefinition(entityDefinition) {
        let collisionData = entityDefinition.collisionData;

        if(!collisionData) {
            const spriteSheetManager = this.engine.service('spriteSheetManager');
            const sprite = entityDefinition.sprite;

            if(sprite && sprite.name) {
                const spriteSheet = spriteSheetManager.getSpriteSheet(sprite.name);

                if(spriteSheet) {
                    console.log(`Generating collision data for sprite: ${sprite.name}`);
                    collisionData = await CollisionShapeGenerator.generateCollisionData(spriteSheet, entityDefinition.collisionDetection);
                } else {
                    console.error(`Sprite sheet not found: ${sprite.name}`);
                }
            } else {
                // Generate default bounding box data if no sprite is available
                console.log(`Generating default collision data`);
                collisionData = CollisionShapeGenerator.generateDefaultCollisionData(entityDefinition.collisionDetection);
            }

            entityDefinition.collisionData = collisionData;
        }
    }

    async initializeEntityDefinitions() {
        for(const type in EntityDefinitions.definitions) {
            const entities = EntityDefinitions.definitions[type];
            for(const key in entities) {
                const entityDefinition = entities[key];
                await this.initializeEntityDefinition(entityDefinition);
            }
        }
    }

    createEntities() {
        console.log(EntityDefinitions);


        // Predefined entities
        console.log('Creating player entity...');
        const player = this.entityFactory.createEntity('starships', 'starship_type_3', 100, 100, 'player');
        this.entityManager.addEntity(player);
        console.log('Entities created.');

        //Example: dynamically creating stations, ships, and asteroids
        const factionStore = this.dataStoreManager.getStore('global');
        for(let i = 0; i < 100; i++) {
            const stationX = this.seededRandom.between(-50000, 50000);
            const stationY = this.seededRandom.between(-50000, 50000);
            const stationKey = this.seededRandom.from(Object.keys(EntityDefinitions.definitions.stations));
            const stationDefinition = EntityDefinitions.definitions.stations[stationKey];
            const randomFactionKey = this.seededRandom.from(Object.keys(EntityDefinitions.definitions.factions));
            const randomFactionDefinition = EntityDefinitions.definitions.factions[randomFactionKey];
            const randomFaction = factionStore.get(randomFactionKey);

            if(!randomFaction) {
                throw new Error(`Faction ${randomFactionDefinition.id} not found`);
            }

            const stationId = `station-${i}`;
            const station = this.entityFactory.createEntity('stations', stationKey, stationX, stationY, stationId);
            randomFaction.addStation(station); // Add the station to the faction
            this.entityManager.addEntity(station);


            for(let j = 0; j < 1; j++) {
                const shipX = this.seededRandom.between(stationX - 1000, stationX + 1000);
                const shipY = this.seededRandom.between(stationY - 1000, stationY + 1000);
                const shipKey = this.seededRandom.from(Object.keys(EntityDefinitions.definitions.starships));
                const shipDefinition = EntityDefinitions.definitions.starships[shipKey];
                const shipId = `ship-${i}-${j}`;

                const ship = this.entityFactory.createEntity('starships', shipKey, shipX, shipY, shipId);
                ship.isStatic = true;
                randomFaction.addShip(ship); // Add the ship to the faction
                station.addShip(ship); // Add the ship to the station
                this.entityManager.addEntity(ship);
            }
        }
        for(let i = 0; i < 500; i++) {
            const asteroidX = this.seededRandom.between(-50000, 50000);
            const asteroidY = this.seededRandom.between(-50000, 50000);

            // Get the keys of the asteroid definitions
            const asteroidKeys = Object.keys(EntityDefinitions.definitions.asteroids);

            // Select a random key from the asteroid keys
            const asteroidKey = this.seededRandom.from(asteroidKeys);

            // Get the asteroid definition using the selected key
            const asteroidDefinition = EntityDefinitions.definitions.asteroids[asteroidKey];

            const asteroidId = `asteroid-${i}`;
            const scale = this.seededRandom.from([0.3, 0.4, 10, 15], [1000, 1000, 50, 10]);

            const asteroid = this.entityFactory.createEntity('asteroids', asteroidKey, asteroidX, asteroidY, asteroidId, scale);
            this.entityManager.addEntity(asteroid);
        }

        const station = this.entityFactory.createEntity('stations', 'station_type_1', -600, -600, 'station-home');
        this.entityManager.addEntity(station);

        const asteroid = this.entityFactory.createEntity('asteroids', 'asteroid_type_1_256', 700, 400, 'asteroid-home');
        this.entityManager.addEntity(asteroid);

    }
}
