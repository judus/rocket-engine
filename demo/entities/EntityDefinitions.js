import DetectionTypes from "../../engine/src/physics/collisions/DetectionTypes.js";
import Station from './Station.js';
import Starship from './Starship.js';
import Asteroid from './Asteroid.js';
import Faction from './Faction.js';
import LaserWeapon from "../../engine/src/entities/physics/LaserWeapon.js";

export default class EntityDefinitions {
    constructor() {
        this.definitions = {

            factions: {
                faction_1: {
                    id: 'faction_1',
                    entityClass: Faction,
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
                    entityClass: Faction,
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
                    entityClass: Faction,
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
                    entityClass: Station,
                    collisionDetection: DetectionTypes.POLYGON,
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
                    entityClass: Station,
                    collisionDetection: DetectionTypes.POLYGON,
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
                    entityClass: Station,
                    collisionDetection: DetectionTypes.POLYGON,
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
                asteroid_type_1: {
                    entityClass: Asteroid,
                    collisionDetection: DetectionTypes.POLYGON,
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
                },
                asteroid_type_2: {
                    entityClass: Asteroid,
                    collisionDetection: DetectionTypes.POLYGON,
                    polygon: {
                        orientation: 0,
                        fillColor: '#696969',
                        vertices: [
                            {x: 0, y: -15},
                            {x: 12, y: -10},
                            {x: 15, y: 0},
                            {x: 12, y: 10},
                            {x: 0, y: 15},
                            {x: -12, y: 10},
                            {x: -15, y: 0},
                            {x: -12, y: -10},
                        ],
                    },
                },
                asteroid_type_3: {
                    entityClass: Asteroid,
                    collisionDetection: DetectionTypes.POLYGON,
                    polygon: {
                        orientation: 0,
                        fillColor: '#808080',
                        vertices: [
                            {x: 0, y: -20},
                            {x: 18, y: -10},
                            {x: 20, y: 0},
                            {x: 18, y: 10},
                            {x: 0, y: 20},
                            {x: -18, y: 10},
                            {x: -20, y: 0},
                            {x: -18, y: -10},
                        ],
                    },
                }
            },
            starships: {
                starship_type_1: {
                    entityClass: Starship,
                    collisionDetection: DetectionTypes.OUTER_BOX,
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
                    entityClass: Starship,
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
                    entityClass: Starship,
                    collisionDetection: DetectionTypes.FRAME_POLYGON,
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
                    entityClass: LaserWeapon,
                    type: 'laser',
                    damage: 10,
                    energyConsumption: 5,
                    rateOfFire: 500, // ms
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

        };
    }

    get(type, name) {
        if(this.definitions[type] && this.definitions[type][name]) {
            return this.definitions[type][name];
        }
        throw new Error(`Entity of type ${type} with name ${name} not found.`);
    }

    getRandomFromType(type) {
        if(this.definitions[type]) {
            const keys = Object.keys(this.definitions[type]);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return this.definitions[type][randomKey]; // Return the definition
        }
        throw new Error(`Entity of type ${type} not found.`);
    }
}
