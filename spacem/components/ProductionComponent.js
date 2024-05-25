import BaseComponent from "./BaseComponent.js";

export default class ProductionComponent extends BaseComponent {
    /**
     * ProductionComponent constructor.
     * @param {Object} requirements - The resources required for production per cycle.
     * @param {Object} outputs - The resources produced per cycle.
     */
    constructor(requirements, outputs) {
        super();
        this.requirements = requirements; // { resource: amount per cycle }
        this.outputs = outputs; // { resource: amount per cycle }
    }

    /**
     * Produces resources if the inventory has enough resources to meet the requirements.
     * @param {InventoryComponent} inventory - The inventory to check and update.
     */
    produce(inventory) {
        // Check if inventory has enough resources
        const canProduce = Object.entries(this.requirements).every(([res, amt]) => {
            return inventory.resources.get(res) >= amt;
        });

        if(canProduce) {
            Object.entries(this.requirements).forEach(([res, amt]) => {
                inventory.removeResource(res, amt);
            });
            Object.entries(this.outputs).forEach(([res, amt]) => {
                inventory.addResource(res, amt);
            });
        }
    }

    /**
     * Optional update method override.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        // Logic to update production each frame (if needed)
    }

    /**
     * Optional method to handle messages, can be overridden by subclasses.
     * @param {string} message - The message to handle.
     * @param {Object} data - The data associated with the message.
     */
    receiveMessage(message, data) {
        // Logic to handle messages sent to the component (if needed)
    }

    /**
     * Called when the component is added to an entity.
     */
    onAdd() {
        // Logic to execute when the component is added to an entity
    }

    /**
     * Called when the component is removed from an entity.
     */
    onRemove() {
        // Logic to execute when the component is removed from an entity
    }
}
