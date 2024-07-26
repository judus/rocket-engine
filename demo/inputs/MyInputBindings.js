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
            'h': {
                down: () => this.eventBus.emit('dropHeatSink'),
            },
            'k': {
                down: () => this.eventBus.emit('logState'),
            },
            'l': {
                down: () => this.eventBus.emit('logThis'),
            },
            'shift': {
                down: () => this.eventBus.emit('boost'),
                up: () => this.eventBus.emit('stopBoost')
            },
            'space': {
                down: () => this.eventBus.emit('switchInertiaDampers'),
            },
            '0': {
                down: () => this.eventBus.emit('key', 0),
            },
            '1': {
                down: () => this.eventBus.emit('key', 1),
            },
            '2': {
                down: () => this.eventBus.emit('key', 2),
            },
            '3': {
                down: () => this.eventBus.emit('key', 3),
            },
            '4': {
                down: () => this.eventBus.emit('key', 4),
            },
            '5': {
                down: () => this.eventBus.emit('key', 5),
            },
            '6': {
                down: () => this.eventBus.emit('key', 6),
            },
        };
    }
}
