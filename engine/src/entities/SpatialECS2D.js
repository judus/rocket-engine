import SpatialEntity2D from './SpatialEntity2D.js';

export default class SpatialECS2D extends SpatialEntity2D {
    /**
     * Creates a new SpatialECS2D.
     * @param {Object} spatialHashGrid - The spatial hash grid instance.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {string|null} [id] - The unique identifier for this entity (optional).
     */
    constructor(spatialHashGrid, x = 0, y = 0, id = null) {
        super(spatialHashGrid, x, y, id);
        this.components = {};
        this.children = [];
        this.parent = null;
    }

    /**
     * Adds a component to the entity.
     * @param {string} componentType - The type of the component.
     * @param {Object} component - The component instance.
     */
    addComponent(componentType, component) {
        this.components[componentType] = component;
        component.entity = this; // Allows components to access their parent entity.
        if(component.onAdd) {
            component.onAdd();
        }
    }

    /**
     * Removes a component from the entity.
     * @param {string} componentType - The type of the component to remove.
     */
    removeComponent(componentType) {
        const component = this.components[componentType];
        if(component && component.onRemove) {
            component.onRemove();
        }
        delete this.components[componentType];
    }

    /**
     * Retrieves a component from the entity.
     * @param {string} componentType - The type of the component to retrieve.
     * @returns {Object|null} The component instance or null if not found.
     */
    getComponent(componentType) {
        return this.components[componentType] || null;
    }

    /**
     * Checks if the entity has a specific component.
     * @param {string} componentType - The type of the component to check.
     * @returns {boolean} True if the entity has the component, false otherwise.
     */
    hasComponent(componentType) {
        return !!this.components[componentType];
    }

    /**
     * Adds a child entity.
     * @param {SpatialECS2D} child - The child entity to add.
     */
    addChild(child) {
        child.parent = this; // Set the parent reference
        this.children.push(child);
    }

    /**
     * Removes a child entity.
     * @param {SpatialECS2D} child - The child entity to remove.
     */
    removeChild(child) {
        const index = this.children.indexOf(child);
        if(index !== -1) {
            this.children.splice(index, 1);
            child.parent = null; // Clear the parent reference
        }
    }

    /**
     * Updates all components and child entities.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        Object.values(this.components).forEach(component => {
            if(component.update) {
                try {
                    component.update(deltaTime);
                } catch(error) {
                    console.error(`Error updating component ${component.constructor.name}:`, error);
                }
            }
        });

        // Update all child entities
        this.children.forEach(child => {
            child.pos.x = this.pos.x + child.offset.x;
            child.pos.y = this.pos.y + child.offset.y;
            child.rotation = this.rotation + child.offset.rotation;
            child.update(deltaTime);
        });
    }

    /**
     * Renders the entity and its child entities.
     * @param {number} deltaTime - The time elapsed since the last render.
     */
    render(deltaTime) {
        const renderComponent = this.getComponent('render');
        if(renderComponent) {
            try {
                renderComponent.render(deltaTime);
            } catch(error) {
                console.error(`Error rendering component ${renderComponent.constructor.name}:`, error);
            }
        }

        // Render all child entities
        this.children.forEach(child => {
            child.render(deltaTime);
        });
    }

    /**
     * Sends a message to all components of the entity.
     * @param {string} message - The message to send.
     * @param {Object} data - The data to send with the message.
     */
    sendMessage(message, data) {
        Object.values(this.components).forEach(component => {
            if(component.receiveMessage) {
                try {
                    component.receiveMessage(message, data);
                } catch(error) {
                    console.error(`Error sending message to component ${component.constructor.name}:`, error);
                }
            }
        });
    }

    onCollision(otherEntity, collisionResult) {
        // Default collision response, can be overridden by subclasses
        //console.log(`${this.id} collided with ${otherEntity.id} with result:`, collisionResult);
    }
}
