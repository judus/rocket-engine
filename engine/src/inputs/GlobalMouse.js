import EngineBase from "../abstracts/EngineBase.js";

export default class GlobalMouse extends EngineBase {
    /**
     * GlobalMouse constructor.
     */
    constructor() {
        super();
        this.pos = {x: 0, y: 0};
        this.buttonPressed = false;
        this.engine = null;
    }

    init(engine) {
        this.engine = engine;
        console.log('GlobalMouse initialized');
    }

    /**
     * Updates the mouse position.
     * @param {MouseEvent} event - The mouse event.
     */
    updatePosition(event) {
        this.pos.x = event.clientX;
        this.pos.y = event.clientY;
    }

    /**
     * Updates the mouse button state.
     * @param {MouseEvent} event - The mouse event.
     */
    updateButton(event) {
        this.buttonPressed = event.type === 'mousedown';
    }
}
