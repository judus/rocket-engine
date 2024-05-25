import Station from './Station.js';
import Starship from './Starship.js';
import Asteroid from './Asteroid.js';
import Faction from './Faction.js';

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
                    collisionType: 'polygon',
                    vertices: [
                        {x: 0, y: -20},
                        {x: 20, y: -10},
                        {x: 20, y: 10},
                        {x: 0, y: 20},
                        {x: -20, y: 10},
                        {x: -20, y: -10},
                    ],
                    properties: {
                        color: '#FF0000'
                    }
                },
                station_type_2: {
                    entityClass: Station,
                    collisionType: 'polygon',
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
                    properties: {
                        color: '#00FF00'
                    }
                },
                station_type_3: {
                    entityClass: Station,
                    collisionType: 'polygon',
                    vertices: [
                        {x: 0, y: -25},
                        {x: 20, y: 0},
                        {x: 0, y: 25},
                        {x: -20, y: 0},
                    ],
                    properties: {
                        color: '#0000FF'
                    }
                }
            },
            asteroids: {
                asteroid_type_1: {
                    entityClass: Asteroid,
                    collisionType: 'polygon',
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
                    properties: {
                        color: '#A9A9A9'
                    }
                },
                asteroid_type_2: {
                    entityClass: Asteroid,
                    collisionType: 'polygon',
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
                    properties: {
                        color: '#696969'
                    }
                },
                asteroid_type_3: {
                    entityClass: Asteroid,
                    collisionType: 'polygon',
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
                    properties: {
                        color: '#808080'
                    }
                }
            },
            starships: {
                starship_type_1: {
                    entityClass: Starship,
                    vertices: [
                        {x: 0, y: -10},
                        {x: 10, y: 10},
                        {x: 0, y: 5},
                        {x: -10, y: 10},
                    ],
                    collisionType: 'box',
                    collisionBoxes: [
                        {id: 'body', x: 0, y: 0, width: 10, height: 30}, // Body box
                        {id: 'wing_left', x: -15, y: 0, width: 10, height: 5}, // Left wing box
                        {id: 'wing_right', x: 15, y: 0, width: 10, height: 5}  // Right wing box
                    ],
                    properties: {
                        color: '#FFD700'
                    }
                },
                starship_type_2: {
                    entityClass: Starship,
                    vertices: [
                        {x: 0, y: -12},
                        {x: 12, y: 12},
                        {x: 0, y: 6},
                        {x: -12, y: 12},
                    ],
                    collisionType: 'box',
                    collisionBoxes: [
                        {id: 'body', x: 0, y: 0, width: 12, height: 36}, // Body box
                        {id: 'wing_left', x: -18, y: 0, width: 12, height: 6}, // Left wing box
                        {id: 'wing_right', x: 18, y: 0, width: 12, height: 6}  // Right wing box
                    ],
                    properties: {
                        color: '#FF4500'
                    }
                },
                starship_type_3: {
                    entityClass: Starship,
                    vertices: [
                        {x: 0, y: -15},
                        {x: 15, y: 15},
                        {x: 0, y: 7},
                        {x: -15, y: 15},
                    ],
                    collisionType: 'box',
                    collisionBoxes: [
                        {id: 'body', x: 0, y: 0, width: 15, height: 45}, // Body box
                        {id: 'wing_left', x: -22, y: 0, width: 15, height: 7}, // Left wing box
                        {id: 'wing_right', x: 22, y: 0, width: 15, height: 7}  // Right wing box
                    ],
                    properties: {
                        color: '#1E90FF'
                    }
                }
            }
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