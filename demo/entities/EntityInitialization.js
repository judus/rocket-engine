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
        for(const factionKey in EntityDefinitions.definitions.factions) {
            console.log(`Creating faction: ${factionKey}`);
            this.entityFactory.createEntity('factions', factionKey);
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
        for(let i = 0; i < 200; i++) {
            // const stationX = this.seededRandom.between(-10000, 10000);
            // const stationY = this.seededRandom.between(-10000, 10000);
            // const stationDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.stations));
            // const randomFactionDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.factions));
            // const randomFaction = factionStore.get(randomFactionDefinition.id);
            //
            // if(!randomFaction) {
            //     throw new Error(`Faction ${randomFactionDefinition.id} not found`);
            // }
            //
            // const stationId = `station-${i}`;
            // const station = this.entityFactory.createStationFromDefinition(stationDefinition, stationX, stationY, stationId, randomFaction);

            // for(let j = 0; j < 5; j++) {
            //     const shipX = this.seededRandom.between(stationX - 500, stationX + 500);
            //     const shipY = this.seededRandom.between(stationY - 500, stationY + 500);
            //     const shipDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.starships));
            //     const shipId = `ship-${i}-${j}`;
            //
            //     this.entityFactory.createShipFromDefinition(shipDefinition, shipX, shipY, shipId, randomFaction, station);
            // }
        }

        for(let i = 0; i < 1000; i++) {
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

        const asteroid = this.entityFactory.createEntity('asteroids', 'asteroid_type_1_256', 700, 400, 'asteroid-home');
        this.entityManager.addEntity(asteroid);

    }
}
