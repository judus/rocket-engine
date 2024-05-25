export default class InputBindingsManager {
    /**
     * InputBindingsManager constructor.
     * @param {Object} eventBus - The event bus for handling input events.
     * @param {Object} inputBindings - The initial input bindings.
     */
    constructor(eventBus, inputBindings) {
        this.eventBus = eventBus;
        this.bindings = {};

        if(inputBindings) {
            this.registerInputBindings(inputBindings);
        }
    }

    /**
     * Registers input bindings with the event bus.
     * @param {Object} inputBindings - The input bindings to register.
     */
    registerInputBindings(inputBindings) {
        const bindings = inputBindings.getBindings();

        this.eventBus.on('keyDown', event => {
            const action = bindings[event.combinedKey]?.down || bindings[event.key]?.down;
            if(action) action();
        });

        this.eventBus.on('keyUp', event => {
            const action = bindings[event.combinedKey]?.up || bindings[event.key]?.up;
            if(action) action();
        });
    }

    /**
     * Handles input events.
     * @param {string} eventType - The type of event (keyDown or keyUp).
     * @param {Object} event - The event object.
     */
    handleInputEvent(eventType, event) {
        const action = this.bindings[event.combinedKey]?.[eventType] || this.bindings[event.key]?.[eventType];
        if(action) action(event);
    }
}
