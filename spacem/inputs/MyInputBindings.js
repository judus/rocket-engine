import InputBindings from "./core/InputBindings.js";

export default class MyInputBindings extends InputBindings {

    constructor(eventBus) {
        super(eventBus);
    }
    /**
     * Retrieves the input bindings, including custom game-specific bindings.
     * @returns {Object} The input bindings.
     */
    getBindings() {
        return {
            ...super.getBindings(),
            'w': {
                down: () => this.eventBus.emit('moveForward'),
                up: () => this.eventBus.emit('stopMoveForward')
            },
            'a': {
                down: () => this.eventBus.emit('moveLeft'),
                up: () => this.eventBus.emit('stopMoveLeft')
            },
            's': {
                down: () => this.eventBus.emit('moveBackward'),
                up: () => this.eventBus.emit('stopMoveBackward')
            },
            'd': {
                down: () => this.eventBus.emit('moveRight'),
                up: () => this.eventBus.emit('stopMoveRight')
            },
            'shift': {
                down: () => this.eventBus.emit('run'),
                up: () => this.eventBus.emit('stopRun')
            },
            'control': {
                down: () => this.eventBus.emit('sneak'),
                up: () => this.eventBus.emit('stopSneak')
            },

        };
    }
}
