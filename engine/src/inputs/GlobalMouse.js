export default class GlobalMouse {
    /**
     * GlobalMouse constructor.
     */
    constructor() {
        this.pos = {x: 0, y: 0};
        this.buttonPressed = false;
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
