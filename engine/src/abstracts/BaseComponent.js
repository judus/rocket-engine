export default class BaseComponent {
    /**
     * BaseComponent constructor.
     */
    constructor() {
        this.entity = null; // Will be set when the component is added to an entity
    }

    /**
     * Called when the component is added to an entity.
     */
    onAdd(entity) {
        this.entity = entity;
        return this;
    }

    /**
     * Called when the component is removed from an entity.
     */
    onRemove() {
        this.entity = null;
    }

    /**
     * Optional update method, can be overridden by subclasses.
     * @param {number} deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        // Logic to execute each frame
    }

    /**
     * Optional render method, can be overridden by subclasses.
     * @param {number} deltaTime - The time elapsed since the last render.
     * @param {Object} context - The rendering context.
     * @param {Object} camera - The camera object.
     */
    render(deltaTime, context, camera) {
        // Logic to execute for rendering
    }

    /**
     * Optional method to handle messages, can be overridden by subclasses.
     * @param {string} message - The message to handle.
     * @param {Object} data - The data associated with the message.
     */
    receiveMessage(message, data) {
        // Logic to handle messages sent to the component
    }

    /**
     * Save the state of the component, can be overridden by subclasses.
     * @returns {Object} The saved state.
     */
    saveState() {
        return {};
    }

    /**
     * Restore the state of the component, can be overridden by subclasses.
     * @param {Object} state - The state to restore.
     */
    restoreState(state) {
        // Logic to restore the component's state
    }
}
