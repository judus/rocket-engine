import Area from "../utils/spatial/Area.js";

/**
 * EntitySelector is responsible for selecting entities within a specified area or at a specific point.
 */
export default class EntitySelector {
    constructor(dataStoreManager) {
        this.dataStoreManager = dataStoreManager;
        this.entities = this.dataStoreManager.getStore("entities");
        this.mainCamera = null; // This will be set by the PlayerActions class
    }

    /**
     * Selects entities within the specified area.
     * @param {Area} area - The area to select entities within.
     * @returns {Array} - The list of selected entities.
     */
    selectEntitiesInArea(area) {
        console.log('Selecting entities in area: ', area);
        console.log('Entities: ', this.entities.getEntitiesInArea(area));
        return this.entities.getEntitiesInArea(area);
    }

    /**
     * Selects entities at the specified point.
     * @param {number} x - The x coordinate of the point.
     * @param {number} y - The y coordinate of the point.
     * @returns {Array} - The list of selected entities.
     */
    selectEntitiesAtPoint(x, y) {
        console.log('Selecting entities at point: ', x, y);
        console.log('Entities: ', this.entities.getEntitiesInArea(new Area(x, y, x, y)));
        return this.entities.getEntitiesInArea(new Area(x, y, x, y));
    }

    /**
     * Checks if an entity was clicked.
     * @param {Entity} entity - The entity to check.
     * @param {number} mouseX - The x coordinate of the mouse in the game world.
     * @param {number} mouseY - The y coordinate of the mouse in the game world.
     * @returns {boolean} - True if the entity was clicked, false otherwise.
     */
    isEntityClicked(entity, mouseX, mouseY) {
        const boundingBox = entity.getComponent('boundingBox');
        if(boundingBox) {
            const bounds = boundingBox.getBounds(entity.pos, entity.rotation);
            for(const box of bounds) {
                if(mouseX >= box.left && mouseX <= box.right && mouseY >= box.top && mouseY <= box.bottom) {
                    return true;
                }
            }
        }

        const transformComponent = entity.getComponent('transform');
        if(transformComponent) {
            const vertices = transformComponent.applyTransform(entity.definition.vertices);
            return this.isPointInPolygon(vertices, mouseX, mouseY);
        }

        return false;
    }

    /**
     * Checks if a point is inside a polygon.
     * @param {Array} vertices - The vertices of the polygon.
     * @param {number} x - The x coordinate of the point.
     * @param {number} y - The y coordinate of the point.
     * @returns {boolean} - True if the point is inside the polygon, false otherwise.
     */
    isPointInPolygon(vertices, x, y) {
        let inside = false;
        for(let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
            const xi = vertices[i].x, yi = vertices[i].y;
            const xj = vertices[j].x, yj = vertices[j].y;

            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if(intersect) inside = !inside;
        }
        return inside;
    }
}
