import BaseComponent from "../../engine/src/abstracts/BaseComponent.js";

export default class HangarComponent extends BaseComponent {
    /**
     * HangarComponent constructor.
     * @param {number} capacity - The maximum number of ships the hangar can hold.
     */
    constructor(capacity = {}) {
        super();
        this.capacity = capacity;
        this.ships = [];
    }

    /**
     * Docks a ship in the hangar.
     * @param {Object} ship - The ship to dock.
     * @returns {boolean} True if the ship was successfully docked, false otherwise.
     */
    dockShip(ship) {
        if(this.ships.length < this.capacity) {
            this.ships.push(ship);
            return true;
        }
        return false;
    }

    /**
     * Releases a ship from the hangar.
     * @param {Object} ship - The ship to release.
     * @returns {boolean} True if the ship was successfully released, false otherwise.
     */
    releaseShip(ship) {
        const index = this.ships.indexOf(ship);
        if(index > -1) {
            this.ships.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Optional update method override.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        // Logic to update the hangar each frame (if needed)
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
