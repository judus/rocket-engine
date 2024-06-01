import InputBindings from "../../engine/src/inputs/InputBindings.js";

export default class MyInputBindings extends InputBindings {

    constructor(eventBus) {
        super(eventBus);
        this.eventBus = eventBus;
    }

    init(engine) {
        this.eventBus = engine.eventBus();
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
            'q': {
                down: () => this.eventBus.emit('switchAutoOrientation'),
            },
            'shift': {
                down: () => this.eventBus.emit('boost'),
                up: () => this.eventBus.emit('stopBoost')
            },
            'space': {
                down: () => this.eventBus.emit('switchInertiaDampers'),
            },
        };
    }
}
