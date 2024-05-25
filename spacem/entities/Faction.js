import BaseEntity from './entities/BaseEntity.js';

export default class Faction extends BaseEntity {
    constructor(id, name, color, emblemVertices) {
        super(id, 'Faction');
        this.name = name;
        this.color = color;
        this.emblemVertices = emblemVertices;
        this.stations = [];
        this.ships = [];
    }

    getFactionColor() {
        return this.color;
    }

    getEmblemVertices() {
        return this.emblemVertices;
    }

    addStation(station) {
        this.stations.push(station);
    }

    addShip(ship) {
        this.ships.push(ship);
    }
}
