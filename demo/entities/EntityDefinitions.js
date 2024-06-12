import DetectionTypes from "../../engine/src/physics/collisions/DetectionTypes.js";
import defaults from "../../engine/src/defaults.js";

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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    }
                ]
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
                    frames: 1,
                },
                sprites: [
                    {
                        orientation: Math.PI / 2,
                        name: 'gunship-fighter-3',
                        image: 'demo/assets/images/gunship-fighter-3.png',
                        width: 119,
                        height: 280,
                        frames: 1,
                    }
                ],
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_1: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_1',
                    image: 'demo/assets/images/ships/ship_1.png',
                    width: 379,
                    height: 546,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_2: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_2',
                    image: 'demo/assets/images/ships/ship_2.png',
                    width: 486,
                    height: 619,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_3: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_3',
                    image: 'demo/assets/images/ships/ship_3.png',
                    width: 496,
                    height: 554,
                    frames: 1,
                    scale: 0.5
                },
                sprites: [
                    {
                        renderOrder: 10,
                        orientation: Math.PI / 2,
                        name: 'ships_ship_3',
                        image: 'demo/assets/images/ships/ship_3.png',
                        width: 496,
                        height: 554,
                        frames: 1,
                        scale: 0.5
                    }
                ],
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_4: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_4',
                    image: 'demo/assets/images/ships/ship_4.png',
                    width: 469,
                    height: 677,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_5: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_5',
                    image: 'demo/assets/images/ships/ship_5.png',
                    width: 595,
                    height: 884,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_6: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_6',
                    image: 'demo/assets/images/ships/ship_6.png',
                    width: 528,
                    height: 808,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_7: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_7',
                    image: 'demo/assets/images/ships/ship_7.png',
                    width: 477,
                    height: 925,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_8: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_8',
                    image: 'demo/assets/images/ships/ship_8.png',
                    width: 528,
                    height: 751,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_9: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_9',
                    image: 'demo/assets/images/ships/ship_9.png',
                    width: 876,
                    height: 1109,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_10: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_10',
                    image: 'demo/assets/images/ships/ship_10.png',
                    width: 988,
                    height: 1133,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_11: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_11',
                    image: 'demo/assets/images/ships/ship_11.png',
                    width: 377,
                    height: 348,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_12: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_12',
                    image: 'demo/assets/images/ships/ship_12.png',
                    width: 342,
                    height: 471,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_13: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_13',
                    image: 'demo/assets/images/ships/ship_13.png',
                    width: 368,
                    height: 558,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_14: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_14',
                    image: 'demo/assets/images/ships/ship_14.png',
                    width: 354,
                    height: 387,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_15: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_15',
                    image: 'demo/assets/images/ships/ship_15.png',
                    width: 765,
                    height: 1174,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_16: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_16',
                    image: 'demo/assets/images/ships/ship_16.png',
                    width: 399,
                    height: 459,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_17: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_17',
                    image: 'demo/assets/images/ships/ship_17.png',
                    width: 331,
                    height: 383,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_18: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_18',
                    image: 'demo/assets/images/ships/ship_18.png',
                    width: 379,
                    height: 517,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_19: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'ships_ship_19',
                    image: 'demo/assets/images/ships/ship_19.png',
                    width: 382,
                    height: 450,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: 20, y: -25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: 20, y: 25},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 16, y: -35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 16, y: 35},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'laser'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: 16, y: -55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: 16, y: 55},
                        compatibility: ['laser', 'kinetic'],
                        defaultWeapon: 'kinetic'
                    }
                ]
            },
            ships_ship_20: {
                entityClass: 'starship',
                collisionDetection: DetectionTypes.SUB_BOXES,
                sprite: {
                    orientation: Math.PI / 2,
                    renderOrder: 50,
                    name: 'ships_ship_20',
                    image: 'demo/assets/images/ships/ship_20-base.png',
                    width: 377,
                    height: 348,
                    frames: 1,
                    scale: 0.5
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
                mounts: [
                    {
                        id: 'mount1',
                        type: 'weapon',
                        position: {x: -38, y: -68},
                        renderOrder: 80,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'twin_blaster_1_green'
                    },
                    {
                        id: 'mount2',
                        type: 'weapon',
                        position: {x: -38, y: 68},
                        renderOrder: 80,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'twin_blaster_1_green'
                    },
                    {
                        id: 'mount3',
                        type: 'weapon',
                        position: {x: 10, y: -30},
                        renderOrder: 40,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'gattling_left_1_green'
                    },
                    {
                        id: 'mount4',
                        type: 'weapon',
                        position: {x: 10, y: 30},
                        renderOrder: 40,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'gattling_right_1_green'
                    },
                    {
                        id: 'mount5',
                        type: 'weapon',
                        position: {x: -38, y: -51},
                        renderOrder: 40,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'missile_1_green'
                    },
                    {
                        id: 'mount6',
                        type: 'weapon',
                        position: {x: -38, y: 51},
                        renderOrder: 40,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'missile_1_green'
                    },
                    {
                        id: 'mount7',
                        type: 'weapon',
                        position: {x: -34, y: -0},
                        renderOrder: 80,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'twin_cannon_1_green'
                    },
                    {
                        id: 'mount8',
                        type: 'weapon',
                        position: {x: -14, y: -20},
                        renderOrder: 30,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'intake_left_1_green'
                    },
                    {
                        id: 'mount9',
                        type: 'weapon',
                        position: {x: -14, y: 20},
                        renderOrder: 30,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'intake_right_1_green'
                    },
                    {
                        id: 'mount10',
                        type: 'weapon',
                        position: {x: -47, y: -28},
                        renderOrder: 30,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'thruster_1_green'
                    },
                    {
                        id: 'mount11',
                        type: 'weapon',
                        position: {x: -47, y: 28},
                        renderOrder: 30,
                        compatibility: ['laser', 'kinetic'],
                        defaultMount: 'thruster_1_green'
                    }

                ]
            },
        },
        weapons: {
            laser: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 12,
                height: 60,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gunship-fighter-3-weapontype-3',
                    image: 'demo/assets/images/gunship-fighter-3-weapontype-3.png',
                    width: 46,
                    height: 12,
                    frames: 1
                },
            },
            kinetic: {
                entityClass: 'kinetic',
                type: 'kinetic',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 24,
                height: 12,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gunship-fighter-3-weapontype-2',
                    image: 'demo/assets/images/gunship-fighter-3-weapontype-2.png',
                    width: 24,
                    height: 12,
                    frames: 1
                },
            },
            laser_blaster_left_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 131,
                height: 30,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'laser_blaster_left_1_green',
                    image: 'demo/assets/images/weapons/laser-blaster-left-1-green.png',
                    width: 131,
                    height: 30,
                    frames: 1,
                    scale: 0.5
                },
            },
            laser_blaster_right_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 131,
                height: 30,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'laser_blaster_right_1_green',
                    image: 'demo/assets/images/weapons/laser-blaster-right-1-green.png',
                    width: 131,
                    height: 30,
                    frames: 1,
                    scale: 0.5
                },
            },
            gattling_left_1_green: {
                entityClass: 'kinetic',
                type: 'kinetic',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 135,
                height: 67,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gattling_left_1_green',
                    image: 'demo/assets/images/weapons/gattling-left-1-green.png',
                    width: 135,
                    height: 67,
                    frames: 1,
                    scale: 0.5
                },
            },
            gattling_right_1_green: {
                entityClass: 'kinetic',
                type: 'kinetic',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 135,
                height: 67,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'gattling_right_1_green',
                    image: 'demo/assets/images/weapons/gattling-right-1-green.png',
                    width: 135,
                    height: 67,
                    frames: 1,
                    scale: 0.5
                },
            },
            twin_blaster_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 131,
                height: 63,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'twin_blaster_1_green',
                    image: 'demo/assets/images/weapons/twin-blaster-1-green.png',
                    width: 131,
                    height: 63,
                    frames: 1,
                    scale: 0.5
                },
            },
            twin_cannon_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 202,
                height: 104,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'twin_cannon_1_green',
                    image: 'demo/assets/images/weapons/twin-cannon-1-green.png',
                    width: 202,
                    height: 104,
                    frames: 1,
                    scale: 0.5
                },
            },
            intake_left_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 202,
                height: 104,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'intake_left_1_green',
                    image: 'demo/assets/images/engines/intake-left-1-green.png',
                    width: 202,
                    height: 104,
                    frames: 1,
                    scale: 0.5
                },
            },
            intake_right_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 212,
                height: 100,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'intake_right_1_green',
                    image: 'demo/assets/images/engines/intake-right-1-green.png',
                    width: 212,
                    height: 100,
                    frames: 1,
                    scale: 0.5
                },
            },
            thruster_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 169,
                height: 84,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'thruster_1_green',
                    image: 'demo/assets/images/engines/thruster-1-green.png',
                    width: 169,
                    height: 84,
                    frames: 1,
                    scale: 0.5
                },
            },
            missile_1_green: {
                entityClass: 'laser',
                type: 'laser',
                damage: 10,
                energyConsumption: 3000,
                rateOfFire: 200, // ms
                width: 154,
                height: 39,
                pos: {x: 0, y: 0, z: 0},
                sprite: {
                    orientation: Math.PI / 2,
                    name: 'missile_1_green',
                    image: 'demo/assets/images/weapons/missile-1-green.png',
                    width: 154,
                    height: 39,
                    frames: 1,
                    scale: 0.5
                },
            },
        },
        projectiles: {
            bullet_standard: {
                entityClass: 'projectile',
                damage: 5,
                speed: 300,
                lifetime: 2,
                width: 2,
                height: 2,
                pos: {x: 0, y: 0, z: 0},
                collisionDetection: DetectionTypes.SUB_BOXES,
                polygon: {
                    orientation: Math.PI / 2,
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
                lifetime: 2,
                width: 2,
                height: 10,
                pos: {x: 0, y: 0, z: 0},
                collisionDetection: DetectionTypes.SUB_BOXES,
                polygon: {
                    orientation: Math.PI / 2,
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
