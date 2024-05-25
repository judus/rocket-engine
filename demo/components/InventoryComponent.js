import BaseComponent from "../../engine/src/abstracts/BaseComponent.js";

export default class InventoryComponent extends BaseComponent {
    /**
     * InventoryComponent constructor.
     * @param {Object} capacities - The initial capacities of resources.
     */
    constructor(capacities = {}) {
        super();
        this.resources = new Map(Object.entries(capacities));
    }

    /**
     * Adds a resource to the inventory.
     * @param {string} resource - The name of the resource.
     * @param {number} amount - The amount to add.
     */
    addResource(resource, amount) {
        if(this.resources.has(resource)) {
            this.resources.set(resource, this.resources.get(resource) + amount);
        } else {
            this.resources.set(resource, amount);
        }
    }

    /**
     * Removes a resource from the inventory.
     * @param {string} resource - The name of the resource.
     * @param {number} amount - The amount to remove.
     * @returns {boolean} True if the resource was successfully removed, false otherwise.
     */
    removeResource(resource, amount) {
        if(this.resources.has(resource) && this.resources.get(resource) >= amount) {
            this.resources.set(resource, this.resources.get(resource) - amount);
            return true;
        }
        return false;
    }

    /**
     * Example of an update method override.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        // Logic to update the inventory each frame (if needed)
    }

    /**
     * Example of a receiveMessage method override.
     * @param {string} message - The message to handle.
     * @param {Object} data - The data associated with the message.
     */
    receiveMessage(message, data) {
        // Logic to handle messages sent to the component (if needed)
    }
}
