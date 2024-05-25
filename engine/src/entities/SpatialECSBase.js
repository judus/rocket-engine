import SpatialEntity2D from './SpatialEntity2D.js';
import SpatialEntity3D from './SpatialEntity3D.js';

export default class SpatialECSBase {
    /**
     * Creates a new SpatialECSBase.
     * @param {string} id - The unique identifier for this entity.
     * @param {Object} spatialEntity - The spatial entity instance (either 2D or 3D).
     * @param {Object} spatialHashGrid - The spatial hash grid instance.
     * @param x
     * @param y
     * @param z
     */
    constructor(id, spatialEntity, spatialHashGrid, x = 0, y = 0, z = 0) {
        this.spatialEntity = new spatialEntity(id, spatialHashGrid, x, y, z);
        this.components = {};
    }

    /**
     * Adds a component to the entity.
     * @param {string} componentType - The type of the component.
     * @param {Object} component - The component instance.
     */
    addComponent(componentType, component) {
        this.components[componentType] = component;
        component.entity = this.spatialEntity; // Allows components to access their parent entity.
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
     * Updates all components of the entity.
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
    }

    /**
     * Renders the entity.
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
}
