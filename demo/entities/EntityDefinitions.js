import DetectionTypes from "../../engine/src/physics/collisions/DetectionTypes.js";

export default class EntityDefinitions {
    static definitions = {
        factions: {
            faction_1: {
                id: 'faction_1',
                entityClass: "faction",
                name: 'Faction 1',
                color: '#FF0000',
                emblemVertices: [
                    {x: 0, y: -20},
                    {x: 20, y: -10},
                    {x: 20, y: 10},
                    {x: 0, y: 20},
                    {x: -20, y: 10},
                    {x: -20, y: -10},
                ]
            },
            faction_2: {
                id: 'faction_2',
                entityClass: "faction",
                name: 'Faction 2',
                color: '#00FF00',
                emblemVertices: [
                    {x: 0, y: -30},
                    {x: 15, y: -15},
                    {x: 30, y: 0},
                    {x: 15, y: 15},
                    {x: 0, y: 30},
                    {x: -15, y: 15},
                    {x: -30, y: 0},
                    {x: -15, y: -15},
                ]
            },
            faction_3: {
                id: 'faction_3',
                entityClass: "faction",
                name: 'Faction 3',
                color: '#0000FF',
                emblemVertices: [
                    {x: 0, y: -25},
                    {x: 20, y: 0},
                    {x: 0, y: 25},
                    {x: -20, y: 0},
                ]
            }
        },
        stations: {
            station_type_1: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '001_st_01.png',
                    image: 'demo/assets/images/stations/001/st_01.png',
                    width: 524,
                    height: 512,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#FF0000',
                    vertices: [
                        {x: 0, y: -20},
                        {x: 20, y: -10},
                        {x: 20, y: 10},
                        {x: 0, y: 20},
                        {x: -20, y: 10},
                        {x: -20, y: -10},
                    ],
                },
            },
            station_type_2: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '001_st_02.png',
                    image: 'demo/assets/images/stations/001/st_02.png',
                    width: 980,
                    height: 980,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#00FF00',
                    vertices: [
                        {x: 0, y: -30},
                        {x: 15, y: -15},
                        {x: 30, y: 0},
                        {x: 15, y: 15},
                        {x: 0, y: 30},
                        {x: -15, y: 15},
                        {x: -30, y: 0},
                        {x: -15, y: -15},
                    ],
                },
            },
            station_type_3: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '001_st_03.png',
                    image: 'demo/assets/images/stations/001/st_03.png',
                    width: 524,
                    height: 984,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            },
            station_type_4: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '001_st_04.png',
                    image: 'demo/assets/images/stations/001/st_04.png',
                    width: 481,
                    height: 480,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            },
            station_type_5: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '001_st_05.png',
                    image: 'demo/assets/images/stations/001/st_05.png',
                    width: 482,
                    height: 480,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            },
            station_type_6: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '002_st_01.png',
                    image: 'demo/assets/images/stations/002/st_01.png',
                    width: 482,
                    height: 770,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            },
            station_type_7: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '002_st_02.png',
                    image: 'demo/assets/images/stations/002/st_02.png',
                    width: 548,
                    height: 548,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            },
            station_type_8: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '002_st_03.png',
                    image: 'demo/assets/images/stations/002/st_03.png',
                    width: 447,
                    height: 324,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            },
            station_type_9: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '002_st_04.png',
                    image: 'demo/assets/images/stations/002/st_04.png',
                    width: 780,
                    height: 984,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            },
            station_type_10: {
                entityClass: "station",
                collisionDetection: DetectionTypes.SUB_BOXES,
                isStatic: true,
                sprite: {
                    orientation: Math.PI / 2,
                    name: '002_st_05.png',
                    image: 'demo/assets/images/stations/002/st_05.png',
                    width: 386,
                    height: 580,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#0000FF',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                },
            }
        },
        asteroids: {
            ...this.generateAsteroidDefinitions('128', 128),
            ...this.generateAsteroidDefinitions('256', 256),
            ...this.generateAsteroidDefinitions('512', 512),
        },
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
                collisionDetection: DetectionTypes.SUB_BOXES,
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
                energyConsumption: 10000,
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
                entityClass: 'projectile',
                damage: 5,
                speed: 300,
                lifetime: 5,
                width: 2,
                height: 2,
                pos: {x: 0, y: 0, z: 0},
                collisionDetection: DetectionTypes.SUB_BOXES,
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
                entityClass: 'projectile',
                damage: 10,
                speed: 500,
                lifetime: 5,
                width: 2,
                height: 10,
                pos: {x: 0, y: 0, z: 0},
                collisionDetection: DetectionTypes.SUB_BOXES,
                polygon: {
                    orientation: -Math.PI / 2,
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

    static getRandomFromType(type) {
        if(this.definitions[type]) {
            const keys = Object.keys(this.definitions[type]);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return this.definitions[type][randomKey]; // Return the definition
        }
        throw new Error(`Entity of type ${type} not found.`);
    }
    static generateAsteroidDefinitions(resolution, size) {
        const definitions = {};
        for(let i = 1; i <= 15; i++) {
            const asteroidType = `asteroid_type_${i}_${resolution}`;
            definitions[asteroidType] = {
                entityClass: "asteroid",
                isStatic: true,
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: `AsteroidRender${String(i).padStart(2, '0')}_${resolution}`,
                    image: `demo/assets/images/asteroids/${resolution}/AsteroidRender${String(i).padStart(2, '0')}_${resolution}.png`,
                    width: size,
                    height: size,
                    frames: 1
                },
                polygon: {
                    orientation: 0,
                    fillColor: '#A9A9A9',
                    vertices: [
                        {x: 0, y: -10},
                        {x: 8, y: -8},
                        {x: 10, y: 0},
                        {x: 8, y: 8},
                        {x: 0, y: 10},
                        {x: -8, y: 8},
                        {x: -10, y: 0},
                        {x: -8, y: -8},
                    ],
                },
            };
        }
        return definitions;
    }
}
