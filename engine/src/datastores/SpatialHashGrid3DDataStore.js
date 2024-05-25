import BaseDataStore from './BaseDataStore.js';
import SpatialEntity3D from '../entities/SpatialEntity3D.js';

function generateUUID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

function hashCoordinates(x, y, z, cellSize) {
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellZ = Math.floor(z / cellSize);
    return `${cellX},${cellY},${cellZ}`;
}

export default class SpatialHashGrid3DDataStore extends BaseDataStore {
    constructor(eventBus, cellSize = 100) {
        super(eventBus);
        this.grid = new Map(); // Spatial grid map
        this.cellSize = cellSize;
    }

    /**
     * Sets an entity in the data store and the spatial grid.
     * @param {string} id - The ID of the entity.
     * @param {Object} entity - The entity instance.
     */
    set(id, entity) {
        super.set(id, entity); // Use BaseDataStore's set method
        if(entity instanceof SpatialEntity3D) {
            this.setSpatial(entity.pos.x, entity.pos.y, entity.pos.z, entity);
        }
    }

    /**
     * Deletes an entity from the data store and the spatial grid.
     * @param {string} id - The ID of the entity.
     */
    delete(id) {
        const entity = this.get(id); // Use BaseDataStore's get method
        if(entity) {
            if(entity instanceof SpatialEntity3D) {
                this.deleteSpatial(entity.pos.x, entity.pos.y, entity.pos.z, entity);
            }
            super.delete(id); // Use BaseDataStore's delete method
        } else {
            console.warn(`Entity with ID '${id}' not found.`);
        }
    }

    /**
     * Adds an entity to the data store with a generated ID if not provided.
     * @param {Object} entity - The entity instance.
     * @param {string} [id] - The ID of the entity (optional).
     */
    addEntity(entity, id = generateUUID()) {
        this.set(id, entity); // Use overridden set method
    }

    /**
     * Sets an entity in the spatial grid.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} z - The z-coordinate.
     * @param {Object} entity - The entity instance.
     */
    setSpatial(x, y, z, entity) {
        const hash = hashCoordinates(x, y, z, this.cellSize);
        if(!this.grid.has(hash)) {
            this.grid.set(hash, new Set());
        }
        this.grid.get(hash).add(entity);
        entity.spatialHash = hash; // Store the current hash in the entity
    }

    /**
     * Deletes an entity from the spatial grid.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} z - The z-coordinate.
     * @param {Object} entity - The entity instance.
     */
    deleteSpatial(x, y, z, entity) {
        const hash = entity.spatialHash; // Use the stored hash from the entity
        const cell = this.grid.get(hash);
        if(cell) {
            cell.delete(entity);
            if(cell.size === 0) {
                this.grid.delete(hash);
            }
        }
    }

    /**
     * Retrieves entities within a specified cubic area.
     * @param {Object} cube - The cubic area.
     * @returns {Array<Object>} An array of entities within the specified area.
     */
    getEntitiesInArea(cube) {
        const entities = new Set();

        const startX = Math.floor(cube.x1 / this.cellSize);
        const endX = Math.ceil(cube.x2 / this.cellSize);
        const startY = Math.floor(cube.y1 / this.cellSize);
        const endY = Math.ceil(cube.y2 / this.cellSize);
        const startZ = Math.floor(cube.z1 / this.cellSize);
        const endZ = Math.ceil(cube.z2 / this.cellSize);

        for(let z = startZ; z <= endZ; z++) {
            for(let y = startY; y <= endY; y++) {
                for(let x = startX; x <= endX; x++) {
                    const hash = `${x},${y},${z}`;
                    const cell = this.grid.get(hash);
                    if(cell) {
                        for(const entity of cell) {
                            entities.add(entity);
                        }
                    }
                }
            }
        }

        return Array.from(entities);
    }

    /**
     * Updates entities near the cameras within a specified radius.
     * @param {number} cameraX - The x-coordinate of the cameras.
     * @param {number} cameraY - The y-coordinate of the cameras.
     * @param {number} cameraZ - The z-coordinate of the cameras.
     * @param {number} updateRadius - The radius around the cameras to update entities.
     */
    updateEntitiesNearCamera(cameraX, cameraY, cameraZ, updateRadius) {
        const entitiesToUpdate = this.getEntitiesInArea({
            x1: cameraX - updateRadius,
            y1: cameraY - updateRadius,
            z1: cameraZ - updateRadius,
            x2: cameraX + updateRadius,
            y2: cameraY + updateRadius,
            z2: cameraZ + updateRadius,
        });
        for(const entity of entitiesToUpdate) {
            // Update each entity within the update radius
            if(entity instanceof SpatialEntity3D) {
                this.updateEntity(entity);
            }
        }
    }

    /**
     * Updates an entity's position in the spatial grid.
     * @param {Object} entity - The entity instance.
     */
    updateEntity(entity) {
        if(entity instanceof SpatialEntity3D) {
            const newHash = hashCoordinates(entity.pos.x, entity.pos.y, entity.pos.z, this.cellSize);
            if(entity.spatialHash !== newHash) { // Compare with the stored hash
                this.deleteSpatial(entity.pos.x, entity.pos.y, entity.pos.z, entity);
                this.setSpatial(entity.pos.x, entity.pos.y, entity.pos.z, entity);
                this.eventBus.emit(entity.id, entity);
            }
        }
    }
}
