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
                    const {name, image, width, height, orientation, scale} = definition.sprite;
                    console.log(`Loading sprite sheet: ${name}`);
                    promises.push(spriteSheetManager.loadSpriteSheet(name, image, width, height, orientation, scale));
                }
                if (definition.sprites?.length) {
                    definition.sprites.forEach(sprite => {
                        const {name, image, width, height, orientation, scale} = sprite;
                        promises.push(spriteSheetManager.loadSpriteSheet(name, image, width, height, orientation, scale));
                    });
                }
            }
        }

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
                    //console.log(`Generating collision data for sprite: ${sprite.name}`);
                    collisionData = await CollisionShapeGenerator.generateCollisionData(spriteSheet, entityDefinition.collisionDetection);
                } else {
                    console.error(`Sprite sheet not found: ${sprite.name}`);
                }
            } else {
                // Generate default bounding box data if no sprite is available
                //console.log(`Generating default collision data`);
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

        // Predefined entities
        const player = this.entityFactory.createEntity('starships', 'ships_ship_20', 0, 0, 'player');
        this.entityManager.addEntity(player);
        //
        // const ship_1 = this.entityFactory.createEntity('starships', 'ships_ship_1', -500, 0, 'ship_1');
        // this.entityManager.addEntity(ship_1);
        //
        // const ship_2 = this.entityFactory.createEntity('starships', 'ships_ship_2', -500, 500, 'ship_2');
        // this.entityManager.addEntity(ship_2);
        //
        // const ship_3 = this.entityFactory.createEntity('starships', 'ships_ship_3', -500, 1000, 'ship_3');
        // this.entityManager.addEntity(ship_3);
        //
        // const ship_4 = this.entityFactory.createEntity('starships', 'ships_ship_4', -500, 1500, 'ship_4');
        // this.entityManager.addEntity(ship_4);
        //
        // const ship_5 = this.entityFactory.createEntity('starships', 'ships_ship_5', -500, 2000, 'ship_5');
        // this.entityManager.addEntity(ship_5);
        //
        // const ship_6 = this.entityFactory.createEntity('starships', 'ships_ship_6', -500, 2500, 'ship_6');
        // this.entityManager.addEntity(ship_6);
        //
        // const ship_7 = this.entityFactory.createEntity('starships', 'ships_ship_7', -500, 3000, 'ship_7');
        // this.entityManager.addEntity(ship_7);
        //
        // const ship_8 = this.entityFactory.createEntity('starships', 'ships_ship_8', -500, 3500, 'ship_8');
        // this.entityManager.addEntity(ship_8);
        //
        // const ship_9 = this.entityFactory.createEntity('starships', 'ships_ship_9', -500, 4000, 'ship_9');
        // this.entityManager.addEntity(ship_9);
        //
        // const ship_10 = this.entityFactory.createEntity('starships', 'ships_ship_10', -500, 4500, 'ship_10');
        // this.entityManager.addEntity(ship_10);
        //
        // const ship_11 = this.entityFactory.createEntity('starships', 'ships_ship_11', -500, 5000, 'ship_11');
        // this.entityManager.addEntity(ship_11);
        //
        // const ship_12 = this.entityFactory.createEntity('starships', 'ships_ship_12', -500, 5500, 'ship_12');
        // this.entityManager.addEntity(ship_12);
        //
        // const ship_13 = this.entityFactory.createEntity('starships', 'ships_ship_13', -500, 6000, 'ship_13');
        // this.entityManager.addEntity(ship_13);
        //
        // const ship_14 = this.entityFactory.createEntity('starships', 'ships_ship_14', -500, 6500, 'ship_14');
        // this.entityManager.addEntity(ship_14);
        //
        // const ship_15 = this.entityFactory.createEntity('starships', 'ships_ship_15', -500, 7000, 'ship_15');
        // this.entityManager.addEntity(ship_15);
        //
        // const ship_16 = this.entityFactory.createEntity('starships', 'ships_ship_16', -500, 7500, 'ship_16');
        // this.entityManager.addEntity(ship_16);
        //
        // const ship_17 = this.entityFactory.createEntity('starships', 'ships_ship_17', -500, 8000, 'ship_17');
        // this.entityManager.addEntity(ship_17);
        //
        // const ship_18 = this.entityFactory.createEntity('starships', 'ships_ship_18', -500, 8500, 'ship_18');
        // this.entityManager.addEntity(ship_18);
        //
        // const ship_19 = this.entityFactory.createEntity('starships', 'ships_ship_19', -500, 9000, 'ship_19');
        // this.entityManager.addEntity(ship_19);
        //
        // const ship_20 = this.entityFactory.createEntity('starships', 'ships_ship_20', -500, 9500, 'ship_20');
        // this.entityManager.addEntity(ship_20);

        const factionStore = this.dataStoreManager.getStore('global');
        for(let i = 0; i < 100; i++) {
            // const stationX = this.seededRandom.between(-500000, 500000);
            // const stationY = this.seededRandom.between(-500000, 500000);
            // const stationKey = this.seededRandom.from(Object.keys(EntityDefinitions.definitions.stations));
            // const stationDefinition = EntityDefinitions.definitions.stations[stationKey];
            // const randomFactionKey = this.seededRandom.from(Object.keys(EntityDefinitions.definitions.factions));
            // const randomFactionDefinition = EntityDefinitions.definitions.factions[randomFactionKey];
            // const randomFaction = factionStore.get(randomFactionKey);
            //
            // if(!randomFaction) {
            //     throw new Error(`Faction ${randomFactionDefinition.id} not found`);
            // }
            //
            // const stationId = `station-${i}`;
            // const station = this.entityFactory.createEntity('stations', stationKey, stationX, stationY, stationId);
            // randomFaction.addStation(station);
            // this.entityManager.addEntity(station);

            // for(let j = 0; j < 1; j++) {
            //     const shipX = this.seededRandom.between(stationX - 1000, stationX + 1000);
            //     const shipY = this.seededRandom.between(stationY - 1000, stationY + 1000);
            //     const shipKey = this.seededRandom.from(Object.keys(EntityDefinitions.definitions.starships));
            //     const shipDefinition = EntityDefinitions.definitions.starships[shipKey];
            //     const shipId = `ship-${i}-${j}`;
            //
            //     const ship = this.entityFactory.createEntity('starships', shipKey, shipX, shipY, shipId);
            //     ship.isStatic = true;
            //     randomFaction.addShip(ship);
            //     station.addShip(ship);
            //     this.entityManager.addEntity(ship);
            // }
        }
        for(let i = 0; i < 500; i++) {
            // const asteroidX = this.seededRandom.between(-100000, 100000);
            //
            // const asteroidY = this.seededRandom.between(-100000, 100000);
            // const asteroidKeys = Object.keys(EntityDefinitions.definitions.asteroids);
            // const asteroidKey = this.seededRandom.from(asteroidKeys);
            // const asteroidDefinition = EntityDefinitions.definitions.asteroids[asteroidKey];
            // const asteroidId = `asteroid-${i}`;
            // const scale = this.seededRandom.from([0.3, 0.4, 10, 15], [1000, 1000, 50, 10]);
            //
            // const asteroid = this.entityFactory.createEntity('asteroids', asteroidKey, asteroidX, asteroidY, asteroidId, scale);
            // this.entityManager.addEntity(asteroid);
        }

        // const station = this.entityFactory.createEntity('stations', 'station_type_1', -600, -600, 'station-home');
        // this.entityManager.addEntity(station);
        //
        // const asteroid = this.entityFactory.createEntity('asteroids', 'asteroid_type_1_256', 700, 400, 'asteroid-home');
        // this.entityManager.addEntity(asteroid);
    }
}
