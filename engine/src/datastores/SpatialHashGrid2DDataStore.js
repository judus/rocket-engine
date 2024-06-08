import BaseDataStore from './BaseDataStore.js';

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
        this.staticEntities = new Set();
        this.movingEntities = new Set();
    }

    set(id, entity) {
        const previousEntity = this.get(id);
        super.set(id, entity); // Use BaseDataStore's set method
        const width = entity.width || 0;
        const height = entity.height || 0;

        if(previousEntity) {
            this.deleteSpatial(previousEntity);
        }

        this.setSpatial(entity.pos.x, entity.pos.y, width, height, entity);

        if(entity.isStatic) {
            this.staticEntities.add(entity);
        } else {
            this.movingEntities.add(entity);
        }
    }

    delete(id) {
        const entity = this.get(id);
        if(entity) {
            this.deleteSpatial(entity);
            super.delete(id); // Use BaseDataStore's delete method
            if(entity.isStatic) {
                this.staticEntities.delete(entity);
            } else {
                this.movingEntities.delete(entity);
            }
        } else {
            console.warn(`Entity with ID '${id}' not found.`);
        }
    }

    addEntity(entity, id = generateUUID()) {
        this.set(id, entity); // Use overridden set method
    }

    setSpatial(x, y, width, height, entity) {
        const scaledWidth = width * entity.scale;
        const scaledHeight = height * entity.scale;

        const minX = Math.floor((x - scaledWidth / 2) / this.cellSize);
        const maxX = Math.floor((x + scaledWidth / 2) / this.cellSize);
        const minY = Math.floor((y - scaledHeight / 2) / this.cellSize);
        const maxY = Math.floor((y + scaledHeight / 2) / this.cellSize);

        entity.spatialHashes = []; // Initialize spatialHashes array

        for(let cellX = minX; cellX <= maxX; cellX++) {
            for(let cellY = minY; cellY <= maxY; cellY++) {
                const hash = `${cellX},${cellY}`;
                let cell = this.grid.get(hash);
                if(!cell) {
                    cell = new Map();
                    this.grid.set(hash, cell);
                }
                cell.set(entity.id, entity);
                entity.spatialHashes.push(hash); // Store the current hash in the entity
            }
        }
    }

    deleteSpatial(entity) {
        if(entity.spatialHashes) {
            for(const hash of entity.spatialHashes) {
                const cell = this.grid.get(hash);
                if(cell) {
                    cell.delete(entity.id);
                    if(cell.size === 0) {
                        this.grid.delete(hash);
                    }
                }
            }
            entity.spatialHashes = [];
        }
    }

    getEntitiesInArea(rectangle) {
        const entities = new Set();

        const startX = Math.floor(rectangle.x1 / this.cellSize);
        const endX = Math.ceil(rectangle.x2 / this.cellSize) - 1;
        const startY = Math.floor(rectangle.y1 / this.cellSize);
        const endY = Math.ceil(rectangle.y2 / this.cellSize) - 1;

        for(let y = startY; y <= endY; y++) {
            for(let x = startX; x <= endX; x++) {
                const hash = `${x},${y}`;
                const cell = this.grid.get(hash);
                if(cell) {
                    for(const entity of cell.values()) {
                        if(!entities.has(entity) && this.isEntityInArea(entity, rectangle)) {
                            entities.add(entity);
                        }
                    }
                }
            }
        }

        return Array.from(entities);
    }

    isEntityInArea(entity, rectangle) {
        const pos = this.getEntityPosition(entity);
        const width = entity.width * entity.scale || 0;
        const height = entity.height * entity.scale || 0;

        const left = pos.x - width / 2;
        const right = pos.x + width / 2;
        const top = pos.y - height / 2;
        const bottom = pos.y + height / 2;

        return !(left > rectangle.x2 || right < rectangle.x1 || top > rectangle.y2 || bottom < rectangle.y1);
    }

    getEntityPosition(entity) {
        return {x: entity.pos.x, y: entity.pos.y};
    }

    updateEntity(entity) {
        if(!entity.pos) {
            throw new Error('Entity does not have a position');
        }

        const width = entity.width || 0;
        const height = entity.height || 0;
        const newHashes = this.calculateHashes(entity.pos.x, entity.pos.y, width, height, entity.scale);
        const oldHashes = entity.spatialHashes || [];

        if(this.hashesChanged(newHashes, oldHashes)) {
            this.deleteSpatial(entity);
            this.setSpatial(entity.pos.x, entity.pos.y, width, height, entity);
            this.eventBus.emit(entity.id, entity);
        }
    }

    calculateHashes(x, y, width, height, scale) {
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;

        const hashes = [];
        const minX = Math.floor((x - scaledWidth / 2) / this.cellSize);
        const maxX = Math.floor((x + scaledWidth / 2) / this.cellSize);
        const minY = Math.floor((y - scaledHeight / 2) / this.cellSize);
        const maxY = Math.floor((y + scaledHeight / 2) / this.cellSize);

        for(let cellX = minX; cellX <= maxX; cellX++) {
            for(let cellY = minY; cellY <= maxY; cellY++) {
                hashes.push(`${cellX},${cellY}`);
            }
        }
        return hashes;
    }

    hashesChanged(newHashes, oldHashes) {
        if(newHashes.length !== oldHashes.length) {
            return true;
        }
        const oldHashSet = new Set(oldHashes);
        for(const hash of newHashes) {
            if(!oldHashSet.has(hash)) {
                return true;
            }
        }
        return false;
    }

    updateEntitiesNearCamera(cameraX, cameraY, updateRadius) {
        const entitiesToUpdate = this.getEntitiesInArea({
            x1: cameraX - updateRadius,
            y1: cameraY - updateRadius,
            x2: cameraX + updateRadius,
            y2: cameraY + updateRadius,
        });
        for(const entity of entitiesToUpdate) {
            this.updateEntity(entity);
        }
    }

    getStaticEntities() {
        return Array.from(this.staticEntities);
    }

    getMovingEntities() {
        return Array.from(this.movingEntities);
    }
}
