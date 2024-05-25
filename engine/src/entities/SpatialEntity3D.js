import BaseEntity from './BaseEntity.js';
import Spatial3D from '../utils/Spatial3D.js';

export default class SpatialEntity3D extends BaseEntity {
    constructor(id, spatialHashGrid, x = 0, y = 0, z = 0) {
        super(id, 'SpatialEntity');
        this.pos = new Spatial3D(x, y, z);
        this.spatialHash = null;
        this.spatialHashGrid = spatialHashGrid;

        // Set the onChange callback for the position vector
        this.pos.onChange = () => {
            if(this.spatialHashGrid) {
                this.spatialHashGrid.updateEntity(this);
            }
        };
    }
}
