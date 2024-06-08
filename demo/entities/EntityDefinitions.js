import DetectionTypes from "../../engine/src/physics/collisions/DetectionTypes.js";

export default class EntityDefinitions {
    static definitions = {
        starships: {
            starship_type_1: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gunship-fighter-3',
                    image: 'demo/assets/images/gunship-fighter-3.png',
                    width: 119,
                    height: 280,
                    frames: 1
                },
                polygon: {
                    orientation: Math.PI / 2,
                    fillColor: '#FFD700',
                    vertices: [
                        {x: 0, y: -10},
                        {x: 10, y: 10},
                        {x: 0, y: 5},
                        {x: -10, y: 10},
                    ],
                },
            },
            starship_type_2: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.POLYGON,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gunship-heavyfighter-1',
                    image: 'demo/assets/images/gunship-heavyfighter-1.png',
                    width: 250,
                    height: 420,
                    frames: 1
                },
                polygon: {
                    orientation: Math.PI / 2,
                    fillColor: '#FF4500',
                    vertices: [
                        {x: 0, y: -12},
                        {x: 12, y: 12},
                        {x: 0, y: 6},
                        {x: -12, y: 12},
                    ],
                },
            },
            starship_type_3: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.POLYGON,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gunship-fighter-3',
                    image: 'demo/assets/images/gunship-fighter-3.png',
                    width: 119,
                    height: 280,
                    frames: 1
                },
                polygon: {
                    orientation: Math.PI / 2,
                    fillColor: '#1E90FF',
                    vertices: [
                        {x: 0, y: -12},
                        {x: 12, y: 12},
                        {x: 0, y: 6},
                        {x: -12, y: 12},
                    ],
                },
            },
        },
        weapons: {
            laser: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 5,
                rateOfFire: 10, // ms
                width: 12,
                height: 60,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gunship-fighter-2-weapontype-1',
                    image: 'demo/assets/images/gunship-fighter-2-weapontype-1.png',
                    width: 46,
                    height: 12,
                    frames: 1
                },
            },
        },
        projectiles: {
            bullet_standard: {
                entityClass: 'laser',
                damage: 5,
                speed: 300, // Example speed
                lifetime: 30, // Example lifetime in seconds
                width: 2,
                height: 2,
                pos: {x: 0, y: 0, z: 0},
                collisionDetection: DetectionTypes.POLYGON,
                polygon: {
                    orientation: 0,
                    fillColor: 'yellow',
                    vertices: [
                        {x: 0, y: -5},
                        {x: 1, y: 5},
                        {x: -1, y: 5},
                    ],
                },
            },
            laser_standard: {
                entityClass: 'laser',
                damage: 10,
                speed: 500, // Example speed
                lifetime: 30, // Example lifetime in seconds
                width: 2,
                height: 10,
                pos: {x: 0, y: 0, z: 0},
                collisionDetection: DetectionTypes.POLYGON,
                polygon: {
                    orientation: 0,
                    fillColor: 'red',
                    vertices: [
                        {x: 0, y: -5},
                        {x: 1, y: 5},
                        {x: -1, y: 5},
                    ],
                },
            },
        },
    };

    static get(type, name) {
        if(this.definitions[type] && this.definitions[type][name]) {
            return this.definitions[type][name];
        }
        throw new Error(`Entity of type ${type} with name ${name} not found.`);
    }

    static getEntityClass(name) {
        if(this.entityClasses[name]) {
            return this.entityClasses[name];
        }
        throw new Error(`Entity of type ${type} with name ${name} not found.`);
    }

    static getRandomFromType(type) {
        if(this.definitions[type]) {
            const keys = Object.keys(this.definitions[type]);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return this.definitions[type][randomKey]; // Return the definition
        }
        throw new Error(`Entity of type ${type} not found.`);
    }
}
