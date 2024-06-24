import BaseComponent from "./BaseComponent.js";

export default class PositionComponent extends BaseComponent {
    /**
     * PositionComponent constructor.
     * @param {number} x - The x-coordinate of the position.
     * @param {number} y - The y-coordinate of the position.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    update(deltaTime) {
        // Logic to update position each frame (if needed)
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
