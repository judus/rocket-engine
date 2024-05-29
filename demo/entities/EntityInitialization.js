import EntityFactory from './EntityFactory.js';
import EntityDefinitions from './EntityDefinitions.js';
import SeededRandom from "../../engine/src/utils/noise/SeededRandom.js";
import CollisionShapeGenerator from "../../engine/src/physics/collisions/CollisionShapeGenerator.js";
import Polygon from "../../engine/src/utils/maths/Polygon.js";

export default class EntityInitialization {
    constructor(engine, seed = 12345) {
        this.engine = engine;
        this.eventBus = this.engine.eventBus();
        this.dataStoreManager = this.engine.dataStoreManager();
        this.seededRandom = new SeededRandom(seed);
        this.entityDefinitions = new EntityDefinitions();
        this.entityFactory = new EntityFactory(this.engine);
    }

    initializeFactions() {
        for(const factionKey in this.entityDefinitions.definitions.factions) {
            const factionDefinition = this.entityDefinitions.definitions.factions[factionKey];
            console.log(`Creating faction: ${factionKey}`);
            this.entityFactory.createFaction(factionDefinition);
        }
    }

    async preloadSprites() {
        const spriteSheetManager = this.engine.service('spriteSheetManager');
        const promises = [];

        for(const type in this.entityDefinitions.definitions) {
            const entities = this.entityDefinitions.definitions[type];
            for(const key in entities) {
                const definition = entities[key];
                if(definition.sprite) {
                    const {name, image, width, height, orientation} = definition.sprite;
                    promises.push(spriteSheetManager.loadSpriteSheet(name, image, width, height, orientation));
                }
            }
        }

        await Promise.all(promises);
    }

    async initializeEntityDefinition(entityDefinition) {
        if(entityDefinition.sprite) {
            let collisionData = entityDefinition.collisionData;

            if(!collisionData) {
                const spriteSheetManager = this.engine.service('spriteSheetManager');
                const sprite = entityDefinition.sprite;
                const spriteSheet = spriteSheetManager.getSpriteSheet(sprite.name);

                if(spriteSheet) {
                    console.log(`Generating collision data for sprite: ${sprite.name}`);
                    collisionData = await CollisionShapeGenerator.generateCollisionData(spriteSheet, entityDefinition.collisionDetection);
                    entityDefinition.collisionData = collisionData;
                } else {
                    console.error(`Sprite sheet not found: ${sprite.name}`);
                }
            }
        }

        if(entityDefinition.polygon && entityDefinition.polygon.vertices && entityDefinition.polygon.orientation) {
            const polygon = new Polygon(entityDefinition.polygon.vertices);
            polygon.rotate(entityDefinition.polygon.orientation);
            entityDefinition.polygon.vertices = polygon.vertices;
        }

        console.log('Entity definition initialized:', entityDefinition);
    }

    async initializeEntityDefinitions() {
        for(const type in this.entityDefinitions.definitions) {
            const entities = this.entityDefinitions.definitions[type];
            for(const key in entities) {
                const entityDefinition = entities[key];
                await this.initializeEntityDefinition(entityDefinition);
            }
        }
    }

    createEntities() {
        // Predefined entities
        const playerDefinition = this.entityDefinitions.get('starships', 'starship_type_3');
        console.log('Creating player entity...');
        this.entityFactory.createPlayer(playerDefinition, 0, 0);
        console.log('Entities created.');

        //Example: dynamically creating stations, ships, and asteroids
        const factionStore = this.dataStoreManager.getStore('global');
        for(let i = 0; i < 200; i++) {
            const stationX = this.seededRandom.between(-10000, 10000);
            const stationY = this.seededRandom.between(-10000, 10000);
            const stationDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.stations));
            const randomFactionDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.factions));
            const randomFaction = factionStore.get(randomFactionDefinition.id);

            if(!randomFaction) {
                throw new Error(`Faction ${randomFactionDefinition.id} not found`);
            }

            const stationId = `station-${i}`;
            const station = this.entityFactory.createStationFromDefinition(stationDefinition, stationX, stationY, stationId, randomFaction);

            for(let j = 0; j < 5; j++) {
                const shipX = this.seededRandom.between(stationX - 500, stationX + 500);
                const shipY = this.seededRandom.between(stationY - 500, stationY + 500);
                const shipDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.starships));
                const shipId = `ship-${i}-${j}`;

                this.entityFactory.createShipFromDefinition(shipDefinition, shipX, shipY, shipId, randomFaction, station);
            }
        }

        for(let i = 0; i < 5000; i++) {
            const asteroidX = this.seededRandom.between(-10000, 10000);
            const asteroidY = this.seededRandom.between(-10000, 10000);
            const asteroidDefinition = this.seededRandom.from(Object.values(this.entityDefinitions.definitions.asteroids));
            const asteroidId = `asteroid-${i}`;
            const scale = this.seededRandom.from([0.3, 0.4, 10, 15], [1000, 1000, 50, 10]);

            this.entityFactory.createAsteroidFromDefinition(asteroidDefinition, asteroidX, asteroidY, asteroidId, scale);
        }
    }
}
