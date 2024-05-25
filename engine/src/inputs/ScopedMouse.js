import GlobalMouse from "./GlobalMouse.js";

export default class ScopedMouse extends GlobalMouse {
    /**
     * ScopedMouse constructor.
     * @param {HTMLElement} element - The element to scope the mouse events to.
     * @param dataStoreManager
     */
    constructor(element, dataStoreManager) {
        super();
        this.element = element;
        this.dataStore = dataStoreManager;
        this.pos = {x: 0, y: 0};
        this.world = {x: 0, y: 0};
        this.buttons = {left: false, middle: false, right: false};
    }

    /**
     * Updates the mouse position relative to the scoped element.
     * @param {MouseEvent} event - The mouse event.
     */
    updatePosition(event) {
        const rect = this.element.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if(mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            this.pos.x = mouseX;
            this.pos.y = mouseY;

            const camera = this.dataStore.getStore('cameras')?.get('main');
            if (camera) {
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
}
