import BaseEntity from './BaseEntity.js';
import Spatial2D from "../utils/spatial/Spatial2D.js";

function generateUUID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

export default class SpatialEntity2D extends BaseEntity {
    constructor(spatialHashGrid, x = 0, y = 0, id = null) {
        super(id || generateUUID(), 'SpatialEntity');
        this.pos = new Spatial2D(x, y);
        this.spatialHash = null;
        this.spatialHashGrid = spatialHashGrid;
        this.children = [];
        this.parent = null;

        // Set the onChange callback for the position vector
        this.pos.onChange = () => {
            if(this.spatialHashGrid) {
                this.spatialHashGrid.updateEntity(this);
            }
        };
    }

    addChild(child) {
        child.parent = this; // Set the parent reference
        this.children.push(child);
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if(index !== -1) {
            this.children.splice(index, 1);
            child.parent = null; // Clear the parent reference
        }
    }

    update(deltaTime) {
        this.children.forEach(child => {
            child.pos.x = this.pos.x + child.offset.x;
            child.pos.y = this.pos.y + child.offset.y;
            child.rotation = this.rotation + child.offset.rotation;
            child.update(deltaTime);
        });
    }

    render(context, camera) {
        this.children.forEach(child => {
            child.render(context, camera);
        });
    }

    destroy() {
        // Remove entity from the spatial hash grid
        if(this.spatialHashGrid) {
            this.spatialHashGrid.deleteSpatial(this.pos.x, this.pos.y, this);
            this.spatialHashGrid.delete(this.id);
        }

        // Notify the parent if there is one
        if(this.parent) {
            this.parent.removeChild(this);
        }

        // Destroy children
        this.children.forEach(child => {
            child.destroy();
        });

        // Emit a destroy event or handle other clean up if needed
        if(this.eventBus) {
            this.eventBus.emit('entityDestroyed', this);
        }
    }
}
