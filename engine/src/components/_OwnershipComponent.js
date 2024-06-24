import BaseComponent from "./BaseComponent.js";
export default class OwnershipComponent extends BaseComponent {
    /**
     * OwnershipComponent constructor.
     * @param {string} ownerId - The ID of the owner.
     */
    constructor(ownerId) {
        super();
        this.ownerId = ownerId;
    }

    update(deltaTime) {
        // Logic to update ownership each frame (if needed)
    }

    receiveMessage(message, data) {
        // Logic to handle messages sent to the component (if needed)
    }

    onAdd() {
        // Logic to execute when the component is added to an entity
    }

    onRemove() {
        // Logic to execute when the component is removed from an entity
    }
}
