import BaseDataStore from './BaseDataStore.js';
import SpatialEntity2D from "../entities/SpatialEntity2D";

function generateUUID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

function hashCoordinates(x, y, cellSize) {
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    return `${cellX},${cellY}`;
}

export default class SpatialHashGrid2DDataStore extends BaseDataStore {
    constructor(eventBus, cellSize = 100) {
        super(eventBus);
        this.grid = new Map(); // Spatial grid map
        this.cellSize = cellSize;
    }

    set(id, entity) {
        super.set(id, entity); // Use BaseDataStore's set method
        if(entity instanceof SpatialEntity2D) {
            this.setSpatial(entity.pos.x, entity.pos.y, entity);
        }
    }

    delete(id) {
        const entity = this.get(id); // Use BaseDataStore's get method
        if(entity) {
            if(entity instanceof SpatialEntity2D) {
                this.deleteSpatial(entity.pos.x, entity.pos.y, entity);
            }
            super.delete(id); // Use BaseDataStore's delete method
        } else {
            console.warn(`Entity with ID '${id}' not found.`);
        }
    }

    addEntity(entity, id = generateUUID()) {
        this.set(id, entity); // Use overridden set method
    }

    setSpatial(x, y, entity) {
        const hash = hashCoordinates(x, y, this.cellSize);
        if(!this.grid.has(hash)) {
            this.grid.set(hash, new Set());
        }
        this.grid.get(hash).add(entity);
        entity.spatialHash = hash; // Store the current hash in the entity
    }

    deleteSpatial(x, y, entity) {
        const hash = entity.spatialHash; // Use the stored hash from the entity
        const cell = this.grid.get(hash);
        if(cell) {
            cell.delete(entity);
            if(cell.size === 0) {
                this.grid.delete(hash);
            }
        }
    }

    getEntitiesInArea(rectangle) {
        const entities = new Set();

        const startX = Math.floor(rectangle.x1 / this.cellSize);
        const endX = Math.ceil(rectangle.x2 / this.cellSize);
        const startY = Math.floor(rectangle.y1 / this.cellSize);
        const endY = Math.ceil(rectangle.y2 / this.cellSize);

        for(let y = startY; y <= endY; y++) {
            for(let x = startX; x <= endX; x++) {
                const hash = `${x},${y}`;
                const cell = this.grid.get(hash);
                if(cell) {
                    for(const entity of cell) {
                        entities.add(entity);
                    }
                }
            }
        }

        return Array.from(entities);
    }

    updateEntitiesNearCamera(cameraX, cameraY, updateRadius) {
        const entitiesToUpdate = this.getEntitiesInArea({
            x1: cameraX - updateRadius,
            y1: cameraY - updateRadius,
            x2: cameraX + updateRadius,
            y2: cameraY + updateRadius,
        });
        for(const entity of entitiesToUpdate) {
            if(entity instanceof SpatialEntity2D) {
                this.updateEntity(entity);
            }
        }
    }

    updateEntity(entity) {
        if(entity instanceof SpatialEntity2D) {
            const newHash = hashCoordinates(entity.pos.x, entity.pos.y, this.cellSize);
            if(entity.spatialHash !== newHash) {
                this.deleteSpatial(entity.pos.x, entity.pos.y, entity);
                this.setSpatial(entity.pos.x, entity.pos.y, entity);
                this.eventBus.emit(entity.id, entity);
            }
        }
    }
}
