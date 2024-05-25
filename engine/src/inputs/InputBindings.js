export default class InputBindings {
    /**
     * MyInputBindings constructor.
     * @param {Object} eventBus
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    /**
     * Retrieves the input bindings.
     * @returns {Object} The input bindings.
     */
    getBindings() {
        return {
            'w': {
                down: () => console.log('Move up started'),
                up: () => console.log('Move up ended')
            },
            'a': {
                down: () => console.log('Move left started'),
                up: () => console.log('Move left ended')
            },
            's': {
                down: () => console.log('Move down started'),
                up: () => console.log('Move down ended')
            },
            'd': {
                down: () => console.log('Move right started'),
                up: () => console.log('Move right ended')
            },
            'space': {
                down: () => console.log('Firing started'),
                up: () => console.log('Firing ended')
            },
            'shift+w': {
                down: () => console.log('Move up fast started'),
                up: () => console.log('Move up fast ended')
            },
            'shift+a': {
                down: () => console.log('Move left fast started'),
                up: () => console.log('Move left fast ended')
            },
            'shift+s': {
                down: () => console.log('Move down fast started'),
                up: () => console.log('Move down fast ended')
            },
            'shift+d': {
                down: () => console.log('Move right fast started'),
                up: () => console.log('Move right fast ended')
            },
        };
    }
}
