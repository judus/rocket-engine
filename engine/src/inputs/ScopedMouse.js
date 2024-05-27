import GlobalMouse from "./GlobalMouse.js";
import Area from "../utils/spatial/Area.js";

/**
 * ScopedMouse handles mouse events relative to a specific element.
 */
export default class ScopedMouse extends GlobalMouse {
    /**
     * Creates an instance of ScopedMouse.
     * @param {HTMLElement} element - The element to scope the mouse events to.
     * @param {DataStoreManager} dataStoreManager - The data store manager instance.
     */
    constructor(element, dataStoreManager) {
        super();
        this.element = element;
        this.dataStore = dataStoreManager;
        this.pos = {x: 0, y: 0};
        this.world = {x: 0, y: 0};
        this.buttons = {left: false, middle: false, right: false};
        this.selectionStart = null;
        this.selectionEnd = null;
    }

    /**
     * Updates the mouse position relative to the scoped element.
     * @param {MouseEvent} event - The mouse event.
     */
    updatePosition(event) {
        if(!this.engine) {
            console.error("ScopedMouse not initialized with engine");
            return;
        }
        const rect = this.element.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if(mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            this.pos.x = mouseX;
            this.pos.y = mouseY;

            const camera = this.engine.sceneDirector().getSceneManager('world').getCurrentScene().cameraManager.getCamera('main');
            if(camera) {
                this.world.x = (mouseX / camera.zoomLevel) + camera.pos.x;
                this.world.y = (mouseY / camera.zoomLevel) + camera.pos.y;
            }
        } else {
            this.pos.x = null;
            this.pos.y = null;
            this.world.x = null;
            this.world.y = null;
        }
    }

    /**
     * Updates the mouse button state.
     * @param {MouseEvent} event - The mouse event.
     */
    updateButton(event) {
        switch(event.button) {
            case 0:
                this.buttons.left = event.type === 'mousedown';
                break;
            case 1:
                this.buttons.middle = event.type === 'mousedown';
                break;
            case 2:
                this.buttons.right = event.type === 'mousedown';
                break;
        }
    }


    /**
     * Gets the selection area based on the initial and final positions.
     * @returns {Area|null} The selection area, or null if the selection is invalid.
     */
    getArea() {
        if(this.selectionStart && this.selectionEnd) {
            const x1 = Math.min(this.selectionStart.x, this.selectionEnd.x);
            const y1 = Math.min(this.selectionStart.y, this.selectionEnd.y);
            const x2 = Math.max(this.selectionStart.x, this.selectionEnd.x);
            const y2 = Math.max(this.selectionStart.y, this.selectionEnd.y);
            return new Area(x1, y1, x2, y2);
        }
        return null;
    }
}
